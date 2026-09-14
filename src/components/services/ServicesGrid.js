import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

export function ServicesGrid() {
  return (
    <section id="services" className="px-5 py-[130px] max-sm:py-[64px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        {/* The grid is this page's main section but carries no visible
            heading, which left the card h3s jumping straight off the page h1. */}
        <h2 className="sr-only">All services</h2>
        <Reveal stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} descriptionKey="full" />
          ))}
        </Reveal>
      </div>
    </section>
  );
}