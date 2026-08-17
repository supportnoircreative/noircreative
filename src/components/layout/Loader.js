"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let timer;
    function hide() {
      timer = setTimeout(() => setHidden(true), 250);
    }
    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
    }
    const fallback = setTimeout(() => setHidden(true), 3000);
    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className={cn("loader", hidden && "is-hidden")} aria-hidden="true">
      <Image
        src="/images/mark-nib-solid.svg"
        alt=""
        width={44}
        height={44}
        priority
        className="h-11 w-auto"
      />
    </div>
  );
}
