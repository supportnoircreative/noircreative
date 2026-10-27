import { site } from "@/data/site";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { amazonVa, AMAZON_PATH } from "@/data/amazonVa";

const abs = (path) => `${site.url}${path}`;

/**
 * Organization, emitted on every page from the root layout.
 *
 * `logo` points at a raster PNG because Google ignores SVG for the logo rich
 * result. It is also flattened onto ink rather than transparent: Google renders
 * the logo on a white surface, where the bone mark would otherwise vanish.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": abs("/#organization"),
    name: site.name,
    url: site.url,
    logo: abs("/images/logo-mark-512.png"),
    description: site.description,
    email: site.email,
    telephone: site.phone,
    image: abs("/images/og-default.png"),
    sameAs: site.socials.map((s) => s.href),
  };
}

/** WebSite entity, lets Google associate the domain with the organization. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: site.url,
    name: site.name,
    publisher: { "@id": abs("/#organization") },
  };
}

/** FAQPage for /services, built from the same data the page renders. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** The seven disciplines as an offer catalog on /services. */
export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${site.name} services`,
    provider: { "@id": abs("/#organization") },
    url: abs("/services"),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Disciplines",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.full },
      })),
    },
  };
}

/** Service entity for the Amazon growth page, with the platform lanes as the catalog. */
export function amazonServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Amazon & Walmart Account Management",
    serviceType: "Marketplace account management",
    provider: { "@id": abs("/#organization") },
    url: abs(AMAZON_PATH),
    description: amazonVa.hero.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Scope of work",
      itemListElement: amazonVa.platforms.items.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: p.title.startsWith(p.marketplace) ? p.title : `${p.marketplace} ${p.title}`,
          description: p.body,
        },
      })),
    },
  };
}

/** One discipline's own page, with its deliverables as the offer catalog. */
export function singleServiceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro || service.full,
    url: abs(`/services/${service.slug}`),
    provider: { "@id": abs("/#organization") },
    ...(service.deliverables?.length && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} deliverables`,
        itemListElement: service.deliverables.map((d) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: d.title, description: d.body },
        })),
      },
    }),
  };
}

/** Three-level breadcrumb: Home > Services > this discipline. */
export function serviceBreadcrumbSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: abs("/services") },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: abs(`/services/${service.slug}`),
      },
    ],
  };
}

/**
 * An individual Amazon case study page.
 *
 * Typed as Article rather than CaseStudy: schema.org has no CaseStudy type,
 * and Article is what Google actually understands for this shape of content.
 */
export function caseStudySchema(study) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline,
    description: study.challenge,
    url: abs(`${AMAZON_PATH}/${study.slug}`),
    author: { "@id": abs("/#organization") },
    publisher: { "@id": abs("/#organization") },
    about: {
      "@type": "Service",
      name: "Amazon & Walmart Account Management",
      provider: { "@id": abs("/#organization") },
    },
    articleSection: study.category,
  };
}

/** Three-level breadcrumb: Home > Amazon Growth > this case study. */
export function caseStudyBreadcrumbSchema(study) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Amazon & Walmart Account Management",
        item: abs(AMAZON_PATH),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.tab,
        item: abs(`${AMAZON_PATH}/${study.slug}`),
      },
    ],
  };
}

/**
 * BreadcrumbList for a sub-page. Helps Google render the site hierarchy in
 * results instead of a bare URL.
 */
export function breadcrumbSchema(name, path) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name, item: abs(path) },
    ],
  };
}
