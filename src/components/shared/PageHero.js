import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({ eyebrow, title, description }) {
  return (
    <section className="border-b border-(--line) bg-[radial-gradient(circle_at_88%_0%,rgba(198,242,78,.10),transparent_42%)] px-5 pb-20 pt-[176px] text-center md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <Eyebrow center bare>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal>
          <h1 className="mx-auto max-w-[16ch] text-[clamp(36px,6vw,72px)]">{title}</h1>
        </Reveal>
        {description && (
          <Reveal>
            <p className="mx-auto mt-[22px] max-w-[56ch] text-[16.5px] text-body">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
