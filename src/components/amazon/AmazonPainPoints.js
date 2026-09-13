import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { amazonIcon } from "@/components/amazon/icons";
import { amazonVa } from "@/data/amazonVa";

/**
 * Problem-mirror section: the seller's own words on the left of each row,
 * what changes on the right. Reads as recognition before it reads as a pitch.
 */
export function AmazonPainPoints() {
  const { painPoints } = amazonVa;

  return (
    <section className="on-bone px-5 py-[130px] max-sm:py-[72px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <SectionHead
          eyebrow={painPoints.eyebrow}
          title={painPoints.title}
          desc={painPoints.desc}
        />

        <div className="grid grid-cols-1 gap-px bg-(--line-on-bone) md:grid-cols-2">
          {painPoints.items.map((item, i) => {
            const Icon = amazonIcon(item.icon);
            return (
              <Reveal
                key={item.quote}
                delay={i * 70}
                className="group bg-bone p-[34px] transition-colors duration-300 ease-(--ease) hover:bg-[#ecece4]"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-10 flex-none items-center justify-center rounded-full border border-(--line-on-bone-strong)">
                    <Icon size={17} strokeWidth={1.8} className="text-ink" />
                  </span>
                  <div>
                    <p className="m-0 text-[17.5px] font-semibold leading-[1.45] tracking-[-0.015em] text-ink">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <p className="mt-4 flex items-start gap-2.5 text-[13.5px] leading-[1.6]">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-px w-5 flex-none bg-ink/40 transition-all duration-300 ease-(--ease) group-hover:w-7 group-hover:bg-ink"
                      />
                      <span>{item.shift}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
