import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { Button } from "@/components/ui/Button";
import { amazonVa } from "@/data/amazonVa";

/**
 * Home-page entry point for the Amazon VA offering. Two columns: the pitch on
 * the left, a single headline metric lifted from the case studies on the right.
 * Content lives in amazonVa.teaser.
 */
export function AmazonTeaser() {
  const { teaser } = amazonVa;

  return (
    <section id="amazon-va" className="border-y border-(--line) px-5 py-[130px] max-sm:py-[72px] md:px-8">
      <div className="mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>{teaser.eyebrow}</Eyebrow>
          </Reveal>

          <RollText
            as="h2"
            stagger={80}
            className="text-[clamp(30px,4vw,50px)]"
            lines={teaser.title.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          />

          <Reveal>
            <p className="mt-5 max-w-[50ch] text-[15.5px] text-body">{teaser.desc}</p>
          </Reveal>

          <Reveal stagger className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {teaser.bullets.map((bullet) => (
              <p key={bullet} className="m-0 flex items-center gap-3 text-[14px] text-text-1">
                <Check size={15} strokeWidth={2.4} className="flex-none lime-accent" aria-hidden="true" />
                {bullet}
              </p>
            ))}
          </Reveal>

          <Reveal className="mt-9">
            <Button href={teaser.cta.href} roll arrow>
              {teaser.cta.label}
            </Button>
          </Reveal>
        </div>

        {/* headline metric card */}
        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-card border border-(--line) bg-ink-raised p-[40px] shadow-card">
            <span aria-hidden="true" className="cta-mark !size-[320px] opacity-[0.045]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-(--line-strong) px-3.5 py-1.5">
                <span className="dot" />
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ash">
                  Verified result
                </span>
              </span>

              <div className="mt-8 text-[clamp(52px,7vw,84px)] font-extrabold leading-none tracking-[-0.05em] lime-accent">
                {teaser.highlight.value}
              </div>
              <p className="mt-3 m-0 max-w-[22ch] text-[17px] font-semibold leading-[1.4] tracking-[-0.015em] text-text-1">
                {teaser.highlight.label}
              </p>
              <p className="mt-6 m-0 border-t border-(--line) pt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute">
                {teaser.highlight.note}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
