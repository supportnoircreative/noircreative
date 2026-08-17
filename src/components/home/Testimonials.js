"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const rowRef = useRef(null);

  function scrollByCard(dir) {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector(".testi-card");
    const step = card ? card.getBoundingClientRect().width + 1 : 320;
    row.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section
      id="testimonials"
      className="border-b border-(--line) bg-ink-raised px-5 py-[130px] max-sm:py-[88px] md:px-8"
    >
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-[50px] flex flex-wrap items-end justify-between gap-[30px]">
          <Reveal>
            <Eyebrow>Client reviews</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,50px)]">Don&apos;t take our word for it.</h2>
          </Reveal>
          <Reveal>
            <div className="flex gap-2.5">
              <button
                type="button"
                aria-label="Previous reviews"
                onClick={() => scrollByCard(-1)}
                className="flex size-[46px] items-center justify-center rounded-full border border-(--line-strong) bg-transparent text-text-1 transition-colors duration-250 hover:border-lime hover:bg-lime hover:text-ink"
              >
                <ChevronLeft size={16} strokeWidth={1.6} />
              </button>
              <button
                type="button"
                aria-label="Next reviews"
                onClick={() => scrollByCard(1)}
                className="flex size-[46px] items-center justify-center rounded-full border border-(--line-strong) bg-transparent text-text-1 transition-colors duration-250 hover:border-lime hover:bg-lime hover:text-ink"
              >
                <ChevronRight size={16} strokeWidth={1.6} />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div
            ref={rowRef}
            className="scrollbar-none -mx-[6px] -mb-[18px] flex gap-[18px] overflow-x-auto px-[6px] pb-[18px] pt-[6px] [scroll-snap-type:x_mandatory]"
          >
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="testi-card flex w-[min(380px,86vw)] flex-none flex-col rounded-2xl border border-(--line) bg-ink-raised p-8 shadow-card transition-[box-shadow,transform,border-color] duration-[350ms] hover:-translate-y-1 hover:border-(--line-strong) hover:shadow-card-hover [scroll-snap-align:start]"
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
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}