"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StarRating } from "@/components/ui/StarRating";

/** "Angelita P. Guevarra" → "AG" · "Nexus Guard" → "NG" · "Jhah Jhah" → "JJ" */
function initialsOf(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/**
 * One fixed-size review card.
 *
 * Layout: a tinted header band carrying the service category, a portrait
 * straddling the band's lower edge, then the quote, rating and a name badge.
 *
 * Reviewers have no photos (the source reviews are Facebook recommendations),
 * so the portrait falls back to a monogram. Add `avatar: "/reviews/name.jpg"`
 * to an entry in src/data/testimonials.js and it renders the image instead —
 * nothing else needs changing.
 *
 * Every card is exactly --card-w x --card-h so the rail reads as a row of
 * equal tiles. The quote is the only flexible part: it takes the leftover
 * height and clips. Whether a review overflows depends on the rendered wrap
 * rather than character count, so it's measured (scrollHeight vs clientHeight)
 * and re-measured on resize — that's what decides if "Read more" appears.
 */
export function TestimonialCard({ testimonial: t, style, onExpand }) {
  const quoteRef = useRef(null);
  const [clipped, setClipped] = useState(false);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    // 2px tolerance so sub-pixel line rounding doesn't trip a false positive.
    const measure = () => setClipped(el.scrollHeight - el.clientHeight > 2);
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [t.quote]);

  return (
    <article
      style={style}
      className="testi-card flex h-[var(--card-h)] flex-col overflow-hidden rounded-2xl border border-lime bg-ink-raised text-center shadow-[0_0_0_1px_rgba(198,242,78,.2),0_10px_30px_-14px_rgba(198,242,78,.35)]"
    >
      {/* ---- header band: category + nib watermark ---- */}
      <div className="testi-band relative flex h-[86px] flex-none items-start justify-center pt-6">
        <span aria-hidden="true" className="testi-band-mark" />
        <span className="relative font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ash">
          {t.category}
        </span>
      </div>

      {/* ---- portrait straddling the band edge ---- */}
      <div className="relative z-10 -mt-[38px] flex flex-none justify-center">
        {t.avatar ? (
          <Image
            src={t.avatar}
            alt=""
            width={76}
            height={76}
            className="size-[76px] rounded-full border-2 border-lime object-cover"
          />
        ) : (
          <span className="flex size-[76px] items-center justify-center rounded-full border-2 border-lime bg-ink-raised font-display text-[24px] font-extrabold tracking-[-0.02em] lime-accent">
            {initialsOf(t.name)}
          </span>
        )}
      </div>

      {/* ---- quote (the only flexible row) ----
           min-h-0 lets this flex child actually shrink, so overflow clips here
           instead of pushing the footer out of the card. */}
      {/* A short quote is centred in the leftover space so the card doesn't
          read as top-heavy with a gap above the rating; a clipped one stays
          top-aligned, since centring it would cut the opening line too. */}
      <div
        ref={quoteRef}
        className={`min-h-0 flex-1 overflow-hidden px-7 pt-5 ${
          clipped ? "testi-quote--clipped" : "flex items-center justify-center"
        }`}
      >
        <blockquote className="m-0 whitespace-pre-line text-[15px] leading-relaxed text-text-1">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      {clipped && (
        <button
          type="button"
          // The rail starts a drag on pointerdown; without this the press is
          // swallowed by the drag gesture instead of registering as a click.
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onExpand(t)}
          className="mt-3.5 flex-none text-[12.5px] font-semibold underline underline-offset-4 transition-opacity duration-200 lime-accent hover:opacity-70"
        >
          Read more
        </button>
      )}

      {/* ---- rating + name badge ---- */}
      <div className="flex flex-none flex-col items-center gap-4 px-7 pb-7 pt-5">
        <StarRating rating={t.rating} />
        <div className="flex w-full flex-col items-center border-t border-(--line) pt-5">
          <span className="inline-flex max-w-full items-center rounded-full border border-(--line-strong) px-5 py-2 font-display text-[13.5px] font-extrabold uppercase tracking-[0.08em] text-text-1">
            {t.name}
          </span>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
            {t.role}
          </span>
        </div>
      </div>
    </article>
  );
}
