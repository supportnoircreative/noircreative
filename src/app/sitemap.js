import { site } from "@/data/site";

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

export default function sitemap() {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
