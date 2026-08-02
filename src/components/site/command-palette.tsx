"use client";

import * as React from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  Search,
} from "lucide-react";

import { projects } from "@/lib/data";
import { navSections, siteConfig, socials } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Command = {
  id: string;
  label: string;
  group: "Navigate" | "Repositories" | "Actions";
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  const commands = React.useMemo<Command[]>(() => {
    const go = (id: string) => () => {
      setOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    const openUrl = (url: string) => () => {
      setOpen(false);
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return [
      ...navSections.map((s) => ({
        id: `nav-${s.id}`,
        label: s.label,
        group: "Navigate" as const,
        hint: "Jump to section",
        icon: ArrowRight,
        run: go(s.id),
      })),
      ...projects.map((p) => ({
        id: `repo-${p.slug}`,
        label: p.name,
        group: "Repositories" as const,
        hint: "Open on GitHub",
        icon: Github,
        run: openUrl(p.github),
      })),
      {
        id: "action-email",
        label: "Copy email address",
        group: "Actions",
        hint: siteConfig.email,
        icon: copied ? Check : Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(siteConfig.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            window.location.href = `mailto:${siteConfig.email}`;
          }
        },
      },
      {
        id: "action-resume",
        label: "Download résumé",
        group: "Actions",
        hint: "PDF",
        icon: Download,
        run: () => {
          setOpen(false);
          window.open(siteConfig.resume, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "action-github",
        label: "GitHub profile",
        group: "Actions",
        hint: "Vikas9892",
        icon: ExternalLink,
        run: openUrl(socials.github),
      },
      {
        id: "action-linkedin",
        label: "LinkedIn profile",
        group: "Actions",
        hint: "vikas-tiwari",
        icon: ExternalLink,
        run: openUrl(socials.linkedin),
      },
    ];
  }, [copied]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        (c.hint?.toLowerCase().includes(q) ?? false),
    );
  }, [commands, query]);

  // ⌘K / Ctrl+K anywhere on the page.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  React.useEffect(() => {
    setActive(0);
  }, [query]);

  // Keep the highlighted row in view as the selection moves by keyboard.
  React.useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-idx="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    }
  };

  let lastGroup = "";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-print-hide
        className="hidden h-9 items-center gap-2 rounded-full border border-border px-3 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent lg:inline-flex"
      >
        <Search className="size-3.5" />
        <span>Search</span>
        <kbd className="ml-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.625rem]">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showClose={false}
          onKeyDown={onKeyDown}
          className="top-[18%] w-[min(36rem,calc(100vw-2rem))] translate-y-0 overflow-hidden p-0"
        >
          <DialogTitle className="sr-only">Command palette</DialogTitle>

          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jump to a section, repo, or action…"
              aria-label="Search commands"
              className="h-14 w-full bg-transparent text-[0.9375rem] outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground sm:block">
              Esc
            </kbd>
          </div>

          <div ref={listRef} className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
            {results.length === 0 && (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No matches for &ldquo;{query}&rdquo;
              </p>
            )}

            {results.map((cmd, i) => {
              const Icon = cmd.icon;
              const showGroup = cmd.group !== lastGroup;
              lastGroup = cmd.group;

              return (
                <React.Fragment key={cmd.id}>
                  {showGroup && (
                    <p className="px-3 pb-1.5 pt-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {cmd.group}
                    </p>
                  )}
                  <button
                    type="button"
                    data-idx={i}
                    onClick={cmd.run}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      i === active
                        ? "bg-accent-subtle text-accent"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <Icon className="size-4 shrink-0 opacity-70" />
                    <span className="min-w-0 flex-1 truncate">{cmd.label}</span>
                    {cmd.hint && (
                      <span className="shrink-0 truncate font-mono text-[0.6875rem] text-muted-foreground">
                        {cmd.hint}
                      </span>
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
