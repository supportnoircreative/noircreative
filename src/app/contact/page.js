import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact",
  description:
    "Start a project with Noir Creative — tell us what you're building and we'll reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s discuss a project —{" "}
            <em className="lime-accent not-italic">and grow together.</em>
          </>
        }
        description="Tell us a little about what you're building. We reply to every inquiry within one business day, from wherever you're calling from."
      />
      <section id="contact-form" className="px-5 pb-[130px] pt-20 max-sm:pb-[88px] md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <Reveal>
            <div className="grid grid-cols-1 gap-px border border-(--line) bg-(--line) lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex flex-col bg-surface py-2">
                <div className="flex flex-col gap-2.5 border-b border-(--line) px-10 py-[34px] max-sm:px-[26px]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ash">
                    For new projects
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[19px] font-bold tracking-tight link-lime"
                  >
                    {site.email}
                  </a>
                </div>
                <div className="flex flex-col gap-2.5 border-b border-(--line) px-10 py-[34px] max-sm:px-[26px]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ash">
                    Call us
                  </span>
                  <a
                    href={site.phoneHref}
                    className="text-[19px] font-bold tracking-tight link-lime"
                  >
                    {site.phone}
                  </a>
                </div>
                <div className="flex flex-col gap-2.5 border-b border-(--line) px-10 py-[34px] max-sm:px-[26px]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ash">
                    Based
                  </span>
                  <span className="text-[19px] font-bold tracking-tight">
                    Remote-first · Global support, 24/7
                  </span>
                </div>
                <div className="px-10 pb-[6px] pt-[30px] max-sm:px-[26px]">
                  <SocialLinks />
                </div>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}