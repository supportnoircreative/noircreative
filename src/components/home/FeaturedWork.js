import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { WorkGrid } from "@/components/shared/WorkGrid";

export function FeaturedWork() {
  return (
    <section className="px-5 py-[130px] max-sm:py-[88px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <SectionHead
          eyebrow="Featured work"
          title="A couple of recent builds."
          desc="Two of the brands we've helped move from idea to impossible-to-ignore."
          side={
            <>
              See the full portfolio.{" "}
              <Link href="/work" className="lime-accent underline">
                All case studies →
              </Link>
            </>
          }
        />
        <WorkGrid limit={2} />
      </div>
    </section>
  );
}