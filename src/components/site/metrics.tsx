import { metrics } from "@/lib/data";
import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

export function Metrics() {
  return (
    <section aria-labelledby="metrics-heading" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.25rem] border border-border">
            <div className="border-b border-border bg-card px-6 py-4">
              <h2
                id="metrics-heading"
                className="font-mono text-xs uppercase tracking-[0.22em] text-accent"
              >
                Measured, not estimated.
              </h2>
            </div>

            {/* gap-px over a border-coloured backdrop gives exact 1px internal
                dividers at every breakpoint, which divide-x cannot on a grid
                that wraps. */}
            <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
              {metrics.map((metric, i) => (
                <li
                  key={metric.label}
                  className="flex flex-col justify-between gap-3 bg-card px-6 py-6"
                >
                  <CountUp
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-accent sm:text-[1.75rem]"
                    duration={1400 + i * 60}
                  />
                  <p className="text-sm leading-snug text-muted-foreground">
                    {metric.label}
                  </p>
                </li>
              ))}
            </ul>

            {/* Faint gradient band tying the strip together, over the cells so
                the dividers stay crisp. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/[0.06] via-transparent to-sky-500/[0.05]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
