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

function Counter({ index, total }: { index: number; total: number }) {
  return (
    <span className="font-mono text-sm font-medium text-accent">
      {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
    </span>
  );
}

export function ScreenshotGallery({ screenshots, url }: GalleryProps) {
  const [index, setIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  // The lightbox is state-controlled rather than opened by a DialogTrigger, so
  // Radix has no trigger to hand focus back to. Restore it by hand on close.
  const triggerRef = React.useRef<HTMLButtonElement>(null);

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

  const Dots = (
    <div
      role="tablist"
      aria-label="Screenshots"
      className="flex flex-wrap items-center gap-2"
    >
      {screenshots.map((shot, i) => (
        <button
          key={shot.src}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`${i + 1}. ${shot.caption}`}
          onClick={() => go(i)}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            i === index
              ? "w-7 bg-accent"
              : "w-2 bg-border-strong hover:bg-muted-foreground",
          )}
        />
      ))}
    </div>
  );

  return (
    <div onKeyDown={onKeyDown}>
      <div className="group relative">
        <BrowserFrame url={url}>
          {/* The whole frame is the affordance — clicking the shot opens it
              full screen, which is what people try first. */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Open screenshot full screen: ${current.caption}`}
            className="relative block aspect-[1905/880] w-full cursor-zoom-in bg-surface"
          >
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

            <span
              aria-hidden="true"
              className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-border bg-background/85 text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
            >
              <Expand className="size-4" />
            </span>
          </button>
        </BrowserFrame>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="flex min-w-0 items-baseline gap-2.5 text-[0.9375rem]" aria-live="polite">
          <Counter index={index} total={total} />
          <span className="text-muted-foreground">{current.caption}</span>
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

      <div className="mt-4">{Dots}</div>

      {/* Radix restores focus to the trigger on close and handles Escape. */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="w-[min(92rem,calc(100vw-1.5rem))] border-0 bg-transparent shadow-none"
          onKeyDown={onKeyDown}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <DialogTitle className="sr-only">{current.caption}</DialogTitle>
          <BrowserFrame url={url}>
            <div className="relative aspect-[1905/880] w-full bg-surface">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="92rem"
                className="object-contain"
              />
            </div>
          </BrowserFrame>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3">
            <p className="flex items-baseline gap-2.5 text-[0.9375rem]">
              <Counter index={index} total={total} />
              <span className="text-muted-foreground">{current.caption}</span>
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
