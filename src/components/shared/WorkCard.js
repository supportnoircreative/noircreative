"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TILT_OK = "(hover: hover) and (pointer: fine)";
const MOTION_OK = "(prefers-reduced-motion: reduce)";

export function WorkCard({ project }) {
  const ref = useRef(null);

  function onMouseMove(e) {
    const el = ref.current;
    if (!el || !window.matchMedia(TILT_OK).matches || window.matchMedia(MOTION_OK).matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 7;
    const ry = (px - 0.5) * 9;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  }

  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <Link
      ref={ref}
      href="/contact"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group block overflow-hidden rounded-card border border-(--line) bg-ink-raised shadow-card transition-[box-shadow,border-color,transform] duration-[350ms] hover:border-(--line-strong) hover:shadow-card-hover"
      )}
    >
      <div className="relative flex h-[300px] items-end justify-between overflow-hidden border-b border-(--line) px-[30px] py-[26px] max-sm:h-[120px] max-sm:items-start max-sm:px-4 max-sm:py-[14px]">
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 opacity-95 transition-transform duration-700 ease-(--ease) group-hover:scale-[1.07]",
            project.thumb
          )}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(255,255,255,.14),transparent_55%),radial-gradient(90%_70%_at_100%_100%,rgba(0,0,0,.45),transparent_60%)]"
        />
        <span className="relative z-[1] font-mono text-[13px] text-bone/55">{project.id}</span>
        <span className="relative z-[1] hidden font-mono text-sm font-bold uppercase tracking-[0.24em] text-bone/90 [text-shadow:0_2px_8px_rgba(0,0,0,.5)] sm:block">
          {project.mono}
        </span>
      </div>
      <div className="flex items-end justify-between gap-5 px-8 pb-[34px] pt-[30px] max-sm:flex-col max-sm:items-start max-sm:gap-[14px] max-sm:px-4 max-sm:pb-5 max-sm:pt-[18px]">
        <div>
          <span className="lime-accent mb-2.5 block text-[11.5px] font-semibold uppercase tracking-[0.14em] max-sm:mb-[6px] max-sm:text-[9.5px]">
            {project.tag}
          </span>
          <h3 className="mb-2 text-[22px] font-bold max-sm:mb-1 max-sm:text-[15px]">{project.name}</h3>
          <p className="m-0 text-[13.5px] text-ash max-sm:line-clamp-2 max-sm:text-[11.5px] max-sm:leading-relaxed">
            {project.full}
          </p>
        </div>
        <span className="flex size-[52px] flex-none items-center justify-center rounded-full bg-lime text-ink shadow-[0_1px_0_rgba(255,255,255,.5)_inset,0_10px_22px_-8px_rgba(198,242,78,.55)] transition-transform duration-300 group-hover:rotate-45 group-hover:scale-[1.06] max-sm:size-9">
          <ArrowUpRight size={18} strokeWidth={1.6} className="max-sm:size-[14px]" />
        </span>
      </div>
    </Link>
  );
}
