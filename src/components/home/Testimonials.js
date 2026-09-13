"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { TestimonialDialog } from "@/components/home/TestimonialDialog";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 680;
const AUTOPLAY_MS = 6000;
const SWIPE_PX = 60; // drag past this and the slide commits
const GAP = 40; // breathing room between a card and its neighbour
const N = testimonials.length;

/* How a neighbour card is set back from the active one. */
const NEAR = { scale: 0.92, opacity: 0.45, blur: 3 };

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/**
 * Styling for a card at fractional distance `d` from centre, where 0 is the
 * active card and 1 is a neighbour.
 *
 * Fractional matters: while a finger is down, d slides smoothly between the
 * two, so the incoming review sharpens and brightens as it arrives and the
 * outgoing one dims and blurs as it leaves. Computing this from the integer
 * slot instead left the incoming card frozen as a dim, blurred ghost for the
 * whole gesture, which is why a swipe never looked like a handoff.
 */
function depthAt(d) {
  const t = clamp01(d);
  return {
    scale: 1 + (NEAR.scale - 1) * t,
    blur: NEAR.blur * t,
    // past the neighbour slot, fade the rest of the way out
    opacity: d <= 1 ? 1 + (NEAR.opacity - 1) * t : NEAR.opacity * clamp01(2 - d),
  };
}

/**
 * One review at a time, sliding in from the side.
 *
 * The movement is driven entirely by CSS transitions on each card's transform:
 * changing `index` writes one new transform per card and the browser animates
 * it off the main thread. The previous version advanced a continuous position
 * with requestAnimationFrame and called setState on every frame, re-rendering
 * all eight cards ~60 times a second — which is what made the slide stutter
 * and read as "not moving".
 *
 * Cards are laid out by signed distance from the active one, wrapped into
 * [-N/2, N/2], so the rail loops in both directions forever. The active review
 * sits in front at full size; the previous and next sit either side, scaled
 * back, dimmed and blurred. Slots ±2 stay in the DOM and keep their transition
 * so a card leaving the frame slides out rather than snapping; everything
 * beyond that is parked with its transition off, so the card wrapping from one
 * end of the loop to the other teleports instead of flying across the view.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  // review shown in the full-text dialog (null = closed)
  const [expanded, setExpanded] = useState(null);
  const [reduced, setReduced] = useState(false);

  const viewportRef = useRef(null);
  const cardRefs = useRef([]);
  const slideW = useRef(0);
  const drag = useRef(null); // { id, startX, dx }

  /* ---------- reduced motion ---------- */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  /* ---------- layout ----------
     Positions every card from the current index. `dragPx` offsets the whole
     rail while a finger is down; `animate` turns the CSS transition on or off. */
  const layout = useCallback(
    (dragPx = 0, animate = true) => {
      const w = slideW.current;
      if (!w) return;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        // signed distance from the active card, wrapped so the rail is a loop
        let slot = i - index;
        slot -= Math.round(slot / N) * N;
        const dist = Math.abs(slot);

        /* Slots 0, ±1 and ±2 all animate. ±2 is off-screen but still
           transitions, so the neighbour leaving the frame slides out instead
           of snapping. Anything beyond that teleports: without this, the card
           wrapping from one end of the loop to the other would fly across the
           whole viewport. */
        const animates = dist <= 2;
        // Distance including the live drag offset, so styling tracks the finger.
        const depth = depthAt(Math.abs(slot + dragPx / w));

        el.style.transition =
          animate && animates && !reduced
            ? `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}`
            : "none";
        // -50% centres the slide; the scale sets the neighbours back a little
        // so the active review reads as the one in front.
        el.style.transform =
          `translate3d(calc(-50% + ${slot * w + dragPx}px), 0, 0) scale(${depth.scale.toFixed(4)})`;
        el.style.opacity = depth.opacity.toFixed(3);
        el.style.filter = depth.blur > 0.01 ? `blur(${depth.blur.toFixed(2)}px)` : "none";
        el.style.zIndex = slot === 0 ? 2 : 1;
        // keep off-screen cards out of the tab order and off the a11y tree
        el.style.visibility = dist <= 2 ? "visible" : "hidden";
        el.inert = slot !== 0;
      });
    },
    [index, reduced]
  );

  /* Measure the viewport, then lay out. useLayoutEffect so the first paint
     already has the cards positioned rather than stacked on top of each other. */
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      // Step is one card plus the gap, NOT the viewport width: the viewport is
      // deliberately wider than a card so the neighbours show at the edges.
      const card = cardRefs.current.find(Boolean);
      slideW.current = (card?.clientWidth || 0) + GAP;
      layout(0, false);
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout]);

  useEffect(() => {
    layout(0, true);
  }, [index, layout]);

  const go = useCallback((delta) => {
    setIndex((i) => ((i + delta) % N + N) % N);
  }, []);

  /* ---------- autoplay ---------- */
  useEffect(() => {
    if (paused || reduced || expanded) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduced, expanded, go]);

  /* ---------- mobile swipe hint ---------- */
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    const show = setTimeout(() => setShowHint(true), 1200);
    const hide = setTimeout(() => setShowHint(false), 4200);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [reduced]);

  /* ---------- drag / swipe ----------
     The rail follows the finger by writing transforms straight to the DOM —
     no state updates during the gesture, so the eight cards never re-render
     mid-swipe. */
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { id: e.pointerId, startX: e.clientX, dx: 0 };
    setPaused(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    d.dx = e.clientX - d.startX;
    layout(d.dx, false);
  };

  const endDrag = (e) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setPaused(false);
    if (Math.abs(d.dx) > SWIPE_PX) {
      go(d.dx < 0 ? 1 : -1); // effect re-lays out with animation
    } else {
      layout(0, true); // didn't travel far enough — settle back
    }
  };

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
          {/* Viewport is wider than a card, so the previous and next reviews
              show at the edges (dimmed, blurred and set back) while the active
              one sits in front. Overflow clips whatever runs past the edges. */}
          <div
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            style={{
              "--card-w": "min(380px,86vw)",
              "--card-h": "min(500px,78vh)",
              width: "min(1100px,100%)",
              touchAction: "pan-y",
              userSelect: "none",
            }}
            className="relative mx-auto cursor-grab overflow-hidden active:cursor-grabbing"
          >
            <div className="relative h-[var(--card-h)]">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute top-0 left-1/2 h-full w-[var(--card-w)] will-change-[transform,opacity,filter]"
                >
                  <TestimonialCard testimonial={t} onExpand={setExpanded} />
                </div>
              ))}
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

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={index === i}
                className="group relative flex items-center justify-center p-1"
              >
                <span
                  className="block rounded-full transition-all duration-500"
                  style={{
                    width: index === i ? 24 : 7,
                    height: 7,
                    background: index === i ? "var(--lime)" : "var(--ash)",
                    opacity: index === i ? 1 : 0.45,
                  }}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <TestimonialDialog testimonial={expanded} onClose={() => setExpanded(null)} />
    </section>
  );
}
