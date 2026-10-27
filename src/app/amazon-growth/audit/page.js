import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RollText } from "@/components/ui/RollText";
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
      {/* Compact header rather than the full PageHero: visitors arrive from an
          "audit" button, so the form should be in view without scrolling. */}
      <section
        id="audit-form"
        className="bg-[radial-gradient(circle_at_88%_0%,rgba(198,242,78,.10),transparent_42%)] px-5 pb-[110px] pt-[130px] max-sm:pb-[80px] max-sm:pt-[112px] md:px-8"
      >
        <div className="mx-auto max-w-[1220px]">
          <div className="mx-auto mb-10 max-w-[760px] text-center max-sm:mb-8">
            <Reveal immediate>
              <Eyebrow center bare className="mb-3">
                {audit.eyebrow}
              </Eyebrow>
            </Reveal>
            <RollText
              as="h1"
              immediate
              stagger={90}
              className="mx-auto text-[clamp(30px,3.6vw,46px)] tracking-[-0.035em]"
              lines={[
                <span key="t">
                  {plain}{" "}
                  <em className="lime-accent not-italic">{accent}</em>
                </span>,
              ]}
            />
            <Reveal immediate>
              <p className="mx-auto mt-4 max-w-[60ch] text-[15.5px] text-body">{audit.description}</p>
            </Reveal>
          </div>

          <Reveal immediate>
            <div className="grid grid-cols-1 gap-px border border-(--line) bg-(--line) lg:grid-cols-[0.85fr_1.15fr]">
              {/* gap-6 rather than a margin on the list: the global ul reset
                  is unlayered and would override an mt-* utility. */}
              <div className="flex flex-col gap-6 bg-surface px-10 py-[42px] max-sm:px-[26px]">
                <h2 className="text-[22px] tracking-[-0.02em]">{audit.coversTitle}</h2>
                <ul className="flex list-none flex-col gap-4 p-0">
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

                <div className="mt-auto border-t border-(--line) pt-8 max-lg:mt-4">
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
