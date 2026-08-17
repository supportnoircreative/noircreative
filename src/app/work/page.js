import { PageHero } from "@/components/shared/PageHero";
import { WorkGrid } from "@/components/shared/WorkGrid";
import { Statement } from "@/components/shared/Statement";
import { CtaBanner } from "@/components/shared/CtaBanner";

export const metadata = {
  title: "Work",
  description:
    "Case studies from Noir Creative — brand identity, web development and growth work for The Gallery Event, Elite Tax Solutions, TerraLogistical, and Nexus Guard.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Explore <em className="lime-accent not-italic">case studies.</em>
          </>
        }
        description="A handful of the brands we've helped move from idea to impossible-to-ignore — brand identity, web builds, and growth work shipped end to end."
      />
      <section id="work" className="px-5 py-[130px] max-sm:py-[88px] md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <WorkGrid />
        </div>
      </section>
      <Statement caption="Want your project featured here next? Tell us what you're building — we reply within one business day." />
      <CtaBanner />
    </>
  );
}