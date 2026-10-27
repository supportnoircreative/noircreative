/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      /* The Amazon service moved from /amazon-va to /amazon-growth when it was
         repositioned from "virtual assistant" to full account management.
         The old URLs were already indexed in Google, so they redirect
         permanently (308): search engines transfer the ranking to the new
         address instead of treating it as a new page. `:path*` covers the
         page itself and every case study under it. */
      {
        source: "/amazon-va/:path*",
        destination: "/amazon-growth/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
