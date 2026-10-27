import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { Button } from "@/components/ui/Button";
import { amazonVa } from "@/data/amazonVa";

/**
 * Centred two-tone hero with the marketplace strip underneath.
 *
 * Everything here is above the fold, so every Reveal is `immediate`: the
 * content ships visible in the server HTML instead of waiting on hydration.
 */
export function AmazonHero() {
  const { hero } = amazonVa;
  const [plain, accent] = hero.title;

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_-10%,rgba(198,242,78,.11),transparent_48%),radial-gradient(circle_at_100%_100%,rgba(124,92,255,.09),transparent_40%)] px-5 pb-[72px] pt-[176px] text-center max-sm:pt-[150px] md:px-8">
      <div className="relative mx-auto max-w-[1220px]">
        <Reveal immediate>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-(--line-strong) px-4 py-2">
            <span className="dot" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ash">
              Taking on 3 new accounts this quarter
            </span>
          </div>
        </Reveal>

        <Reveal immediate>
          <Eyebrow center bare>{hero.eyebrow}</Eyebrow>
        </Reveal>

        <RollText
          as="h1"
          immediate
          stagger={90}
          className="mx-auto max-w-[1220px] text-[clamp(38px,5.6vw,78px)] tracking-[-0.04em]"
          lines={[
            <span key="p">{plain}</span>,
            <em key="a" className="lime-accent not-italic">
              {accent}
            </em>,
          ]}
        />

        <Reveal immediate>
          <p className="mx-auto mt-[26px] max-w-[58ch] text-[17px] text-body">{hero.description}</p>
        </Reveal>

        <Reveal
          immediate
          className="mt-10 flex flex-wrap items-center justify-center gap-3.5 max-sm:flex-col max-sm:[&>a]:w-full"
        >
          <Button href={hero.primaryCta.href} roll arrow className="cta-tall">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="outline" roll className="cta-tall">
            {hero.secondaryCta.label}
          </Button>
        </Reveal>

        {hero.footnote && (
          <Reveal immediate>
            <p className="mt-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ash">
              {hero.footnote}
            </p>
          </Reveal>
        )}

        {/* marketplace strip: plain text badges, grouped by marketplace */}
        <Reveal immediate className="mx-auto mt-[72px] max-w-[980px] border-t border-(--line) pt-9">
          <p className="m-0 mb-6 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-mute">
            Marketplaces we run
          </p>
          <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-8 gap-y-5 p-0">
            {hero.marketplaces.map((group) => (
              <li key={group.group} className="flex flex-wrap items-center justify-center gap-2.5">
                <span className="mr-1 text-[15px] font-extrabold tracking-[-0.02em] text-text-1">
                  {group.group}
                </span>
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-(--line-strong) bg-ink-raised/60 px-3.5 py-1.5 text-[12.5px] font-semibold text-body"
                  >
                    {item}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
