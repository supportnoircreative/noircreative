import { AmazonHero } from "@/components/amazon/AmazonHero";
import { AmazonProof } from "@/components/amazon/AmazonProof";
import { AmazonPrinciples } from "@/components/amazon/AmazonPrinciples";
import { AmazonPlatforms } from "@/components/amazon/AmazonPlatforms";
import { AmazonProcess } from "@/components/amazon/AmazonProcess";
import { AmazonCaseStudies } from "@/components/amazon/AmazonCaseStudies";
import { AmazonClosing } from "@/components/amazon/AmazonClosing";
import { JsonLd } from "@/components/seo/JsonLd";
import { amazonServiceSchema, breadcrumbSchema } from "@/lib/schema";
import { AMAZON_PATH } from "@/data/amazonVa";

export const metadata = {
  title: "Amazon Account Management & Growth",
  description:
    "A dedicated team that owns and scales your Amazon and Walmart accounts: listings, advertising, inventory and account health, with detailed case studies and real Seller Central numbers.",
  alternates: { canonical: AMAZON_PATH },
};

export default function AmazonGrowthPage() {
  return (
    <>
      <JsonLd data={amazonServiceSchema()} />
      <JsonLd data={breadcrumbSchema("Amazon Account Management & Growth", AMAZON_PATH)} />
      <AmazonHero />
      <AmazonProof />
      <AmazonClosing />
      <AmazonPrinciples />
      <AmazonPlatforms />
      <AmazonProcess />
      <AmazonCaseStudies />
    </>
  );
}
