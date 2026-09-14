import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ACCENTS = {
  lime: { value: "lime-accent", glow: "bg-[radial-gradient(circle_at_88%_0%,rgba(198,242,78,.10),transparent_42%)]" },
  violet: { value: "text-violet", glow: "bg-[radial-gradient(circle_at_88%_0%,rgba(124,92,255,.12),transparent_42%)]" },
};

/**
 * A single case study as its own page.
 *
 * The /amazon-va tab rail shows the same four studies, but tabs share one URL,
 * so only that one page can ever rank. Each study rendered here is separately
 * indexable and can target its own category terms.
 */
export function CaseStudyDetail({ study }) {
  const accent = ACCENTS[study.accent] ?? ACCENTS.lime;

  return (
    <>
      {/* ---------- header ---------- */}
      <section className={cn("border-b border-(--line) px-5 pb-20 pt-[176px] md:px-8", accent.glow)}>
        <div className="mx-auto max-w-[1220px]">
          <Reveal immediate>
            <Link
              href="/amazon-va#amazon-case-studies"
              className="group mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ash transition-colors duration-200 hover:text-text-1"
            >
              <ArrowLeft
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 ease-(--ease) group-hover:-translate-x-1"
              />
              All case studies
            </Link>
          </Reveal>

          <Reveal immediate>
            <Eyebrow bare>{study.category}</Eyebrow>
          </Reveal>

          <RollText
            as="h1"
            immediate
            stagger={90}
            className="max-w-[20ch] text-[clamp(32px,5vw,60px)]"
            lines={[study.headline]}
          />

          <Reveal immediate>
            <p className="mt-6 m-0 text-[16px] text-body">{study.client}</p>
          </Reveal>

          <Reveal immediate>
            <dl className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute">Timeline</dt>
                <dd className="m-0 mt-1.5 text-[15px] font-semibold text-text-1">{study.timeline}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute">Scope</dt>
                <dd className="m-0 mt-1.5 text-[15px] font-semibold text-text-1">
                  {study.scope.join(" · ")}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------- headline metrics ---------- */}
      <section className="border-b border-(--line)">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {study.metrics.map((metric, i) => (
              <Reveal
                key={metric.label}
                delay={i * 70}
                className={cn(
                  "border-(--line) px-8 py-12 max-lg:[&:nth-child(n+3)]:border-t max-lg:[&:nth-child(2n)]:border-l",
                  i > 0 && "lg:border-l"
                )}
              >
                <div
                  className={cn(
                    "text-[clamp(34px,4vw,52px)] font-extrabold tracking-[-0.04em]",
                    accent.value
                  )}
                >
                  {metric.value}
                </div>
                <div className="mt-2.5 text-[14px] font-semibold text-text-1">{metric.label}</div>
                {metric.note && (
                  <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
                    {metric.note}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- the problem ---------- */}
      <section className="on-bone px-5 py-[110px] max-sm:py-[64px] md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>The problem</Eyebrow>
              <h2 className="max-w-[14ch] text-[clamp(26px,3vw,38px)]">What we took over.</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="m-0 text-[16.5px] leading-[1.8]">{study.challenge}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- what we did ---------- */}
      <section className="px-5 py-[110px] max-sm:py-[64px] md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <Reveal className="mb-14">
            <Eyebrow>What we did</Eyebrow>
            <h2 className="max-w-[18ch] text-[clamp(26px,3vw,38px)]">The work, step by step.</h2>
          </Reveal>

          <ol className="flex flex-col">
            {study.approach.map((step, i) => (
              <Reveal
                key={i}
                delay={i * 60}
                className="flex gap-7 border-t border-(--line) py-8 last:border-b"
              >
                <span className="badge-num flex-none">{String(i + 1).padStart(2, "0")}</span>
                <p className="m-0 max-w-[70ch] self-center text-[15.5px] leading-[1.75] text-body">
                  {step}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ul className="flex flex-wrap gap-2">
              {study.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-(--line) px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute"
                >
                  {tool}
                </li>
              ))}
            </ul>

            {study.pdf && (
              <a
                href={study.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[13.5px] font-semibold underline underline-offset-4 transition-opacity duration-200 lime-accent hover:opacity-70"
              >
                Download the full deck
                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-300 ease-(--ease) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- close ---------- */}
      <section className="border-t border-(--line) px-5 py-[90px] max-sm:py-[60px] md:px-8">
        <div className="mx-auto flex max-w-[1220px] flex-col items-center gap-7 text-center">
          <RollText
            as="h2"
            className="max-w-[22ch] text-[clamp(24px,3vw,36px)]"
            lines={["Want this kind of breakdown for your account?"]}
          />
          <Reveal>
            <p className="m-0 max-w-[52ch] text-[15.5px] text-body">
              The audit is the first deliverable, and it costs nothing. You keep the findings either
              way.
            </p>
          </Reveal>
          <Reveal className="flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" roll arrow>
              Get a free account audit
            </Button>
            <Button href="/amazon-va#amazon-case-studies" variant="outline" roll>
              See the other case studies
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
