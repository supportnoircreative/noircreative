"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChartColumn,
  LayoutTemplate,
  Monitor,
  Palette,
  Target,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  palette: Palette,
  monitor: Monitor,
  chart: ChartColumn,
  target: Target,
  layout: LayoutTemplate,
  video: Video,
};

const TILT_OK = "(hover: hover) and (pointer: fine)";
const MOTION_OK = "(prefers-reduced-motion: reduce)";

export function ServiceCard({ service, descriptionKey = "short" }) {
  const ref = useRef(null);
  const Icon = ICONS[service.icon];

  function onMouseMove(e) {
    const el = ref.current;
    if (!el || !window.matchMedia(TILT_OK).matches || window.matchMedia(MOTION_OK).matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 7;
    const ry = (px - 0.5) * 9;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "service-card group relative overflow-hidden rounded-card border border-(--line) bg-ink-raised p-10 shadow-card transition-[box-shadow,border-color,transform] duration-[350ms] hover:border-(--line-strong) hover:shadow-card-hover"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-inherit bg-[radial-gradient(560px_circle_at_var(--mx,50%)_var(--my,0%),rgba(255,255,255,.06),transparent_55%)] opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
      />
      <div className="relative z-[1]">
        <div className="mb-[14px] font-mono text-xs font-semibold text-ash">{service.id}</div>
        <div className="mb-[26px] flex size-[50px] items-center justify-center rounded-full border border-(--line-strong) bg-[linear-gradient(155deg,rgba(255,255,255,.07),rgba(255,255,255,0)_60%)] text-lime shadow-[0_1px_0_rgba(255,255,255,.09)_inset,0_-6px_10px_rgba(0,0,0,.35)_inset,0_6px_14px_-6px_rgba(0,0,0,.6)] transition-all duration-[350ms] group-hover:-translate-y-[5px] group-hover:border-lime group-hover:bg-lime group-hover:text-ink group-hover:shadow-[0_1px_0_rgba(255,255,255,.5)_inset,0_10px_24px_-6px_rgba(198,242,78,.55)]">
          <Icon size={20} strokeWidth={1.6} className="drop-shadow-[0_1px_1px_rgba(0,0,0,.4)]" />
        </div>
        <h3 className="mb-[11px] text-[19px] font-bold">{service.title}</h3>
        <p className="m-0 text-sm text-body">{service[descriptionKey]}</p>
        <Link
          href="/contact"
          className="mt-[22px] inline-flex items-center gap-2 text-[12.5px] font-semibold text-text-1 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:translate-x-[-6px] lg:opacity-0"
        >
          Start a brief <ArrowUpRight size={13} className="lime-accent" />
        </Link>
      </div>
    </article>
  );
}
