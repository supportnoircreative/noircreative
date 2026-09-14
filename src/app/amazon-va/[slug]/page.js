import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/amazon/CaseStudyDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { caseStudySchema, caseStudyBreadcrumbSchema } from "@/lib/schema";
import { amazonVa } from "@/data/amazonVa";

const studies = amazonVa.caseStudies.items;
const findStudy = (slug) => studies.find((s) => s.slug === slug);

/* Prerenders one static page per case study at build time. Add an entry to
   amazonVa.caseStudies.items with a `slug` and its page appears here, in the
   sitemap and in the tab rail, with nothing else to wire up. */
export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = findStudy(slug);
  if (!study) return {};

  const title = `${study.tab} Amazon case study`;
  return {
    title,
    description: study.headline,
    alternates: { canonical: `/amazon-va/${study.slug}` },
    openGraph: {
      type: "article",
      title,
      description: study.headline,
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = findStudy(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd data={caseStudySchema(study)} />
      <JsonLd data={caseStudyBreadcrumbSchema(study)} />
      <CaseStudyDetail study={study} />
    </>
  );
}
