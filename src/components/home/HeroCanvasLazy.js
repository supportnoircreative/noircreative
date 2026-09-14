"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper so the hero canvas can be code-split out of the initial
 * bundle.
 *
 * The canvas is purely decorative (floating code glyphs behind the headline),
 * so it should not sit on the critical path. `ssr: false` is only permitted
 * inside a Client Component, which is the entire reason this file exists;
 * Hero itself is a Server Component.
 */
export const HeroCanvasLazy = dynamic(
  () => import("@/components/home/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);
