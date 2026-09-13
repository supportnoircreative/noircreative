import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { amazonVa } from "@/data/amazonVa";

/** Engagement timeline — mirrors the site's existing numbered four-step rail. */
export function AmazonProcess() {
  const { process } = amazonVa;

  return (
    <section className="border-b border-(--line)">
      <div className="mx-auto max-w-[1220px] px-5 md:px-8">
        <div className="pb-14 pt-[130px] max-sm:pt-[88px]">
          <SectionHead eyebrow={process.eyebrow} title={process.title} className="mb-0" />
        </div>
      </div>
      <div className="mx-auto max-w-[1220px] px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step) => (
            <Reveal
              key={step.id}
              className="border-(--line) border-t p-[34px] first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(2n)]:border-l lg:[&:nth-child(n+2)]:border-l lg:[&:nth-child(n+3)]:border-t-0"
            >
              <div className="badge-num mb-[22px]">{step.id}</div>
              <h3 className="mb-2.5 text-[17px]">{step.title}</h3>
              <p className="m-0 text-[13.5px] text-ash">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
