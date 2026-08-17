import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const checklist = [
  "Strategic discovery before design",
  "Built entirely in-house",
  "Systems built to scale with you",
  "24/7 global support",
];

export function CompanyProfile({ long = false }) {
  return (
    <section className="on-bone px-5 py-[130px] max-sm:py-[88px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid grid-cols-1 items-start gap-11 min-[1080px]:grid-cols-[0.9fr_1.1fr] min-[1080px]:gap-[70px]">
          <Reveal>
            <Eyebrow>{long ? "Who we are" : "Company profile"}</Eyebrow>
            <h2 className="max-w-[14ch] text-[clamp(30px,4vw,46px)]">
              {long
                ? "Professionalism and commitment fulfillment, by design."
                : "We build intelligent digital solutions, not just deliverables."}
            </h2>
            <div className="mt-[34px] border-t border-(--line-on-bone) pt-[26px]">
              <div className="text-[56px] font-extrabold tracking-[-0.03em] text-ink">
                06<span className="text-violet">.</span>
              </div>
              <div className="mt-[6px] text-[13px] text-[#6C7169]">
                Disciplines under one roof — no sub-contracted black boxes.
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="about-copy">
              <p className="m-0 mb-8 max-w-[52ch] text-base text-[#3E423B]">
                Noir Creative provides quick, efficient, and accountable solutions for the growing
                need for online businesses and services. We&apos;ve earned a reputation for
                professionalism and commitment fulfillment — websites and brand systems that fuse
                original, imaginative concepts with the unmatched talent of an in-house team.
              </p>
              {long && (
                <p className="m-0 mb-8 max-w-[52ch] text-base text-[#3E423B]">
                  We know how crucial your company&apos;s online presence is, so we customize every
                  engagement — from a single brand refresh to a full multi-channel digital system —
                  to satisfy exactly what your business needs.
                </p>
              )}
            </div>
            <ul className="mb-9 grid grid-cols-1 gap-5 min-[860px]:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold text-[#22251F]">
                  <span className="mt-px flex size-[22px] flex-none items-center justify-center rounded-full bg-ink text-lime">
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3.5 py-12">
              <Button className="text-white" href="/services" variant="dark" arrow>
                See our services
              </Button>
              {!long && (
                <Button href="/about" variant="outline-on-bone" arrow>
                  More about us
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}