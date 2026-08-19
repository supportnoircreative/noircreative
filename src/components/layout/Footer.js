import Link from "next/link";
import { site } from "@/data/site";
import { LogoWordmark } from "@/components/layout/LogoWordmark";
import { SocialLinks } from "@/components/shared/SocialLinks";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const studioLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "FAQ", href: "/services#faq" },
];

const serviceLinks = [
  { label: "Graphic Design", href: "/services" },
  { label: "Web Development", href: "/services" },
  { label: "Digital Marketing", href: "/services" },
  { label: "Brand Strategy", href: "/services" },
];

export function Footer() {
  return (
    <footer className="border-t border-(--line) pt-20">
      <div className="mx-auto max-w-[1220px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-9 pb-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr] lg:gap-10">
          <div>
            <Link href="/" aria-label="Noir Creative — home">
              <LogoWordmark
                width={46}
                height={28}
                className="mb-[22px] h-[26px] w-auto"
              />
            </Link>
            <p className="max-w-[34ch] text-[13.5px] text-ash">
              Digital Engineering &amp; Design Collective. Fusing technical mastery with visual
              excellence.
            </p>
          </div>
          <FooterCol title="Studio" links={studioLinks} />
          <FooterCol title="Services" links={serviceLinks} />
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-ash">
              Contact
            </h4>
            <ul className="flex flex-col gap-[13px]">
              <li>
                <a href={`mailto:${site.email}`} className="text-sm text-body transition-colors link-lime">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="text-sm text-body transition-colors link-lime">
                  {site.phone}
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-body transition-colors link-lime">
                  Start a project →
                </Link>
              </li>
              <li>
                <WhatsAppButton
                  phoneNumber={site.phone}
                  message="Hi Noir Creative! I found you via your website and would like to chat."
                  label="Chat on WhatsApp"
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-(--line) py-[26px] text-[12.5px] text-ash">
          <span>
            © {new Date().getFullYear()} Noir Creative LLC. All rights reserved.
          </span>
          <SocialLinks itemClassName="size-[34px]" />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-ash">{title}</h4>
      <ul className="flex flex-col gap-[13px]">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-body transition-colors link-lime">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
