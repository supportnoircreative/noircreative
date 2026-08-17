"use client";

import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const THEME_KEY = "noir-theme";

export function ThemeToggle({ className }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* storage unavailable — theme still applies for the session */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#F4F4EF" : "#0A0A0B");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className={cn(
        "theme-toggle flex size-11 flex-none items-center justify-center rounded-full border border-(--line-strong) bg-transparent text-text-1 transition-colors duration-300 hover:border-lime",
        className
      )}
    >
      <Sun className="i-sun size-[19px]" strokeWidth={1.6} />
      <Moon className="i-moon size-[19px]" strokeWidth={1.6} />
    </button>
  );
}
