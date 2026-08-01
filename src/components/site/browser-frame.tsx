import * as React from "react";

import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  children: React.ReactNode;
  /** Shown in the fake address pill. */
  url?: string;
  className?: string;
};

/**
 * Chrome-style window framing for product screenshots — a rounded window with
 * a subtle title bar, so a flat PNG reads as a running application.
 */
export function BrowserFrame({ children, url, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border-strong/70 bg-surface-raised shadow-2xl shadow-black/25",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex h-9 items-center gap-2 border-b border-border bg-surface px-3.5"
      >
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </div>
        {url && (
          <div className="ml-2 hidden min-w-0 flex-1 sm:block">
            <span className="block max-w-fit truncate rounded-md bg-muted px-2.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
              {url}
            </span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
