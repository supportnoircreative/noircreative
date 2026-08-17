const items = [
  "Graphic Design",
  "Web Development",
  "Digital Marketing",
  "Brand Strategy",
  "UI/UX Design",
  "Video Editing",
];

function Track({ hidden = false }) {
  return (
    <div className="marquee-track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="whitespace-nowrap px-7 text-[15px] font-semibold tracking-[0.02em] text-mute">
          {item} <i className="marquee-sep not-italic text-lime">✦</i>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee-wrap relative z-[2] mt-[70px] overflow-hidden border-y border-(--line) bg-ink-raised py-[22px]">
      <div className="marquee">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
