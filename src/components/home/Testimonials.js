"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/data/testimonials";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 700;
const AUTOPLAY_MS = 5200;
const N = testimonials.length;

/* The carousel is driven by a single continuous horizontal position `pos`
   (in px). Each card's integer loop index `j` maps to a fractional slot
   distance from the centered card, so translation *and* coverflow styling
   (scale/opacity/blur) interpolate smoothly as the strip is dragged — this
   is what makes it feel like a real slide instead of a snap. */
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function Testimonials() {
  const [pos, setPos] = useState(0);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [showHint, setShowHint] = useState(false);
  const stripRef = useRef(null);

  // gesture / momentum state (kept in refs — updated every pointermove)
  const drag = useRef(null); // { id, startX, originPos }
  const animRef = useRef(null);

  const readStep = (el) => {
    if (el) {
      const cs = getComputedStyle(el);
      const cardW = parseFloat(cs.getPropertyValue("--card-w")) || 380;
      const gap = parseFloat(cs.getPropertyValue("--gap")) || 18;
      return cardW + gap;
    }
    return 398;
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile) return;
    const t = setTimeout(() => setShowHint(true), 1200);
    const hide = setTimeout(() => setShowHint(false), 4200);
    return () => { clearTimeout(t); clearTimeout(hide); };
  }, [reduced]);

  const stopAnim = () => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  };

  // Animate `pos` toward `target`, optionally carrying residual velocity, then settle.
  const animateTo = (target, duration, residualVelocity) => {
    stopAnim();
    if (reduced) {
      setPos(wrap(target));
      return;
    }
    setAnimating(true);
    const from = pos;
    let start = 0;
    const wrapTarget = wrap(target);

    const frame = (now) => {
      if (!start) start = now;
      const t = clamp((now - start) / duration, 0, 1);
      // easeOutQuint — smooth, natural arrival
      const e = 1 - Math.pow(1 - t, 5);
      // residual momentum (in pos-space) decays over the animation
      const extra = residualVelocity * duration * (1 - t) * 0.6;
      setPos(wrap(lerp(from, wrapTarget, e) + extra));
      if (t < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        animRef.current = null;
        setAnimating(false);
      }
    };
    animRef.current = requestAnimationFrame(frame);
  };

  // Normalize into one loop window: 0 <= pos < N*step
  const wrap = (value) => {
    const s = step || 398;
    const total = N * s;
    return ((value % total) + total) % total;
  };

  /* ----- rendering model ----- */
  // Continuous distance (in steps) of card `j` from the centered card at `p`.
  const slotFor = (j, p) => {
    const s = step || 398;
    const centerF = p / s;
    let dist = j - centerF;
    dist -= Math.round(dist / N) * N; // wrap into [-N/2, N/2]
    return dist;
  };

  useEffect(() => {
    const update = () => setStep(readStep(stripRef.current));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ----- gestures ----- */
  const velocitySamples = useRef([]);

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stopAnim();
    drag.current = { id: e.pointerId, startX: e.clientX, originPos: pos };
    velocitySamples.current = [];
    setDragging(true);
    setPaused(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current || e.pointerId !== drag.current.id) return;
    const dx = e.clientX - drag.current.startX;
    if (reduced) {
      setPos(wrap(drag.current.originPos));
      return;
    }
    const next = drag.current.originPos - dx;
    setPos(wrap(next));
    velocitySamples.current.push({ t: e.timeStamp, x: e.clientX });
    if (velocitySamples.current.length > 6) velocitySamples.current.shift();
  };

  const onPointerUp = (e) => {
    if (!drag.current || e.pointerId !== drag.current.id) return;
    const samples = velocitySamples.current;
    let velocity = 0;
    if (samples.length >= 2) {
      const a = samples[0];
      const b = samples[samples.length - 1];
      const dt = b.t - a.t;
      if (dt > 0) velocity = (b.x - a.x) / dt; // px per ms
    }
    drag.current = null;
    setDragging(false);
    setPaused(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    settle(velocity);
  };

  const onPointerCancel = (e) => {
    drag.current = null;
    setDragging(false);
    setPaused(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    settle(0);
  };

  // Snap to the nearest card; apply fling momentum if the release was fast.
  const settle = (velocity) => {
    const s = step || readStep();
    const isFling = Math.abs(velocity) > 0.35;
    // momentum of `pos` is opposite the cursor velocity (dragging right lowers pos)
    const pv = isFling ? -velocity : 0;
    // project where pos would travel with momentum, snap to nearest card
    const target = Math.round((pos + pv * 160) / s) * s;
    animateTo(target, isFling ? 620 : 480, isFling ? pv : 0);
  };

  const pausers = { onPointerEnter: () => setPaused(true), onPointerLeave: () => setPaused(false) };

  // Autoplay advances the continuous position by one step, with easing.
  useEffect(() => {
    if (reduced || paused) return;
    const s = step || readStep();
    const id = setTimeout(() => {
      animateTo(pos - s, DURATION, 0);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, paused, reduced, step]);

  const s = step || readStep();
  const activeIdx = (((Math.round(pos / s) % N) + N) % N);

  return (
    <section
      id="testimonials"
      className="border-b border-(--line) bg-ink-raised px-5 py-[130px] max-sm:py-[64px] md:px-8"
    >
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-[50px] flex flex-col items-center gap-[30px] text-center">
          <Reveal className="flex flex-col items-center">
            <Eyebrow center>Client reviews</Eyebrow>
            <RollText
              as="h2"
              className="max-w-[24ch] text-[clamp(30px,4vw,50px)]"
              lines={["Don't take our word for it."]}
            />
          </Reveal>
        </div>

        <Reveal className="block">
          <div
            ref={stripRef}
            className="relative overflow-hidden cursor-grab active:cursor-grabbing px-[6px] pt-[6px]"
            style={{
              marginInline: "calc(50% - 50vw)",
              width: "100vw",
              "--card-w": "min(380px,86vw)",
              "--gap": "18px",
              "--step": "calc(var(--card-w) + var(--gap))",
              "--vh": "560px",
              touchAction: "pan-y",
              userSelect: "none",
            }}
            {...pausers}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            <div className="relative mt-9 h-[var(--vh)] max-sm:mt-4">
              {testimonials.map((t, i) => {
                const dist = slotFor(i, pos);
                const adist = Math.abs(dist);

                let scale, blur, opacity;
                if (reduced) {
                  scale = 1;
                  blur = 0;
                  opacity = adist < 0.5 ? 1 : 0.5;
                } else {
                  scale = lerp(1.05, 0.86, clamp(adist, 0, 2) / 2);
                  opacity = lerp(1, 0.42, clamp(adist, 0, 2) / 2);
                  blur = lerp(0, 3, clamp((adist - 0.6) / 1.6, 0, 1));
                }
                const z = adist < 1 ? 10 : adist < 2 ? 5 : 1;

                const style = {
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  width: "var(--card-w)",
                  zIndex: z,
                  opacity,
                  transform: `translateX(calc(-50% + ${dist * s}px)) scale(${scale})`,
                  filter: blur ? `blur(${blur}px)` : "none",
                  transition: dragging || animating
                    ? "none"
                    : reduced
                      ? "opacity 300ms linear"
                      : `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}`,
                  willChange: "transform, opacity, filter",
                };

                return (
                  <article
                    key={t.name}
                    style={style}
                    className="testi-card rounded-2xl border border-lime bg-ink-raised p-8 shadow-[0_0_0_1px_rgba(198,242,78,.2),0_10px_30px_-14px_rgba(198,242,78,.35)]"
                  >
                    <div className="mb-[22px] flex items-center justify-between">
                      <StarRating rating={t.rating} />
                      <span className="font-mono text-[13px] text-ash">{t.rating.toFixed(1)}</span>
                    </div>
                    <span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-violet">
                      {t.category}
                    </span>
                    <blockquote className="m-0 flex-1 text-[15.5px] leading-relaxed text-text-1">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="mt-6 border-t border-(--line) pt-5 text-[13px] text-ash">
                      <strong className="mb-0.5 block text-sm text-body">{t.name}</strong>
                      {t.role}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Mobile swipe hint */}
          <div
            className="pointer-events-none mt-5 flex items-center justify-center gap-1.5 transition-all duration-700 sm:hidden"
            style={{
              opacity: showHint ? 1 : 0,
              transform: showHint ? "translateX(0)" : "translateX(8px)",
            }}
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ash">
              swipe
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-ash">
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Swipe dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  stopAnim();
                  animateTo(i * s, 480, 0);
                  setPaused(true);
                  setTimeout(() => setPaused(false), AUTOPLAY_MS);
                }}
                aria-label={`Go to review ${i + 1}`}
                className="group relative flex items-center justify-center p-1"
              >
                <span
                  className="block rounded-full transition-all duration-500"
                  style={{
                    width: activeIdx === i ? 24 : 7,
                    height: 7,
                    background: activeIdx === i ? "var(--lime)" : "var(--ash)",
                    opacity: activeIdx === i ? 1 : 0.45,
                  }}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
