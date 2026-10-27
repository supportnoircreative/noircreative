import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";
import { cn } from "@/lib/utils";

/**
 * Centred two-tone section heading used across the Amazon page.
 * `title` is [plain line, accent line]; the accent line takes `accentClass`.
 */
export function CenteredHead({ eyebrow, title, desc, accentClass = "lime-accent", className }) {
  const [plain, accent] = Array.isArray(title) ? title : [title];

  return (
    <div className={cn("mx-auto mb-14 max-w-[760px] text-center", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow center>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <RollText
        as="h2"
        stagger={80}
        className="mx-auto text-[clamp(30px,4vw,50px)]"
        lines={[
          <span key="p">{plain}</span>,
          ...(accent
            ? [
                <em key="a" className={cn("not-italic", accentClass)}>
                  {accent}
                </em>,
              ]
            : []),
        ]}
      />
      {desc && (
        <Reveal>
          <p className="mx-auto mt-5 max-w-[50ch] text-[15.5px] text-body">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}
