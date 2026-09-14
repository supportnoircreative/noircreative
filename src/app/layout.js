import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { site } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('noir-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export const metadata = {
  title: {
    default: "Noir Creative LLC | Digital Engineering & Design Collective",
    template: "%s | Noir Creative LLC",
  },
  description:
    "Noir Creative transforms bold ideas into lasting digital experiences: brand design, web development, digital marketing and brand strategy for ambitious businesses.",
  metadataBase: new URL(site.url),
  /* No `alternates.canonical` here on purpose: metadata set on the root layout
     is inherited by every route, so a canonical of "/" made each page declare
     itself a duplicate of the homepage. Each page sets its own instead. */
  icons: {
    // SVG favicon stays: it stays sharp at every size in modern browsers.
    // The Apple touch icon must be raster and opaque, though: iOS ignores SVG
    // and fills any transparency with black.
    icon: [{ url: "/images/logo-mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Noir Creative LLC",
    title: "Noir Creative LLC | Where Bold Ideas Get Built",
    description: "Digital Engineering & Design Collective. Fusing technical mastery with visual excellence.",
    // Must be raster: Facebook, LinkedIn and X do not render SVG, so an SVG
    // here means links preview with no image at all.
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Noir Creative LLC",
      },
    ],
  },
  // Proves ownership of the www property in Google Search Console. Renders as
  // <meta name="google-site-verification">. Do not remove: Search Console
  // re-checks it periodically and un-verifies the property if it disappears.
  verification: {
    google: "XJXgbAT3pyNGa7GE8Ynhkfhjfc-Dx2D6hRNHwPPRt9Q",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noir Creative LLC | Where Bold Ideas Get Built",
    description: site.description,
    images: ["/images/og-default.png"],
  },
};

export const viewport = {
  themeColor: "#F4F4EF",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* Entity data for the whole site. Individual pages add their own
            (FAQ, Service, breadcrumbs) on top of these. */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body>
        <Header />
        <main id="top">{children}</main>
        <Footer />
        <BackToTop />
        <ThemeToggle className="fixed bottom-[10rem] right-[30px] z-50 shadow-lg" />
        <WhatsAppButton
          variant="floating"
          phoneNumber={site.phone}
          message="Hi Noir Creative! I found you via your website and would like to chat."
        />
      </body>
    </html>
  );
}