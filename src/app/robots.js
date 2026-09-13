import { site } from "@/data/site";

/**
 * Generates /robots.txt at build time.
 *
 * Everything is crawlable except the API route, which returns JSON and has no
 * business in an index. The sitemap line is how Google finds the sitemap
 * without you submitting it manually.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
