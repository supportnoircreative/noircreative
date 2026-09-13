"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";

/**
 * Full-review dialog opened by a card's "Read more".
 *
 * Uses the native <dialog> element via showModal() so Escape-to-close, focus
 * trapping and inert-ing the page behind come from the platform rather than
 * being hand-rolled. Expanding a card in place isn't an option here: the rail
 * positions cards absolutely inside a fixed-height track, so a taller card
 * would overlap its neighbours and break the carousel's geometry.
 */
export function TestimonialDialog({ testimonial, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (testimonial && !el.open) el.showModal();
    if (!testimonial && el.open) el.close();
  }, [testimonial]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Escape closes a native dialog by itself; syncing state on `cancel` too
      // guarantees `expanded` can't be left set while the dialog is shut (which
      // would stop the same card reopening). Calling onClose twice is a no-op.
      onCancel={onClose}
      // Clicking the backdrop resolves to the dialog element itself.
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="testi-dialog w-[min(640px,92vw)] rounded-2xl border border-lime bg-ink-raised p-0 text-text-1"
    >
      {testimonial && (
        <div className="max-h-[80vh] overflow-y-auto p-8 max-sm:p-6">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <StarRating rating={testimonial.rating} />
                <span className="font-mono text-[13px] text-ash">
                  {testimonial.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-violet">
                {testimonial.category}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close review"
              className="flex size-9 flex-none items-center justify-center rounded-full border border-(--line-strong) text-text-1 transition-colors duration-200 hover:border-text-1"
            >
              <X size={16} strokeWidth={1.8} />
            </button>
          </div>

          <blockquote className="m-0 whitespace-pre-line text-[15.5px] leading-relaxed text-text-1">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <div className="mt-7 border-t border-(--line) pt-5 text-[13px] text-ash">
            <strong className="mb-0.5 block text-sm text-body">{testimonial.name}</strong>
            {testimonial.role}
          </div>
        </div>
      )}
    </dialog>
  );
}
