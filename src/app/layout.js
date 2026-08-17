import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { Loader } from "@/components/layout/Loader";
import { site } from "@/data/site";

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

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('noir-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export const metadata = {
  title: {
    default: "Noir Creative LLC — Digital Engineering & Design Collective",
    template: "%s — Noir Creative LLC",
  },
  description:
    "Noir Creative transforms bold ideas into lasting digital experiences — brand design, web development, digital marketing and brand strategy for ambitious businesses.",
  metadataBase: new URL("https://noircreative.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/images/logo-mark.svg", type: "image/svg+xml" }],
    apple: "/images/logo-mark.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Noir Creative LLC",
    title: "Noir Creative LLC — Where Bold Ideas Get Built",
    description: "Digital Engineering & Design Collective. Fusing technical mastery with visual excellence.",
    images: [{ url: "/images/logo-wordmark-transparent.svg" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  themeColor: "#0A0A0B",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Loader />
        <Header />
        <main id="top">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}