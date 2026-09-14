"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades content up as it scrolls into view.
 *
 * `immediate` renders it already revealed, from the server HTML. Use it for
 * anything above the fold: the reveal starts at opacity 0, so animating
 * hero content in delays both Largest Contentful Paint and Speed Index until
 * JavaScript has hydrated. Below the fold the animation is free, because the
 * user has to scroll there first.
 */
export function Reveal({ children, stagger, delay = 0, immediate = false, className, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    const el = ref.current;
    if (!el || immediate) return;

    // No IntersectionObserver: reveal on the next frame rather than calling
    // setState in the effect body, which would cascade renders.
    if (!("IntersectionObserver" in window)) {
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={cn(
        stagger ? "reveal-stagger" : "reveal",
        visible && "is-visible",
        className
      )}
      style={delay && !immediate ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
