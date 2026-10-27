import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { amazonVa } from "@/data/amazonVa";

/** Two cards side by side, directly under the proof panel and matched to its
    width: the audit offer, and a route on to the full case studies. */
export function AmazonClosing() {
  const { closing } = amazonVa;
  if (!closing?.length) return null;

  return (
    <section className="px-3 sm:px-5 md:px-8">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 md:grid-cols-2">
        {closing.map((card, i) => {
          const bone = card.tone === "bone";
          return (
            <Reveal key={card.title} delay={i * 80}>
              <div
                className={cn(
                  "relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[28px] border p-10 max-sm:p-8",
                  bone
                    ? "on-bone border-(--line-on-bone) shadow-card-bone"
                    : "border-(--line) bg-ink-raised shadow-card"
                )}
              >
                {!bone && (
                  <span aria-hidden="true" className="cta-mark !size-[300px] opacity-[0.05]" />
                )}
                <div className="relative flex h-full flex-col">
                  <Eyebrow>{card.eyebrow}</Eyebrow>
                  <h2 className="max-w-[16ch] text-[clamp(28px,3.2vw,40px)] tracking-[-0.03em]">
                    {card.title}
                  </h2>
                  <p className={cn("m-0 mt-5 max-w-[44ch] text-[15.5px]", !bone && "text-body")}>
                    {card.body}
                  </p>
                  <div className="mt-auto pt-10">
                    <Button href={card.cta.href} variant={bone ? "dark" : "outline"} roll arrow>
                      {card.cta.label}
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
