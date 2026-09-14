import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { singleServiceSchema, serviceBreadcrumbSchema } from "@/lib/schema";
import { services } from "@/data/services";

const withSlug = services.filter((s) => s.slug);
const findService = (slug) => withSlug.find((s) => s.slug === slug);

/* One static page per discipline. Adding a `slug` to an entry in
   src/data/services.js creates its page, sitemap entry and cross-links. */
export function generateStaticParams() {
  return withSlug.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "article",
      title: `${service.title} | Noir Creative LLC`,
      description: service.short,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd data={singleServiceSchema(service)} />
      <JsonLd data={serviceBreadcrumbSchema(service)} />
      <ServiceDetail service={service} />
      <CtaBanner />
    </>
  );
}
