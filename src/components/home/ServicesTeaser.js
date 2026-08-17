import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

export function ServicesTeaser() {
  return (
    <section id="services" className="px-5 py-[130px] max-sm:py-[88px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <SectionHead
          eyebrow="What we do"
          title="Six disciplines. One accountable team."
          desc="From first sketch to shipped product — we cover the full stack of a modern brand's digital presence, so nothing gets lost between vendors."
          side={
            <>
              See the full breakdown, process, and FAQ.{" "}
              <Link href="/services" className="lime-accent underline">
                All services →
              </Link>
            </>
          }
        />
        <Reveal stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}