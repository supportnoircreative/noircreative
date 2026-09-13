import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { Button } from "@/components/ui/Button";
import { amazonVa } from "@/data/amazonVa";

const TONES = {
  lime: "code-chip--lime",
  violet: "code-chip--violet",
  plain: "",
};

// Fixed positions so the chips read as a composed cluster rather than a random
// scatter. They deliberately sit below the fixed header and inside of the
// floating theme / WhatsApp buttons so nothing overlaps. Index maps to data
// order; extra chips cycle back through the list.
const CHIP_POS = [
  "left-[3%] top-[34%] [animation-delay:-1.2s]",
  "right-[4%] top-[27%] [animation-delay:-3.6s]",
  "left-[7%] bottom-[18%] [animation-delay:-5.1s]",
  "right-[9%] bottom-[26%] [animation-delay:-2.4s]",
];

export function AmazonHero() {
  const { hero } = amazonVa;

  return (
    <section className="relative overflow-hidden border-b border-(--line) bg-[radial-gradient(circle_at_88%_0%,rgba(198,242,78,.10),transparent_42%)] px-5 pb-[104px] pt-[176px] text-center md:px-8">
      {/* decorative marketplace chips — hidden on small screens where they'd crowd the type */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 max-lg:hidden">
        {hero.chips.map((chip, i) => (
          <span
            key={chip.label}
            className={`code-chip ${TONES[chip.tone] ?? ""} ${CHIP_POS[i % CHIP_POS.length]}`}
          >
            {chip.label}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-[1220px]">
        <Reveal>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-(--line-strong) px-4 py-2">
            <span className="dot" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ash">
              Taking on 3 new accounts this quarter
            </span>
          </div>
        </Reveal>

        <Reveal>
          <Eyebrow center bare>{hero.eyebrow}</Eyebrow>
        </Reveal>

        <RollText
          as="h1"
          stagger={90}
          className="mx-auto text-[clamp(36px,6vw,72px)]"
          lines={hero.title.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        />

        <Reveal>
          <p className="mx-auto mt-[22px] max-w-[58ch] text-[16.5px] text-body">{hero.description}</p>
        </Reveal>

        <Reveal className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <Button href={hero.primaryCta.href} roll arrow>
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="outline" roll>
            {hero.secondaryCta.label}
          </Button>
        </Reveal>

        {hero.footnote && (
          <Reveal>
            <p className="mt-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ash">
              {hero.footnote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
