import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    id: "01",
    title: "Discover",
    body: "Goals, audience and constraints, mapped before anything gets designed.",
  },
  {
    id: "02",
    title: "Design",
    body: "Identity and interface, iterated with you — not delivered as a surprise.",
  },
  {
    id: "03",
    title: "Develop",
    body: "Built on modern, maintainable foundations that won't need a rewrite in a year.",
  },
  {
    id: "04",
    title: "Deliver",
    body: "Launched, measured, and supported — with a clear line to us afterward.",
  },
];

export function Process() {
  return (
    <section className="border-y border-(--line)">
      <div className="mx-auto max-w-[1220px] px-5 md:px-8">
        <div className="pb-14 pt-[130px] max-sm:pt-[88px]">
          <SectionHead eyebrow="How we work" title="The same four steps, every project." className="mb-0" />
        </div>
      </div>
      <div className="mx-auto max-w-[1220px] px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
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