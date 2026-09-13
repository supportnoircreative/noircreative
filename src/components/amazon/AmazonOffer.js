import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { amazonIcon } from "@/components/amazon/icons";
import { amazonVa } from "@/data/amazonVa";

/**
 * Risk-reversal close: the four guarantees, a small proof strip, and the
 * booking CTA. Sits on bone to break the long dark run above it.
 */
export function AmazonOffer() {
  const { offer } = amazonVa;

  return (
    <section className="on-bone px-5 py-[130px] max-sm:py-[72px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <SectionHead eyebrow={offer.eyebrow} title={offer.title} desc={offer.desc} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {offer.guarantees.map((item, i) => {
            const Icon = amazonIcon(item.icon);
            return (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="group flex gap-5 rounded-card border border-(--line-on-bone) bg-bone p-[30px] shadow-card-bone transition-all duration-400 ease-(--ease) hover:-translate-y-1 hover:shadow-card-bone-hover"
              >
                <span className="flex size-11 flex-none items-center justify-center rounded-full border border-(--line-on-bone-strong) transition-colors duration-300 ease-(--ease) group-hover:border-ink">
                  <Icon size={18} strokeWidth={1.8} className="text-ink" />
                </span>
                <div>
                  <h3 className="mb-2 text-[17.5px] text-ink">{item.title}</h3>
                  <p className="m-0 text-[14px] leading-[1.65]">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* proof strip + close */}
        <Reveal className="mt-12 flex flex-col items-center gap-10 border-t border-(--line-on-bone) pt-12 lg:flex-row lg:justify-between">
          <dl className="flex flex-wrap justify-center gap-x-12 gap-y-6 lg:justify-start">
            {offer.proofBar.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="m-0 text-[clamp(30px,3.4vw,42px)] font-extrabold tracking-[-0.04em] text-ink">
                  {stat.value}
                </dd>
                <p className="m-0 mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>

          <Button href={offer.cta.href} variant="dark" roll arrow className="flex-none">
            {offer.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
