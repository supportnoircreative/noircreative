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
        "mb-[68px] flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end",
        className
      )}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <RollText
          as="h2"
          stagger={80}
          className="text-[clamp(30px,4vw,50px)]"
          lines={lines}
        />
        {desc && <p className="mt-5 max-w-[46ch] text-[15.5px] text-body">{desc}</p>}
      </div>
      {side && (
        <div className="max-w-[34ch] text-sm text-ash lg:text-right">{side}</div>
      )}
    </div>
  );
}
