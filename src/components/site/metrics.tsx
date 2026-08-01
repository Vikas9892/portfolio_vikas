import { metrics } from "@/lib/data";
import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

export function Metrics() {
  return (
    <section aria-label="Measured engineering results" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric, i) => (
            <Reveal
              as="li"
              key={metric.label}
              delay={i * 0.06}
              className="flex flex-col justify-between gap-3 bg-card p-6"
            >
              <CountUp
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-accent sm:text-[1.75rem]"
              />
              <p className="text-sm leading-snug text-muted-foreground">{metric.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
