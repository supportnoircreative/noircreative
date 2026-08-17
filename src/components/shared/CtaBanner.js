import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-b border-(--line) px-5 py-[120px] text-center md:px-8">
      <div className="cta-mark" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1220px]">
        <Reveal>
          <h2 className="mx-auto max-w-[16ch] text-[clamp(32px,4.8vw,60px)] tracking-tight">
            Ready to build something <em className="lime-accent not-italic">impossible to ignore</em>?
          </h2>
          <p className="mx-auto mt-6 max-w-[50ch] text-base text-body">
            Tell us where the business needs to go — we&apos;ll tell you exactly what it takes to build
            it, and what it costs.
          </p>
          <div className="mt-11 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" arrow>
              Get a quote
            </Button>
            <Button href={`mailto:${site.email}`} variant="outline">
              Email us directly
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
