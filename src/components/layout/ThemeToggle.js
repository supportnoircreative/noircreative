"use client";

import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const THEME_KEY = "noir-theme";

export function ThemeToggle({ className }) {
  function applyTheme(next) {
    const root = document.documentElement;
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* storage unavailable — theme still applies for the session */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#F4F4EF" : "#0A0A0B");
  }

  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      // Colour, surface and hover live in globals.css (.theme-toggle): this
      // button floats over both ink and bone sections, so it can't inherit
      // theme text/line tokens the way an in-flow control can.
      className={cn(
        "theme-toggle flex size-11 flex-none items-center justify-center rounded-full border",
        className
      )}
    >
      <Sun className="i-sun size-[19px]" strokeWidth={1.6} />
      <Moon className="i-moon size-[19px]" strokeWidth={1.6} />
    </button>
  );
}
