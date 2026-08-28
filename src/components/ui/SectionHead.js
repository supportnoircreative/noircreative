import { Eyebrow } from "@/components/ui/Eyebrow";
import { RollText } from "@/components/ui/RollText";
import { cn } from "@/lib/utils";

export function SectionHead({ eyebrow, title, desc, side, className }) {
  // Key each line so RSC flight serialization keeps server-passed JSX headings
  // as keyed array items (avoids "unique key" warnings).
  const lines = typeof title === "string"
    ? [title]
    : Array.isArray(title)
      ? title.map((line, i) => <span key={i}>{line}</span>)
      : [<span key="title">{title}</span>];

  return (
    <div
      className={cn(
        "mb-[68px] flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-end lg:text-left",
        className
      )}
    >
      <div className="flex flex-col items-center lg:items-start">
        <Eyebrow center>{eyebrow}</Eyebrow>
        <RollText
          as="h2"
          stagger={80}
          className="max-w-[24ch] text-[clamp(30px,4vw,50px)] lg:max-w-none"
          lines={lines}
        />
        {desc && <p className="mx-auto mt-5 max-w-[46ch] text-[15.5px] text-body lg:mx-0">{desc}</p>}
      </div>
      {side && (
        <div className="max-w-[34ch] text-sm text-ash lg:ml-auto lg:text-right">{side}</div>
      )}
    </div>
  );
}
