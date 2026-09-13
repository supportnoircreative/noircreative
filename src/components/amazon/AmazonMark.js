/**
 * Amazon "smile" arrow — artwork supplied by the client
 * (Downloads/amazon-arrow.svg), used as-is apart from two changes:
 *
 *  1. The source's `fill="#FF9900"` is dropped in favour of `currentColor`, so
 *     the mark follows the site's theming (lime on dark, ink on light via
 *     `.lime-accent`) and the button's hover states. Hardcode the orange back
 *     on the <svg> if you'd rather have Amazon's official colour.
 *  2. The viewBox is tightened from the source's `0 0 300 105` to the artwork's
 *     actual bounds. The original leaves ~15 units of empty space above and
 *     below the paths, which would render as dead height under the label and
 *     push the smile into the button's clipped overflow.
 *
 * The paths themselves are untouched.
 *
 * If you swap the artwork, keep the viewBox and the `aspect-ratio` on
 * `.amazon-smile` in globals.css in sync.
 */
export function AmazonMark({ className, ...props }) {
  return (
    <svg
      viewBox="5.7 15.56 285.71 74.14"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M 12,28 C 79,70 172,80 259,42 C 266,39 270,45 264,51 C 200,107 82,103 8,34 C 3,29 7,25 12,28 Z" />
      <path d="M 234,25 C 249,14 277,13 290,20 C 295,23 286,55 274,66 C 270,70 267,68 269,63 C 274,51 280,32 276,29 C 272,26 249,28 237,30 C 232,31 230,28 234,25 Z" />
    </svg>
  );
}
