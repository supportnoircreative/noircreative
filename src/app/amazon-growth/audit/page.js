import { Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/data/site";
import { amazonVa, AMAZON_AUDIT_PATH } from "@/data/amazonVa";

export const metadata = {
  title: "Free Amazon & Walmart Account Audit",
  description:
    "Request a free line-by-line audit of your Amazon or Walmart account: listings, advertising, inventory and account health, with a prioritised list of fixes.",
  alternates: { canonical: AMAZON_AUDIT_PATH },
};

/**
 * Seller-specific version of /contact. Same form and API, configured from
 * amazonVa.audit.form so the options are marketplaces rather than design
 * services, and the notification email is flagged as an audit request.
 */
export default function AmazonAuditPage() {
  const { audit } = amazonVa;
  const [plain, accent] = audit.title;

  return (
    <>
      <JsonLd data={breadcrumbSchema("Free Amazon & Walmart Account Audit", AMAZON_AUDIT_PATH)} />
      <PageHero
        eyebrow={audit.eyebrow}
        title={[
          plain,
          <em key="a" className="lime-accent not-italic">
            {accent}
          </em>,
        ]}
        description={audit.description}
      />
      <section id="audit-form" className="px-5 pb-[130px] pt-20 max-sm:pb-[88px] md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <Reveal>
            <div className="grid grid-cols-1 gap-px border border-(--line) bg-(--line) lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex flex-col bg-surface px-10 py-[42px] max-sm:px-[26px]">
                <h2 className="text-[22px] tracking-[-0.02em]">{audit.coversTitle}</h2>
                <ul className="m-0 mt-7 flex list-none flex-col gap-4 p-0">
                  {audit.covers.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-[1.6] text-body">
                      <Check
                        size={16}
                        strokeWidth={2.4}
                        aria-hidden="true"
                        className="mt-1 flex-none lime-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-(--line) pt-8 max-lg:mt-10">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ash">
                    Prefer email?
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2.5 block text-[19px] font-bold tracking-tight link-lime"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
              <ContactForm {...audit.form} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
