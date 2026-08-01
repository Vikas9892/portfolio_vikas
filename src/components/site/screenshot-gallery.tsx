"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

import type { Screenshot } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BrowserFrame } from "./browser-frame";

type GalleryProps = {
  screenshots: Screenshot[];
  /** Shown in the frame's address pill. */
  url?: string;
};

export function ScreenshotGallery({ screenshots, url }: GalleryProps) {
  const [index, setIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const thumbStripRef = React.useRef<HTMLDivElement>(null);

  const total = screenshots.length;
  const current = screenshots[index];

  // Mounting all eleven slides up front costs a lot of DOM and network for
  // images nobody has asked to see. Track which ones have been visited and
  // render only those — the crossfade still works because a slide stays
  // mounted once shown.
  const [visited, setVisited] = React.useState<Set<number>>(() => new Set([0]));

  const go = React.useCallback(
    (next: number) => {
      const target = (next + total) % total;
      setIndex(target);
      setVisited((prev) => (prev.has(target) ? prev : new Set(prev).add(target)));
    },
    [total],
  );

  // Arrow keys drive the carousel whenever focus is inside it or the lightbox
  // is open — the same two keys people already expect from a gallery.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  // Keep the active thumbnail in view as the selection moves.
  React.useEffect(() => {
    const strip = thumbStripRef.current;
    const active = strip?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (!strip || !active) return;
    strip.scrollTo({
      left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2,
      behavior: "smooth",
    });
  }, [index]);

  return (
    <div onKeyDown={onKeyDown}>
      <div className="group relative">
        <BrowserFrame url={url}>
          <div className="relative aspect-[1905/880] w-full bg-surface">
            {screenshots.map((shot, i) =>
              visited.has(i) ? (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 72rem"
                  className={cn(
                    "object-contain transition-opacity duration-500",
                    i === index ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden={i !== index}
                />
              ) : null,
            )}
          </div>
        </BrowserFrame>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute right-3 top-12 grid size-9 place-items-center rounded-full border border-border bg-background/85 text-muted-foreground opacity-0 backdrop-blur transition-all hover:border-accent hover:text-accent focus-visible:opacity-100 group-hover:opacity-100"
          aria-label={`Expand screenshot: ${current.caption}`}
        >
          <Expand className="size-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="min-w-0 text-sm text-muted-foreground" aria-live="polite">
          <span className="font-mono text-xs text-accent">
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>{" "}
          <span className="ml-1">{current.caption}</span>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous screenshot"
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next screenshot"
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={thumbStripRef}
        role="tablist"
        aria-label="Screenshots"
        className="mt-5 flex gap-2.5 overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        {screenshots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            role="tab"
            data-index={i}
            aria-selected={i === index}
            aria-label={shot.caption}
            onClick={() => go(i)}
            className={cn(
              "relative aspect-[1905/880] h-16 shrink-0 overflow-hidden rounded-md border-2 bg-surface transition-all",
              i === index
                ? "border-accent opacity-100"
                : "border-transparent opacity-50 hover:opacity-90",
            )}
          >
            <Image
              src={shot.src}
              alt=""
              fill
              sizes="120px"
              loading="lazy"
              className="object-cover object-top"
            />
          </button>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="w-[min(84rem,calc(100vw-1.5rem))] border-0 bg-transparent shadow-none"
          onKeyDown={onKeyDown}
        >
          <DialogTitle className="sr-only">{current.caption}</DialogTitle>
          <BrowserFrame url={url}>
            <div className="relative aspect-[1905/880] w-full bg-surface">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="84rem"
                className="object-contain"
              />
            </div>
          </BrowserFrame>
          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </span>{" "}
              <span className="ml-1">{current.caption}</span>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous screenshot"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next screenshot"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
