"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChartColumn,
  LayoutTemplate,
  Monitor,
  Palette,
  Plus,
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
  const [open, setOpen] = useState(false);
  const Icon = ICONS[service.icon];
  const desc = service[descriptionKey];

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
        "service-card group relative overflow-hidden rounded-card border border-(--line) bg-ink-raised p-5 shadow-card transition-[box-shadow,border-color,transform] duration-[350ms] hover:border-(--line-strong) hover:shadow-card-hover md:p-10"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-inherit bg-[radial-gradient(560px_circle_at_var(--mx,50%)_var(--my,0%),rgba(255,255,255,.06),transparent_55%)] opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
      />

      {/* ----- Mobile: compact accordion (heading only, opens on click) ----- */}
      <div className="relative z-[1] md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${service.id}-desc`}
          className="flex w-full items-center gap-3 py-1 text-left"
        >
          <Icon size={20} strokeWidth={1.6} className="lime-accent flex-none" />
          <span className="flex-1">
            <span className="block font-mono text-[10.5px] font-semibold text-ash">
              {service.id}
            </span>
            <span className="block text-[17px] font-bold leading-tight">{service.title}</span>
          </span>
          <span
            className={cn(
              "relative flex size-[22px] flex-none items-center justify-center rounded-full border border-(--line-strong) text-lime transition-transform duration-300",
              open && "rotate-45"
            )}
          >
            <Plus size={13} strokeWidth={2} />
          </span>
        </button>

        <div
          id={`${service.id}-desc`}
          className={cn(
            "grid transition-[grid-template-rows] duration-[380ms] ease-(--ease)",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div
            className="overflow-hidden transition-[opacity,transform] duration-[380ms] ease-(--ease)"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-4px)",
            }}
          >
            <p className="pt-3 text-sm text-body">{desc}</p>
            <Link
              href="/contact"
              className="mt-[14px] inline-flex items-center gap-2 text-[12.5px] font-semibold text-text-1"
            >
              Start a brief <ArrowUpRight size={13} className="lime-accent" />
            </Link>
          </div>
        </div>
      </div>

      {/* ----- Desktop (md+): heading, description opens itself on focus ----- */}
      <div className="relative z-[1] hidden md:block">
        <div className="mb-[14px] font-mono text-xs font-semibold text-ash">{service.id}</div>
        <div className="mb-[26px] flex size-[50px] items-center justify-center rounded-full border border-(--line-strong) bg-[linear-gradient(155deg,rgba(255,255,255,.07),rgba(255,255,255,0)_60%)] text-lime shadow-[0_1px_0_rgba(255,255,255,.09)_inset,0_-6px_10px_rgba(0,0,0,.35)_inset,0_6px_14px_-6px_rgba(0,0,0,.6)] transition-all duration-[350ms] group-hover:-translate-y-[5px] group-hover:border-lime group-hover:bg-lime group-hover:text-ink group-hover:shadow-[0_1px_0_rgba(255,255,255,.5)_inset,0_10px_24px_-6px_rgba(198,242,78,.55)]">
          <Icon size={20} strokeWidth={1.6} className="drop-shadow-[0_1px_1px_rgba(0,0,0,.4)]" />
        </div>
        <h3 className="mb-[11px] text-[19px] font-bold">{service.title}</h3>
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-[380ms] ease-(--ease)",
            "grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]"
          )}
        >
          <div
            className="overflow-hidden opacity-0 -translate-y-0.5 transition-[opacity,transform] duration-[380ms] ease-(--ease) md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100"
          >
            <p className="m-0 text-sm text-body">{desc}</p>
            <Link
              href="/contact"
              className="mt-[22px] inline-flex items-center gap-2 text-[12.5px] font-semibold text-text-1"
            >
              Start a brief <ArrowUpRight size={13} className="lime-accent" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
