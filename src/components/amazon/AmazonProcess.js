"use client";

import { useId, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CenteredHead } from "@/components/amazon/CenteredHead";
import { cn } from "@/lib/utils";
import { amazonVa } from "@/data/amazonVa";

/**
 * Engagement steps as a floating step-through panel: a step rail on the left
 * (tabs), the active step on the right, with previous / next controls.
 */
export function AmazonProcess() {
  const { process } = amazonVa;
  const steps = process.steps;
  const [active, setActive] = useState(0);
  const baseId = useId();

  if (!steps?.length) return null;
  const step = steps[active];
  const last = steps.length - 1;

  // Arrow keys move between tabs and carry focus with them (roving tabindex).
  const onKeyDown = (e) => {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = Math.min(last, Math.max(0, active + delta));
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <section className="px-5 py-[120px] max-sm:py-[80px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <CenteredHead eyebrow={process.eyebrow} title={process.title} />

        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-(--line) bg-ink-raised shadow-card lg:grid-cols-[minmax(0,380px)_1fr]">
            {/* step rail */}
            <div
              role="tablist"
              aria-label="Engagement steps"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="flex border-(--line) max-lg:overflow-x-auto max-lg:border-b lg:flex-col lg:border-r"
            >
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.id}
                    id={`${baseId}-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative flex flex-1 items-center gap-4 px-7 py-6 text-left transition-colors duration-300 lg:flex-none lg:border-b lg:border-(--line) lg:last:border-b-0",
                      on ? "text-text-1" : "text-ash hover:text-text-1"
                    )}
                  >
                    {/* active indicator: left bar on desktop, bottom bar on mobile */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bg-lime transition-opacity duration-300 max-lg:inset-x-5 max-lg:bottom-0 max-lg:h-[2px] lg:inset-y-4 lg:left-0 lg:w-[3px]",
                        on ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-mute">{s.id}</span>
                    <span className="whitespace-nowrap text-[16px] font-bold tracking-[-0.01em]">{s.title}</span>
                  </button>
                );
              })}
            </div>

            {/* active step */}
            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${active}`}
              className="relative flex min-h-[340px] flex-col p-8 md:p-12"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-8 top-4 select-none font-display text-[clamp(96px,14vw,180px)] font-extrabold leading-none tracking-[-0.06em] text-text-1 opacity-[0.05]"
              >
                {step.id}
              </span>

              {/* re-keyed so each switch replays the fade */}
              <div key={step.id} className="step-fade relative">
                <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
                  Step {step.id} of {String(steps.length).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-[clamp(28px,3.4vw,40px)] tracking-[-0.03em]">{step.title}</h3>
                <p className="m-0 mt-5 max-w-[52ch] text-[16px] leading-[1.75] text-body">{step.body}</p>
              </div>

              <div className="relative mt-auto flex items-center justify-between gap-4 pt-10">
                {/* progress */}
                <div className="h-[3px] max-w-[220px] flex-1 overflow-hidden rounded-full bg-(--line)">
                  <div
                    className="h-full rounded-full bg-lime transition-[width] duration-500 ease-(--ease)"
                    style={{ width: `${((active + 1) / steps.length) * 100}%` }}
                  />
                </div>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActive((i) => Math.max(0, i - 1))}
                    disabled={active === 0}
                    aria-label="Previous step"
                    className="flex size-12 items-center justify-center rounded-full border border-(--line-strong) text-text-1 transition-all duration-300 hover:border-text-1 disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ArrowLeft size={17} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive((i) => Math.min(last, i + 1))}
                    disabled={active === last}
                    aria-label="Next step"
                    className="flex size-12 items-center justify-center rounded-full border border-transparent bg-lime text-ink transition-all duration-300 hover:bg-[#d6ff69] disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
