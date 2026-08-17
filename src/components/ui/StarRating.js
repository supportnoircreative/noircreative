import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating, className }) {
  const filled = Math.round(rating);
  return (
    <span
      className={cn("inline-flex gap-[2px] text-lime", className)}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={0}
          className={cn("star", i <= filled ? "fill-current" : "fill-transparent opacity-40")}
        />
      ))}
    </span>
  );
}
