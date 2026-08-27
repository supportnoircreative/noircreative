import Link from "next/link";
import { LogoWordmark } from "@/components/layout/LogoWordmark";

export function Brand({ compact = false }) {
  return (
    <Link href="/" aria-label="Noir Creative — home" className="flex items-center">
      <LogoWordmark
        width={77}
        height={47}
        className={`w-auto transition-[height] duration-300 ${compact ? "h-10" : "h-[46px] md:h-[56px]"}`}
      />
    </Link>
  );
}