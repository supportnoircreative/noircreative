"use client";

import { useId, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CenteredHead } from "@/components/amazon/CenteredHead";
import { amazonIcon } from "@/components/amazon/icons";
import { cn } from "@/lib/utils";
import { amazonVa } from "@/data/amazonVa";

/**
 * Platform cards, laid out 3 + 2 on desktop. "See more" expands a card's
 * deliverables in place; cards open independently so two can be compared.
 */
export function AmazonPlatforms() {
  const { platforms } = amazonVa;
  const [open, setOpen] = useState(() => new Set());
  const baseId = useId();

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section className="border-y border-(--line) px-5 py-[120px] max-sm:py-[80px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <CenteredHead eyebrow={platforms.eyebrow} title={platforms.title} desc={platforms.desc} />

        {/* 6-col grid: first three cards span 2, the rest span 3 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {platforms.items.map((item, i) => {
            const Icon = amazonIcon(item.icon);
            const isOpen = open.has(i);
            const listId = `${baseId}-${i}`;
            const walmart = item.marketplace === "Walmart";

            return (
              <Reveal
                key={item.title}
                delay={(i % 3) * 70}
                className={cn(
                  "h-full",
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                  // an odd last card spans both columns on tablet
                  i === platforms.items.length - 1 && platforms.items.length % 2 && "md:col-span-2"
                )}
              >
                <article className="flex h-full flex-col rounded-[22px] border border-(--line) bg-ink-raised p-8 shadow-card">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-(--line-strong)">
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className={walmart ? "text-violet" : "lime-accent"}
                      />
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em]",
                        walmart ? "border-violet/40 text-text-1" : "border-lime/35 text-text-1"
                      )}
                    >
                      {item.marketplace}
                    </span>
                  </div>

                  <h3 className="mt-8 text-[21px] tracking-[-0.02em]">{item.title}</h3>
                  <p className="m-0 mt-3 text-[14.5px] leading-[1.7] text-body">{item.body}</p>

                  {/* grid-rows 0fr → 1fr animates height without measuring it */}
                  <div
                    id={listId}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease)",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                    inert={!isOpen}
                  >
                    <ul className="m-0 min-h-0 list-none overflow-hidden p-0">
                      <li className="h-6" aria-hidden="true" />
                      {item.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-center gap-3 border-t border-(--line) py-2.5 text-[13.5px] text-text-1"
                        >
                          <Check
                            size={14}
                            strokeWidth={2.4}
                            aria-hidden="true"
                            className={cn("flex-none", walmart ? "text-violet" : "lime-accent")}
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={listId}
                    onClick={() => toggle(i)}
                    className="group mt-auto inline-flex items-center gap-2 self-start pt-7 text-[13.5px] font-semibold text-text-1"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full border border-(--line-strong) transition-colors duration-300 group-hover:border-text-1">
                      <Plus
                        size={14}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className={cn("transition-transform duration-400 ease-(--ease)", isOpen && "rotate-45")}
                      />
                    </span>
                    {isOpen ? "See less" : "See more"}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
