import { AmazonHero } from "@/components/amazon/AmazonHero";
import { AmazonPainPoints } from "@/components/amazon/AmazonPainPoints";
import { AmazonPillars } from "@/components/amazon/AmazonPillars";
import { AmazonCaseStudies } from "@/components/amazon/AmazonCaseStudies";
import { AmazonProcess } from "@/components/amazon/AmazonProcess";
import { AmazonOffer } from "@/components/amazon/AmazonOffer";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { amazonServiceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Amazon Virtual Assistant Services",
  description:
    "Dedicated Amazon VAs for listing optimisation, PPC management, inventory and FBA operations, and account health, with detailed case studies and agreed performance targets.",
  alternates: { canonical: "/amazon-va" },
};

export default function AmazonVaPage() {
  return (
    <>
      <JsonLd data={amazonServiceSchema()} />
      <JsonLd data={breadcrumbSchema("Amazon Virtual Assistant Services", "/amazon-va")} />
      <AmazonHero />
      <AmazonPainPoints />
      <AmazonPillars />
      <AmazonCaseStudies />
      <AmazonProcess />
      <AmazonOffer />
      <CtaBanner />
    </>
  );
}
