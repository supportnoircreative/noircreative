import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const brandIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-[15px]">
      <path
        d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z"
        fill="currentColor"
      />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-[15px]">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
};

export function SocialLinks({ className, itemClassName }) {
  return (
    <div className={cn("flex gap-2.5", className)}>
      {site.socials.map((social) => (
        <a
          key={social.key}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={cn(
            "flex size-10 items-center justify-center rounded-full border border-(--line-strong) text-text-1 transition-colors duration-250 hover:border-lime hover:bg-lime hover:text-ink",
            itemClassName
          )}
        >
          {brandIcons[social.key]}
        </a>
      ))}
    </div>
  );
}
