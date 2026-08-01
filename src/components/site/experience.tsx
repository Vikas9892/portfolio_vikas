import { Users } from "lucide-react";

import { experience } from "@/lib/data";
import { Section } from "./section";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="05 / Experience"
      title="Teaching it is how I learned it"
    >
      <Reveal>
        <article className="relative rounded-[1.25rem] border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-subtle text-accent">
                <Users className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-snug">{experience.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {experience.organisation}
                </p>
              </div>
            </div>
            <p className="font-mono text-xs text-muted-foreground sm:mt-2.5">
              {experience.period}
            </p>
          </div>

          <ul className="mt-7 space-y-4 border-t border-border pt-6">
            {experience.points.map((point) => (
              <li key={point} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="leading-relaxed text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </Section>
  );
}
