import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

export function ServicesGrid() {
  return (
    <section id="services" className="px-5 py-[130px] max-sm:py-[88px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} descriptionKey="full" />
          ))}
        </Reveal>
      </div>
    </section>
  );
}