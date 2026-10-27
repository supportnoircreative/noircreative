import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CenteredHead } from "@/components/amazon/CenteredHead";
import { cn } from "@/lib/utils";
import { amazonVa, AMAZON_PATH } from "@/data/amazonVa";

/**
 * Floating bone panel of headline results, one tile per case study.
 *
 * Tiles are derived from amazonVa.caseStudies (each study's first metric), so
 * adding a study adds a tile. Lime is illegible on bone, so the accent here is
 * violet for "violet" studies and ink for the rest.
 */
export function AmazonProof() {
  const { proof, caseStudies } = amazonVa;
  const items = caseStudies.items.filter((s) => s.metrics?.length);
  if (!items.length) return null;

  return (
    <section className="px-3 pb-4 sm:px-5 md:px-8">
      <div className="on-bone mx-auto max-w-[1280px] rounded-[28px] border border-(--line-on-bone) px-5 py-[88px] shadow-card-bone max-sm:py-16 md:px-12">
        <CenteredHead
          eyebrow={proof.eyebrow}
          title={proof.title}
          desc={proof.desc}
          accentClass="text-violet"
        />

        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((study, i) => {
            const metric = study.metrics[0];
            return (
              <Reveal key={study.id} delay={i * 70}>
                <Link
                  href={`${AMAZON_PATH}/${study.slug}`}
                  className="group flex h-full flex-col rounded-card border border-(--line-on-bone) bg-white/70 p-7 transition-all duration-400 ease-(--ease) hover:-translate-y-1 hover:bg-white hover:shadow-card-bone-hover"
                >
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#6c7169]">
                    {study.tab}
                  </span>
                  <span
                    className={cn(
                      "mt-7 block text-[clamp(38px,4vw,52px)] font-extrabold leading-none tracking-[-0.045em]",
                      study.accent === "violet" ? "text-violet" : "text-ink"
                    )}
                  >
                    {metric.value}
                  </span>
                  <span className="mt-3 block text-[14px] font-semibold leading-snug text-ink">
                    {metric.label}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[13px] font-semibold text-ink">
                    <span className="underline decoration-(--line-on-bone-strong) underline-offset-4 transition-colors duration-300 group-hover:decoration-ink">
                      Case study
                    </span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-(--ease) group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
