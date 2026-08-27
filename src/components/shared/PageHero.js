import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RollText } from "@/components/ui/RollText";

export function PageHero({ eyebrow, title, description }) {
  // Each line is wrapped in a keyed element so RSC's flight serialization
  // doesn't treat server-passed JSX headings as an unkeyed list.
  const lines = Array.isArray(title)
    ? title.map((line, i) => <span key={i}>{line}</span>)
    : [<span key="title">{title}</span>];

  return (
    <section className="border-b border-(--line) bg-[radial-gradient(circle_at_88%_0%,rgba(198,242,78,.10),transparent_42%)] px-5 pb-20 pt-[176px] text-center md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <Eyebrow center bare>{eyebrow}</Eyebrow>
        </Reveal>
        <RollText
          as="h1"
          stagger={90}
          className="mx-auto  text-[clamp(36px,6vw,72px)]"
          lines={lines}
        />
        {description && (
          <Reveal>
            <p className="mx-auto mt-[22px] max-w-[56ch] text-[16.5px] text-body">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
