"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { navSections, siteConfig } from "@/lib/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const sectionIds = navSections.map((s) => s.id);

export function Nav() {
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on Escape, and stop the page scrolling behind it.
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/70 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          <a href="#top" className="group flex items-center gap-2.5 rounded-full">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-xs font-bold text-accent-foreground"
            >
              VT
            </span>
            <span className="hidden text-sm font-medium sm:inline">
              {siteConfig.name}
            </span>
            {/* Keeps the accessible name a superset of the visible text. */}
            <span className="sr-only">{siteConfig.name} — back to top</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navSections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {section.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={siteConfig.resume}
              className="hidden h-9 items-center rounded-full border border-border-strong px-4 text-sm transition-colors hover:border-accent hover:text-accent sm:inline-flex"
            >
              Résumé
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3.5 text-lg transition-colors",
                    active === section.id
                      ? "bg-accent-subtle text-accent"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {section.label}
                </a>
              </li>
            ))}
            <li className="mt-3 border-t border-border pt-4">
              <a
                href={siteConfig.resume}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3.5 text-lg text-muted-foreground hover:text-foreground"
              >
                Résumé
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
