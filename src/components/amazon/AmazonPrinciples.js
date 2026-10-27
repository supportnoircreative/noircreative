import { Reveal } from "@/components/ui/Reveal";
import { CenteredHead } from "@/components/amazon/CenteredHead";
import { amazonIcon } from "@/components/amazon/icons";
import { amazonVa } from "@/data/amazonVa";

/** Four principle cards: what separates an account owner from a task queue. */
export function AmazonPrinciples() {
  const { principles } = amazonVa;

  return (
    <section className="px-5 py-[120px] max-sm:py-[80px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <CenteredHead eyebrow={principles.eyebrow} title={principles.title} desc={principles.desc} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.items.map((item, i) => {
            const Icon = amazonIcon(item.icon);
            return (
              <Reveal key={item.title} delay={i * 70}>
                <div className="group h-full rounded-[22px] border border-(--line) bg-ink-raised p-8 shadow-card transition-all duration-400 ease-(--ease) hover:-translate-y-1 hover:border-lime/30 hover:shadow-card-hover">
                  <span className="flex size-12 items-center justify-center rounded-2xl border border-(--line-strong) transition-colors duration-300 group-hover:border-lime/40">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" className="lime-accent" />
                  </span>
                  <h3 className="mt-8 text-[19px] tracking-[-0.02em]">{item.title}</h3>
                  <p className="m-0 mt-3 text-[14px] leading-[1.7] text-ash">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
