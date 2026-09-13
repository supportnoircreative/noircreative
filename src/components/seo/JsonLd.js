/**
 * Renders a schema.org JSON-LD block.
 *
 * `<` is escaped to < so a stray "</script>" inside any string value
 * can't close the tag early and inject markup. This is the standard guard for
 * embedding JSON in a script element.
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
