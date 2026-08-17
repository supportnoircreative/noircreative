import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false }) {
  return (
    <Link href="/" aria-label="Noir Creative — home" className="flex items-center">
      <Image
        src="/images/logo-wordmark-transparent.svg"
        alt="Noir Creative"
        width={77}
        height={47}
        priority
        className={`w-auto transition-[height] duration-300 ${compact ? "h-9" : "h-[38px] md:h-[46px]"}`}
      />
    </Link>
  );
}
