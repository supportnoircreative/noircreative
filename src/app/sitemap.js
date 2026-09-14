import { site } from "@/data/site";
import { amazonVa } from "@/data/amazonVa";
import { services } from "@/data/services";

/**
 * Generates /sitemap.xml at build time.
 *
 * Add a route here whenever you add a page. `priority` is a relative hint
 * within this site only (it says nothing about ranking against other sites);
 * the commercial pages are weighted above the supporting ones.
 */
const ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "/amazon-va", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
];

/* Case study pages are derived from the data rather than listed by hand, so
   adding a study to amazonVa.caseStudies.items puts it in the sitemap too. */
const CASE_STUDIES = amazonVa.caseStudies.items.map((s) => ({
  path: `/amazon-va/${s.slug}`,
  priority: 0.8,
  changeFrequency: "yearly",
}));

/* Service pages, derived the same way. */
const SERVICE_PAGES = services
  .filter((s) => s.slug)
  .map((s) => ({ path: `/services/${s.slug}`, priority: 0.8, changeFrequency: "yearly" }));

export default function sitemap() {
  const lastModified = new Date();
  return [...ROUTES, ...SERVICE_PAGES, ...CASE_STUDIES].map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
