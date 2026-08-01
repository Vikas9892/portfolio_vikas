import * as React from "react";

import { cn } from "@/lib/utils";

export const BOX_W = 124;
export const BOX_H = 48;

type ShellProps = {
  /** Accessible name — describes what the diagram shows. */
  title: string;
  description: string;
  viewBox: string;
  children: React.ReactNode;
  className?: string;
  id: string;
};

export function DiagramShell({
  title,
  description,
  viewBox,
  children,
  className,
  id,
}: ShellProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={cn("h-auto w-full", className)}
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{description}</desc>
      <defs>
        <marker
          id={`${id}-arrow`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className="fill-border-strong" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

type BoxProps = {
  x: number;
  y: number;
  label: string;
  sub?: string;
  /** Highlighted boxes carry the accent — use for the one or two that matter. */
  accent?: boolean;
  w?: number;
  h?: number;
};

export function Box({ x, y, label, sub, accent, w = BOX_W, h = BOX_H }: BoxProps) {
  const cx = x + w / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        className={cn(
          "stroke-[1.25]",
          accent ? "fill-accent-subtle stroke-accent/50" : "fill-card stroke-border-strong",
        )}
      />
      <text
        x={cx}
        y={sub ? y + 20 : y + h / 2 + 4}
        textAnchor="middle"
        className={cn(
          "text-[11px] font-medium",
          accent ? "fill-accent" : "fill-[currentColor]",
        )}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </text>
      {sub && (
        <text
          x={cx}
          y={y + 35}
          textAnchor="middle"
          className="fill-[currentColor] text-[9px] opacity-55"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

type FlowProps = {
  d: string;
  markerId: string;
  /** Seconds of delay, so a chain of arrows animates in sequence. */
  delay?: number;
};

/**
 * A connection between two boxes: a static rail plus an animated dashed
 * overlay showing direction of travel. The overlay is what stops moving under
 * prefers-reduced-motion; the rail always stays visible.
 */
export function Flow({ d, markerId, delay = 0 }: FlowProps) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        className="stroke-border-strong stroke-[1.25]"
        markerEnd={`url(#${markerId})`}
      />
      <path
        d={d}
        fill="none"
        className="animate-dash stroke-accent stroke-[1.75]"
        style={{ animationDelay: `${delay}s` }}
      />
    </g>
  );
}

type PulseProps = { cx: number; cy: number; delay?: number };

export function Pulse({ cx, cy, delay = 0 }: PulseProps) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      className="animate-node fill-accent"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

type CaptionProps = { x: number; y: number; children: string; anchor?: "start" | "middle" };

export function Caption({ x, y, children, anchor = "middle" }: CaptionProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-[currentColor] text-[9px] uppercase opacity-50"
      style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
    >
      {children}
    </text>
  );
}
