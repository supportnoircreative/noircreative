import { HeroCanvas } from "@/components/home/HeroCanvas";
import { Marquee } from "@/components/shared/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { Eyebrow } from "@/components/ui/Eyebrow";

const chips = [
  { text: "const brand = bold;", className: "top-[22%] left-[7%]", delay: "0s" },
  { text: "npm run ship", className: "top-[16%] right-[9%] code-chip--lime", delay: "1.4s" },
  { text: "{ growth: true }", className: "bottom-[20%] left-[11%]", delay: "2.6s" },
  { text: "<Noir/>", className: "bottom-[26%] right-[7%] code-chip--violet", delay: "0.8s" },
];

export function Hero() {
  return (
    <section className="hero relative overflow-hidden bg-[radial-gradient(circle_at_86%_4%,rgba(198,242,78,.12),transparent_40%),radial-gradient(circle_at_2%_96%,rgba(124,92,255,.12),transparent_38%)] px-5 pb-[60px] pt-[150px] md:px-8 md:pb-[90px] md:pt-[210px]">
      <HeroCanvas />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,var(--hero-fade-1)_0%,var(--hero-fade-2)_78%,var(--surface)_100%)]"
      />

      {chips.map((chip) => (
        <span
          key={chip.text}
          aria-hidden="true"
          style={{ animationDelay: chip.delay }}
          className={`code-chip ${chip.className} hidden lg:block`}
        >
          {chip.text}
        </span>
      ))}

      <div className="relative z-[2] mx-auto max-w-[1220px]">
        <div className="mx-auto max-w-[1000px] text-center">
          <Reveal>
            <Eyebrow center bare>Digital Engineering &amp; Design Collective</Eyebrow>
          </Reveal>
          <Reveal>
            <h1 className="text-[clamp(44px,8.6vw,118px)] tracking-[-0.045em]">
              Where bold ideas <em className="lime-accent not-italic">get{"\u00A0"}built.</em>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-[30px] max-w-[56ch] text-lg text-body">
              Noir Creative transforms ambitious ideas into lasting digital experiences — brand
              identity, websites, and digital systems, engineered with the same discipline as
              they&apos;re designed.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-11 flex flex-wrap justify-center gap-3.5 max-sm:w-full max-sm:flex-col max-sm:[&>a]:w-full">
              <Button href="/contact" arrow>
                Start a project
              </Button>
              <Button href="/work" variant="outline">
                See the work
              </Button>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-[60px] flex flex-wrap items-center justify-center gap-[22px] text-[13.5px] text-ash max-sm:mt-10">
              <span className="flex items-center gap-2">
                <StarRating rating={5} />
              </span>
              <span>
                <strong className="text-text-1">100%</strong> client recommend rate
              </span>
              <span className="hidden h-4 w-px bg-(--line-strong) sm:block" aria-hidden="true" />
              <span>
                <strong className="text-text-1">29+</strong> projects shipped
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
