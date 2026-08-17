import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    id: "01",
    title: "Strategic Discovery",
    body: "We start by understanding your market, your customer, and the real business problem — not just the brief.",
  },
  {
    id: "02",
    title: "Creative Innovation",
    body: "Design and engineering sit at the same table, so what gets designed is what actually ships.",
  },
  {
    id: "03",
    title: "Scalable Growth",
    body: "Every system we hand off is built to grow with you — no rebuild required at your next milestone.",
  },
];

export function Solutions() {
  return (
    <section className="px-5 py-[130px] max-sm:py-[88px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <SectionHead
          eyebrow="Why Noir Creative"
          title="A solution for every growth problem."
          desc="Three pillars behind every engagement, whether it's a single brand refresh or a full digital rebuild."
        />
        <Reveal stagger className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-card border border-(--line) bg-ink-raised p-10 shadow-card transition-all duration-[350ms] hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="badge-num mb-6">{pillar.id}</div>
              <h3 className="mb-3 text-[21px] text-text-1">{pillar.title}</h3>
              <p className="m-0 text-[14.5px] text-body">{pillar.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}