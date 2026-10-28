"use client";

import { useRef } from "react";
import Script from "next/script";

/* From Trustpilot's TrustBox setup for noircreativellc.com. */
const BUSINESS_UNIT_ID = "6ae25c2d14c0719eb0bb4773";
const TEMPLATE_REVIEW_COLLECTOR = "56278e9abfbbba0bdcd568bc";
const REVIEW_URL = "https://www.trustpilot.com/review/noircreativellc.com";

/**
 * Trustpilot "Review Collector" TrustBox: a button that sends visitors to
 * leave a review, presented as a small white badge.
 *
 * Trustpilot's bootstrap script scans the page for .trustpilot-widget once,
 * when it first loads. After a client-side navigation the widget is a fresh
 * element it has never seen, so onReady (which runs on load and on every
 * remount) hands it over explicitly. Until the script runs, or if it is
 * blocked, the plain link inside still works.
 *
 * Framing: the template draws its button at the top of a white 52px frame
 * and ignores data-theme, and below ~230px wide it switches to a stacked
 * two-line layout. So the widget stays 240px wide (one line), the frame is
 * cropped to the button's 38px height and trimmed 22px each side, and the
 * white wrapper adds even padding round it.
 */
export function TrustpilotWidget() {
  const ref = useRef(null);

  return (
    <>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
        onReady={() => {
          if (ref.current && window.Trustpilot) window.Trustpilot.loadFromElement(ref.current, true);
        }}
      />
      <span className="inline-flex rounded-[12px] bg-white p-2.5">
        <span className="block h-[38px] w-[196px] overflow-hidden">
          <div
            ref={ref}
            className="trustpilot-widget -ml-[22px] h-[38px] w-[240px] overflow-hidden"
            data-locale="en-US"
            data-template-id={TEMPLATE_REVIEW_COLLECTOR}
            data-businessunit-id={BUSINESS_UNIT_ID}
            data-style-height="52px"
            data-style-width="100%"
          >
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noopener"
              className="flex h-full items-center justify-center text-[14px] font-semibold text-ink"
            >
              Review us on Trustpilot
            </a>
          </div>
        </span>
      </span>
    </>
  );
}
