import { site } from "@/data/site";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { amazonVa } from "@/data/amazonVa";

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

/** The six disciplines as an offer catalog on /services. */
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

/** Service entity for /amazon-va, with the scope lanes as the catalog. */
export function amazonServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Amazon Virtual Assistant Services",
    serviceType: "Amazon marketplace management",
    provider: { "@id": abs("/#organization") },
    url: abs("/amazon-va"),
    description: amazonVa.hero.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Scope of work",
      itemListElement: amazonVa.pillars.items.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.title, description: p.body },
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
    url: abs(`/amazon-va/${study.slug}`),
    author: { "@id": abs("/#organization") },
    publisher: { "@id": abs("/#organization") },
    about: {
      "@type": "Service",
      name: "Amazon Virtual Assistant Services",
      provider: { "@id": abs("/#organization") },
    },
    articleSection: study.category,
  };
}

/** Three-level breadcrumb: Home > Amazon VA > this case study. */
export function caseStudyBreadcrumbSchema(study) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Amazon Virtual Assistant Services",
        item: abs("/amazon-va"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.tab,
        item: abs(`/amazon-va/${study.slug}`),
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
