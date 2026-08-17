import { Reveal } from "@/components/ui/Reveal";

export function Statement({ caption }) {
  return (
    <section className="border-b border-(--line) py-[110px] text-center">
      <div className="mx-auto max-w-[1220px] px-5 md:px-8">
        <Reveal>
          <p className="mx-auto max-w-[20ch] text-[clamp(24px,3.4vw,42px)] font-bold leading-[1.28] tracking-tight text-text-1">
            We empower startups and established businesses with the{" "}
            <span className="lime-accent">tools</span> and technologies they need to thrive.
          </p>
          <p className="mx-auto mt-9 max-w-[56ch] text-sm text-ash">{caption}</p>
        </Reveal>
      </div>
    </section>
  );
}
