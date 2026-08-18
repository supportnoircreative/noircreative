"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/site";
import { Brand } from "@/components/layout/Brand";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";

const SPY_IDS = ["testimonials", "faq"];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [spy, setSpy] = useState(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    function onScroll() {
      const pos = window.scrollY + 140;
      let current = null;
      sections.forEach((sec) => {
        if (sec.offsetTop <= pos) current = sec.id;
      });
      setSpy(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen && menuRef.current) menuRef.current.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  function isActive(link) {
    const [page, hash] = link.href.split("#");
    if (hash) {
      return page === pathname && spy === hash;
    }
    return pathname === link.href;
  }

  return (
    <>
      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-[1000] border-b border-transparent transition-all duration-[350ms]",
          isScrolled &&
            "border-[var(--line)] bg-[var(--header-bg)] py-3 backdrop-blur-[16px] backdrop-saturate-150"
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "header-fade pointer-events-none absolute inset-0 transition-opacity duration-[350ms]",
            isScrolled ? "opacity-0" : "opacity-100"
          )}
        />
        <div
          className={cn(
            "relative z-[1] mx-auto flex w-full max-w-[1220px] items-center justify-between gap-6 px-5 md:px-8",
            isScrolled ? "py-0" : "py-[22px]"
          )}
        >
          <Brand compact={isScrolled} />
          <nav
            className="hidden items-center rounded-full border border-(--line) bg-white/[0.045] p-[6px] backdrop-blur-[10px] shadow-[0_1px_0_rgba(255,255,255,.06)_inset,0_14px_30px_-18px_rgba(0,0,0,.7)] lg:flex"
            aria-label="Primary"
          >
            <ul className="flex gap-[2px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "block rounded-full px-[18px] py-[10px] text-[13.5px] font-semibold transition-colors duration-300",
                      isActive(link)
                        ? "bg-lime text-ink"
                        : "text-mute hover:bg-white/[0.06] hover:text-text-1"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-[18px]">
            <span className="status-chip hidden items-center gap-[9px] whitespace-nowrap rounded-full border border-(--line) bg-white/[0.03] px-4 py-[9px] text-xs font-semibold text-mute xl:flex">
              <span className="dot" aria-hidden="true" />
              Available for new projects
            </span>
            <Button
              href="/contact#contact-form"
              size="sm"
              arrow
              aria-label="Start a project"
              className="max-sm:size-11 max-sm:p-0 max-sm:rounded-full"
            >
              <span className="max-sm:hidden">Start a project</span>
            </Button>
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="surface-hover flex size-11 flex-none items-center justify-center rounded-full border border-(--line-strong) bg-transparent text-text-1 lg:hidden"
            >
              {isOpen ? <X size={20} strokeWidth={1.7} /> : <Menu size={20} strokeWidth={1.7} />}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        tabIndex={-1}
        className={cn(
          "fixed inset-0 z-[1100] flex flex-col gap-[6px] bg-surface px-8 pt-[110px] pb-10 text-text-1 transition-transform duration-[400ms] ease-(--ease) lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "border-b border-(--line) py-[14px] text-[28px] font-bold tracking-tight transition-colors",
                isActive(link) ? "lime-accent" : "text-text-1"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={cn(
              "border-b border-(--line) py-[14px] text-[28px] font-bold tracking-tight",
              pathname === "/contact" ? "lime-accent" : "text-text-1"
            )}
          >
            Contact
          </a>
        </nav>
        <Button href="/contact" onClick={() => setIsOpen(false)} className="mt-[30px] w-full">
          Start a project
        </Button>
        <div className="mt-5 flex items-center justify-between border-t border-(--line) pt-5 text-sm font-semibold text-ash">
          <span>Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
