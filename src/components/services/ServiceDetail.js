import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

/**
 * One discipline as its own page.
 *
 * /services lists all six, so only that URL could rank and it had to cover
 * six unrelated topics at once. Each service now has a page deep enough to
 * stand on its own, cross-linked to the other five so none of them is
 * a dead end.
 */
export function ServiceDetail({ service }) {
  const others = services.filter((s) => s.slug && s.slug !== service.slug);

  return (
    <>
      {/* ---------- header ---------- */}
      <section className="border-b border-(--line) bg-[radial-gradient(circle_at_88%_0%,rgba(198,242,78,.10),transparent_42%)] px-5 pb-20 pt-[176px] md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <Reveal>
            <Link
              href="/services"
              className="group mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ash transition-colors duration-200 hover:text-text-1"
            >
              <ArrowLeft
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 ease-(--ease) group-hover:-translate-x-1"
              />
              All services
            </Link>
          </Reveal>

          <Reveal>
            <Eyebrow bare>Service {service.id}</Eyebrow>
          </Reveal>

          <RollText
            as="h1"
            stagger={90}
            className="text-[clamp(38px,6vw,72px)]"
            lines={[service.title]}
          />

          <Reveal>
            <p className="mt-7 max-w-[58ch] text-[17px] leading-[1.7] text-body">{service.intro}</p>
          </Reveal>

          {service.bestFor && (
            <Reveal>
              <p className="mt-8 max-w-[54ch] border-l-2 border-lime/40 pl-5 text-[15px] leading-[1.7] text-ash">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute">
                  Best for
                </span>
                <br />
                {service.bestFor}
              </p>
            </Reveal>
          )}

          <Reveal className="mt-10">
            <Button href="/contact" roll arrow>
              Start a brief
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------- what you get ---------- */}
      <section className="px-5 py-[110px] max-sm:py-[68px] md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <Reveal className="mb-14">
            <Eyebrow>What you get</Eyebrow>
            <h2 className="max-w-[18ch] text-[clamp(26px,3vw,40px)]">Everything included.</h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {service.deliverables?.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="rounded-card border border-(--line) bg-ink-raised p-[30px] shadow-card"
              >
                <h3 className="mb-3 text-[18px]">{item.title}</h3>
                <p className="m-0 text-[14.5px] leading-[1.65] text-ash">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- how we work ---------- */}
      <section className="on-bone px-5 py-[110px] max-sm:py-[68px] md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <Reveal className="mb-14">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="max-w-[20ch] text-[clamp(26px,3vw,40px)] text-ink">
              The way this runs.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-px bg-(--line-on-bone) md:grid-cols-3">
            {service.approach?.map((step, i) => (
              <Reveal key={step.title} delay={i * 70} className="bg-bone p-[30px]">
                <div className="badge-num mb-6">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mb-2.5 text-[17.5px] text-ink">{step.title}</h3>
                <p className="m-0 text-[14.5px] leading-[1.65]">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- the other disciplines ---------- */}
      <section className="border-t border-(--line) px-5 py-[100px] max-sm:py-[64px] md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <Reveal className="mb-10">
            <Eyebrow>Also under this roof</Eyebrow>
            <h2 className="max-w-[22ch] text-[clamp(24px,2.6vw,34px)]">
              Five other disciplines, same team.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 50}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex h-full flex-col rounded-card border border-(--line) bg-ink-raised p-6 transition-all duration-300 ease-(--ease) hover:-translate-y-1 hover:border-lime/30 hover:shadow-card-hover"
                >
                  <span className="font-mono text-[10.5px] font-semibold text-mute">{other.id}</span>
                  <h3 className="mb-2 mt-2.5 text-[17px]">{other.title}</h3>
                  <p className="m-0 text-[13.5px] leading-[1.6] text-ash">{other.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
