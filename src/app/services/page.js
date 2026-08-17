import { PageHero } from "@/components/shared/PageHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Process } from "@/components/services/Process";
import { Faq } from "@/components/services/Faq";
import { CtaBanner } from "@/components/shared/CtaBanner";

export const metadata = {
  title: "Services",
  description:
    "Graphic design, web development, digital marketing, brand strategy, UI/UX design, and video editing — six disciplines under one accountable Noir Creative team.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Six disciplines. <em className="lime-accent not-italic">One</em> accountable team.
          </>
        }
        description="From first sketch to shipped product — we cover the full stack of a modern brand's digital presence, so nothing gets lost between vendors, hand-offs, or sub-contractors."
      />
      <ServicesGrid />
      <Process />
      <Faq />
      <CtaBanner />
    </>
  );
}