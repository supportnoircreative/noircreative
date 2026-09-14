"use client";

import { useRef, useState, useEffect, Children as ReactChildren } from "react";
import { cn } from "@/lib/utils";

/**
 * Vertical rolling-text reveal.
 *
 * Each line rolls up from behind an overflow mask (translateY 112% → 0) and
 * settles with a small per-line stagger. Triggers once when ~20% of the
 * element enters the viewport. Respects prefers-reduced-motion by rendering
 * content immediately.
 *
 * Usage:
 *   <RollText
 *     as="h2"
 *     lines={["A couple of", "recent builds."]}
 *     stagger={80}
 *     className="text-[clamp(30px,4vw,50px)]"
 *   />
 */
export function RollText({
  as: Tag = "div",
  lines,
  stagger = 80,
  immediate = false,
  className,
  ...props
}) {
  const ref = useRef(null);
  /* `immediate` renders the text already rolled in, straight from the server
     HTML. Use it for anything above the fold: the roll starts at opacity 0,
     and Largest Contentful Paint ignores elements at opacity 0, so animating
     the hero headline in makes LCP wait for hydration plus the animation.
     Below the fold the animation costs nothing, because the user has to
     scroll there anyway. */
  const [visible, setVisible] = useState(immediate);
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || immediate) return; // already visible, nothing to observe

    /* Reduced motion, or a browser without IntersectionObserver: reveal
       straight away. Scheduling the reveal on the next frame rather than
       calling setVisible in the effect body keeps the update out of this
       commit, so it can't cascade renders (react-hooks/set-state-in-effect).
       The roll itself is already neutralised in CSS under reduced motion. */
    if (reduced || !("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, immediate]);

  return (
    <Tag
      ref={ref}
      className={cn(visible && "is-rolled", className)}
      {...props}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className="roll-line"
          style={{ "--roll-delay": `${Math.min(i * stagger, 150)}ms` }}
        >
          <span className="text-roll-mask">
            <span className="text-roll">{ReactChildren.toArray(line)}</span>
          </span>
        </span>
      ))}
    </Tag>
  );
}
