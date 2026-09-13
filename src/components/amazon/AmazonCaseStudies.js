"use client";

import { useId, useState } from "react";
import { Quote } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { amazonVa } from "@/data/amazonVa";

const ACCENTS = {
  lime: {
    value: "lime-accent",
    rail: "border-lime/25",
    glow: "bg-[radial-gradient(circle_at_18%_0%,rgba(198,242,78,.12),transparent_55%)]",
    tabOn: "border-lime/45 text-text-1",
  },
  violet: {
    value: "text-violet",
    rail: "border-violet/25",
    glow: "bg-[radial-gradient(circle_at_18%_0%,rgba(124,92,255,.14),transparent_55%)]",
    tabOn: "border-violet/45 text-text-1",
  },
};

function accentOf(study) {
  return ACCENTS[study.accent] ?? ACCENTS.lime;
}

/**
 * Detailed case studies with a tab rail. One study is expanded at a time so
 * the long-form detail (challenge → approach → metrics → quote) gets room to
 * breathe instead of being flattened into equal-height cards.
 *
 * Content comes entirely from amazonVa.caseStudies in src/data/amazonVa.js —
 * add, remove or reorder entries there and this adapts.
 */
export function AmazonCaseStudies() {
  const { caseStudies } = amazonVa;
  const items = caseStudies.items;
  const [active, setActive] = useState(0);
  const panelId = useId();

  if (!items?.length) return null;

  const study = items[active];
  const accent = accentOf(study);

  return (
    <section
      id="amazon-case-studies"
      className="border-y border-(--line) px-5 py-[130px] max-sm:py-[72px] md:px-8"
    >
      <div className="mx-auto max-w-[1220px]">
        <SectionHead
          eyebrow={caseStudies.eyebrow}
          title={caseStudies.title}
          desc={caseStudies.desc}
          side={caseStudies.side}
        />

        {/* ---------- selector rail ---------- */}
        <div role="tablist" aria-label="Amazon case studies" className="mb-8 flex flex-wrap gap-2.5">
          {items.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`${panelId}-panel`}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex items-center gap-3 rounded-full border px-5 py-3 text-left transition-all duration-300 ease-(--ease)",
                  on
                    ? cn("bg-ink-raised shadow-card", accentOf(item).tabOn)
                    : "border-(--line) text-ash hover:-translate-y-0.5 hover:border-(--line-strong) hover:text-text-1"
                )}
              >
                <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-mute">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13.5px] font-semibold tracking-tight">{item.tab}</span>
              </button>
            );
          })}
        </div>

        {/* ---------- expanded study ---------- */}
        <div
          id={`${panelId}-panel`}
          role="tabpanel"
          // Re-keying on the active id restarts the reveal animation per switch.
          key={study.id}
          className={cn(
            "overflow-hidden rounded-card border border-(--line) bg-ink-raised shadow-card",
            accent.glow
          )}
        >
          {/* meta header */}
          <div className="flex flex-col gap-6 border-b border-(--line) p-[34px] md:flex-row md:items-end md:justify-between md:p-[44px]">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                {study.category}
              </p>
              <h3 className="max-w-[26ch] text-[clamp(23px,2.6vw,33px)]">{study.headline}</h3>
              <p className="mt-4 m-0 text-[14px] text-ash">{study.client}</p>
            </div>

            <dl className="flex flex-none gap-8 md:flex-col md:gap-4 md:text-right">
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute">
                  Timeline
                </dt>
                <dd className="m-0 mt-1 text-[14.5px] font-semibold text-text-1">{study.timeline}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute">Scope</dt>
                <dd className="m-0 mt-1 text-[14.5px] font-semibold text-text-1">
                  {study.scope.join(" · ")}
                </dd>
              </div>
            </dl>
          </div>

          {/* metric rail */}
          <div className={cn("grid grid-cols-2 border-b border-(--line) lg:grid-cols-4")}>
            {study.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={cn(
                  "border-(--line) px-7 py-8 max-lg:[&:nth-child(n+3)]:border-t max-lg:[&:nth-child(2n)]:border-l",
                  i > 0 && "lg:border-l"
                )}
              >
                <div
                  className={cn(
                    "text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.04em]",
                    accent.value
                  )}
                >
                  {metric.value}
                </div>
                <div className="mt-2 text-[13.5px] font-semibold text-text-1">{metric.label}</div>
                {metric.note && (
                  <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
                    {metric.note}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-(--line) p-[34px] max-lg:border-b lg:border-r md:p-[44px]">
              <p className="eyebrow eyebrow--bare">The problem</p>
              <p className="m-0 text-[15px] leading-[1.75] text-body">{study.challenge}</p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {study.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-(--line) px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-[34px] md:p-[44px]">
              <p className="eyebrow eyebrow--bare">What we did</p>
              <ol className="flex flex-col gap-5">
                {study.approach.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-0.5 font-mono text-[11px] font-semibold tracking-[0.14em] lime-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14.5px] leading-[1.7] text-body">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* client quote */}
          {study.testimonial && (
            <figure
              className={cn(
                "m-0 flex gap-5 border-t p-[34px] md:p-[44px]",
                "border-(--line)"
              )}
            >
              <Quote
                size={26}
                strokeWidth={1.6}
                className={cn("flex-none", accent.value)}
                aria-hidden="true"
              />
              <div>
                <blockquote className="m-0 max-w-[62ch] text-[clamp(17px,1.9vw,21px)] font-semibold leading-[1.5] tracking-[-0.015em] text-text-1">
                  {study.testimonial.quote}
                </blockquote>
                <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                  {study.testimonial.author} — {study.testimonial.role}
                </figcaption>
              </div>
            </figure>
          )}
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="m-0 max-w-[52ch] text-[14px] text-ash">
            Want the same breakdown for your account? The audit is the first deliverable, and it&rsquo;s free.
          </p>
          <Button href="/contact" size="sm" roll arrow>
            Request your audit
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
