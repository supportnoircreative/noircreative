"use client";

import { useEffect, useRef } from "react";

function Counter({ target, suffix = "", accent = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1400;
        let start = null;
        function step(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = `${target}${suffix}`;
        }
        requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix]);

  return (
    <span ref={ref} className={accent ? "accent text-lime" : undefined}>
      0{suffix}
    </span>
  );
}

const stats = [
  { target: 100, suffix: "%", label: "Clients who'd recommend us" },
  { target: 29, suffix: "+", label: "Projects shipped" },
  { target: 6, suffix: "", label: "Disciplines under one roof", accent: true },
  { static: true, label: "Support & project visibility", value: "24/7" },
];

export function Stats() {
  return (
    <section className="border-y border-(--line)">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-(--line) border-l-0 px-8 py-[60px] sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(n+3)]:border-t max-sm:px-6 max-sm:py-9 lg:[&:nth-child(n+2)]:border-l lg:[&:nth-child(n+3)]:border-t-0"
            >
              {stat.static ? (
                <div className="text-[clamp(38px,4.4vw,64px)] font-extrabold tracking-[-0.04em] text-text-1">
                  {stat.value}
                </div>
              ) : (
                <div className="flex items-baseline gap-[2px] text-[clamp(38px,4.4vw,64px)] font-extrabold tracking-[-0.04em] text-text-1">
                  <Counter
                    target={stat.target}
                    suffix={stat.suffix}
                    accent={stat.accent}
                  />
                </div>
              )}
              <div className="mt-3 text-[13.5px] text-ash">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}