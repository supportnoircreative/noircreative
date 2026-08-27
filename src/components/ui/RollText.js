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
  className,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
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
    if (!el || reduced) {
      setVisible(true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
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
  }, [reduced]);

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
