import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { amazonIcon } from "@/components/amazon/icons";
import { amazonVa } from "@/data/amazonVa";

/** Scope-of-work grid. Each card lists its concrete deliverables as chips. */
export function AmazonPillars() {
  const { pillars } = amazonVa;

  return (
    <section id="amazon-scope" className="px-5 py-[130px] max-sm:py-[72px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <SectionHead eyebrow={pillars.eyebrow} title={pillars.title} desc={pillars.desc} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.items.map((pillar, i) => {
            const Icon = amazonIcon(pillar.icon);
            return (
              <Reveal
                key={pillar.title}
                delay={i * 60}
                className="group flex h-full flex-col rounded-card border border-(--line) bg-ink-raised p-[30px] shadow-card transition-all duration-400 ease-(--ease) hover:-translate-y-1 hover:border-lime/30 hover:shadow-card-hover"
              >
                <span className="mb-6 flex size-12 items-center justify-center rounded-full border border-(--line-strong) transition-colors duration-300 ease-(--ease) group-hover:border-lime/40">
                  <Icon size={19} strokeWidth={1.8} className="lime-accent" />
                </span>

                <h3 className="mb-3 text-[19px]">{pillar.title}</h3>
                <p className="m-0 text-[14px] leading-[1.65] text-ash">{pillar.body}</p>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-(--line) pt-5">
                  {pillar.deliverables.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-(--line) px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
