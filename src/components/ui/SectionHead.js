import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

export function SectionHead({ eyebrow, title, desc, side, className }) {
  return (
    <div
      className={cn(
        "mb-[68px] flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end",
        className
      )}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-[clamp(30px,4vw,50px)]">{title}</h2>
        {desc && <p className="mt-5 max-w-[46ch] text-[15.5px] text-body">{desc}</p>}
      </div>
      {side && (
        <div className="max-w-[34ch] text-sm text-ash lg:text-right">{side}</div>
      )}
    </div>
  );
}
