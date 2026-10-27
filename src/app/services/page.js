import { PageHero } from "@/components/shared/PageHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Process } from "@/components/services/Process";
import { Faq } from "@/components/services/Faq";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicesSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Services",
  description:
    "Graphic design, web development, digital marketing, brand strategy, Amazon growth, graphic design, web development, digital marketing, brand strategy, UI/UX design, video editing and Walmart account management: eight disciplines under one accountable Noir Creative team.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema()} />
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbSchema("Services", "/services")} />
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Eight disciplines. <em className="lime-accent not-italic">One</em> accountable team.
          </>
        }
        description="From first sketch to shipped product, we cover the full stack of a modern brand's digital presence, so nothing gets lost between vendors, hand-offs, or sub-contractors."
      />
      <ServicesGrid />
      <Process />
      <Faq />
      <CtaBanner />
    </>
  );
}