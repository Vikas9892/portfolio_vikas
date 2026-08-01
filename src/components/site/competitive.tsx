"use client";

import { ArrowUpRight } from "lucide-react";

import { platforms, type Platform } from "@/lib/data";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

const ARC_RADIUS = 34;
const ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_RADIUS;
/** Three-quarter arc, leaving a gap at the bottom. */
const ARC_SWEEP = 0.75;

function RatingArc({ platform }: { platform: Platform }) {
  const fraction = Math.min(platform.rating / platform.arcMax, 1);
  const track = ARC_CIRCUMFERENCE * ARC_SWEEP;

  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-[225deg]" aria-hidden="true">
        <circle
          cx="40"
          cy="40"
          r={ARC_RADIUS}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className="stroke-muted"
          strokeDasharray={`${track} ${ARC_CIRCUMFERENCE}`}
        />
        <circle
          cx="40"
          cy="40"
          r={ARC_RADIUS}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          stroke={platform.color}
          strokeDasharray={`${track * fraction} ${ARC_CIRCUMFERENCE}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-lg font-semibold tabular-nums">
          <CountUp value={platform.rating} />
        </span>
      </div>
    </div>
  );
}

export function Competitive() {
  return (
    <Section
      id="competitive"
      eyebrow="03 / Competitive programming"
      title="Problems solved under a clock"
      description="Contest programming is where I keep complexity analysis honest — you either found the right bound or you timed out."
    >
      <Reveal className="mb-10 flex items-baseline gap-4">
        <CountUp
          value={1000}
          suffix="+"
          className="font-mono text-4xl font-semibold tabular-nums text-accent sm:text-5xl"
        />
        <p className="text-sm text-muted-foreground sm:text-base">
          problems solved across platforms
        </p>
      </Reveal>

      <ul className="grid gap-6 md:grid-cols-3">
        {platforms.map((platform, i) => (
          <Reveal as="li" key={platform.name} delay={i * 0.08}>
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-[1.25rem] border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{platform.name}</h3>
                  <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                    @{platform.handle}
                  </p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>

              <div className="flex items-center gap-5">
                <RatingArc platform={platform} />
                <div className="min-w-0">
                  <span
                    className="inline-flex rounded-full px-2.5 py-1 font-mono text-xs font-medium"
                    style={{
                      color: platform.color,
                      backgroundColor: `${platform.color}1f`,
                    }}
                  >
                    {platform.badge}
                  </span>
                  <p className="mt-2.5 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                    {platform.ratingLabel}
                  </p>
                </div>
              </div>

              {platform.note && (
                <p className="mt-6 border-t border-border pt-4 text-sm leading-snug text-muted-foreground">
                  {platform.note}
                </p>
              )}
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
