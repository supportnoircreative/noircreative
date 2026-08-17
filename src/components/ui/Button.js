import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border font-semibold tracking-tight transition-all duration-300";

const variants = {
  primary:
    "bg-lime text-ink border-transparent shadow-[0_1px_0_rgba(255,255,255,.45)_inset,0_14px_28px_-12px_rgba(198,242,78,.55)] hover:bg-[#d6ff69] hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(255,255,255,.55)_inset,0_18px_34px_-12px_rgba(198,242,78,.7)]",
  dark: "bg-ink text-bone border-transparent shadow-[0_14px_28px_-14px_rgba(0,0,0,.7)] hover:bg-black hover:-translate-y-0.5",
  outline:
    "border-(--line-strong) text-text-1 hover:border-text-1 hover:-translate-y-0.5",
  "outline-on-bone":
    "border-(--line-on-bone-strong) text-ink hover:border-ink hover:-translate-y-0.5",
  ghost: "border-transparent text-text-1 px-1 hover:underline",
};

const sizes = {
  md: "px-[34px] py-[17px] text-[14.5px]",
  sm: "px-[26px] py-3 text-[14px]",
};

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  href,
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={15}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
        />
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
