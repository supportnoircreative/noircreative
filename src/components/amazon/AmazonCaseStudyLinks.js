import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { amazonVa } from "@/data/amazonVa";

/**
 * Links out to every Amazon case study page.
 *
 * The anchor text is each study's own headline rather than a generic "read
 * more", so both a reader and a crawler can tell what sits at the other end.
 * Rendered on /work, which is the page most likely to be linked to from
 * outside, so the case studies inherit some of that.
 */
export function AmazonCaseStudyLinks() {
  const { items } = amazonVa.caseStudies;
  if (!items?.length) return null;

  return (
    <section className="border-t border-(--line) px-5 py-[110px] max-sm:py-[72px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <SectionHead
          eyebrow="Amazon growth"
          title={["Marketplace work,", "measured."]}
          desc="Four Amazon accounts we took over, with the numbers straight from the client's Seller Central."
          side={
            <>
              Full service breakdown.{" "}
              <Link href="/amazon-va" className="lime-accent underline">
                Amazon VA services →
              </Link>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map((study, i) => {
            const headline = study.metrics?.[0];
            return (
              <Reveal key={study.id} delay={i * 60}>
                <Link
                  href={`/amazon-va/${study.slug}`}
                  className="group flex h-full flex-col rounded-card border border-(--line) bg-ink-raised p-[30px] shadow-card transition-all duration-400 ease-(--ease) hover:-translate-y-1 hover:border-lime/30 hover:shadow-card-hover"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mute">
                      {study.category}
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="flex-none text-ash transition-all duration-300 ease-(--ease) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text-1"
                    />
                  </div>

                  {headline && (
                    <div className="mb-5">
                      <span
                        className={cn(
                          "block text-[clamp(30px,3.4vw,44px)] font-extrabold leading-none tracking-[-0.04em]",
                          study.accent === "violet" ? "text-violet" : "lime-accent"
                        )}
                      >
                        {headline.value}
                      </span>
                      <span className="mt-2 block text-[13px] font-semibold text-text-1">
                        {headline.label}
                      </span>
                    </div>
                  )}

                  <h3 className="text-[17.5px] leading-[1.45]">{study.headline}</h3>

                  <p className="mt-auto pt-6 font-mono text-[10.5px] uppercase tracking-[0.14em] text-mute">
                    {study.timeline} · {study.scope[0]}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
