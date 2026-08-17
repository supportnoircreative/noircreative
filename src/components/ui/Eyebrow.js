import { cn } from "@/lib/utils";

export function Eyebrow({ children, className, center, bare }) {
  return (
    <p
      className={cn(
        "eyebrow",
        center && "eyebrow--center",
        bare && "eyebrow--bare",
        className
      )}
    >
      {children}
    </p>
  );
}
