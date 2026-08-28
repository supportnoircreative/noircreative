"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/data/testimonials";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 700;
const AUTOPLAY_MS = 5200;
const SWIPE_THRESHOLD = 40;
const N = testimonials.length;

// Distance (in slot steps) of index `i` from the active `current`, wrapped
// into a circular window so the carousel can loop seamlessly: {…,-2,-1,0,1,2}
function slotOffset(current, i) {
  let d = (i - current + N) % N;
  if (d > Math.floor(N / 2)) d -= N;
  return d;
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const startX = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const go = (dir) => setCurrent((c) => (c + dir + N) % N);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setTimeout(() => setCurrent((c) => (c + 1) % N), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [current, paused, reduced]);

  const onPointerDown = (e) => {
    startX.current = e.clientX;
    setPaused(true);
  };

  const onPointerUp = (e) => {
    if (startX.current != null) {
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
    }
    startX.current = null;
    setPaused(false);
  };

  const pausers = { onPointerEnter: () => setPaused(true), onPointerLeave: () => setPaused(false) };

  return (
    <section
      id="testimonials"
      className="border-b border-(--line) bg-ink-raised px-5 py-[130px] max-sm:py-[64px] md:px-8"
    >
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-[50px] flex flex-wrap items-center justify-center gap-[30px] text-center lg:items-end lg:justify-between lg:text-left">
          <Reveal className="flex flex-col items-center lg:items-start">
            <Eyebrow center>Client reviews</Eyebrow>
            <RollText
              as="h2"
              className="max-w-[24ch] text-[clamp(30px,4vw,50px)] lg:max-w-none"
              lines={["Don't take our word for it."]}
            />
          </Reveal>
          <Reveal>
            <div className="mx-auto flex gap-2.5 lg:mx-0">
              <button
                type="button"
                aria-label="Previous reviews"
                onClick={() => go(-1)}
                className="flex size-[46px] items-center justify-center rounded-full border border-(--line-strong) bg-transparent text-text-1 transition-colors duration-250 hover:border-lime hover:bg-lime hover:text-ink"
              >
                <ChevronLeft size={16} strokeWidth={1.6} />
              </button>
              <button
                type="button"
                aria-label="Next reviews"
                onClick={() => go(1)}
                className="flex size-[46px] items-center justify-center rounded-full border border-(--line-strong) bg-transparent text-text-1 transition-colors duration-250 hover:border-lime hover:bg-lime hover:text-ink"
              >
                <ChevronRight size={16} strokeWidth={1.6} />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal className="block">
          <div
            className="relative overflow-hidden px-[6px] pt-[6px]"
            style={{
              marginInline: "calc(50% - 50vw)",
              width: "100vw",
              "--card-w": "min(380px,86vw)",
              "--gap": "18px",
              "--step": "calc(var(--card-w) + var(--gap))",
              "--vh": "560px",
            }}
            {...pausers}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <div className="relative mt-9 h-[var(--vh)] max-sm:mt-4">
              {testimonials.map((t, i) => {
                const off = slotOffset(current, i);
                const val = Math.abs(off);

                const scale = reduced ? 1 : val === 0 ? 1.05 : val === 1 ? 0.92 : 0.86;
                const blur = reduced ? 0 : val === 0 ? 0 : val === 1 ? 2 : 3;
                const opacity = val === 0 ? 1 : reduced ? 0.5 : val === 1 ? 0.6 : 0.42;
                const z = val === 0 ? 10 : val === 1 ? 5 : 1;

                const style = {
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  width: "var(--card-w)",
                  zIndex: z,
                  opacity,
                  transform: `translateX(calc(-50% + ${off} * var(--step))) scale(${scale})`,
                  filter: blur ? `blur(${blur}px)` : "none",
                  transition: reduced
                    ? "opacity 300ms linear"
                    : `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}`,
                  willChange: "transform, opacity, filter",
                };

                return (
                  <article key={t.name} style={style} className="testi-card rounded-2xl border border-lime bg-ink-raised p-8 shadow-[0_0_0_1px_rgba(198,242,78,.2),0_10px_30px_-14px_rgba(198,242,78,.35)]">
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
        </Reveal>
      </div>
    </section>
  );
}
