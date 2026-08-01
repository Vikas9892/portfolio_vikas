import { GraduationCap } from "lucide-react";

import { education } from "@/lib/data";
import { Section } from "./section";
import { Reveal } from "./reveal";

export function About() {
  return (
    <Section id="about" eyebrow="01 / About" title="Systems I understand end to end">
      <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
        <Reveal className="space-y-6 text-base leading-[1.75] text-muted-foreground sm:text-lg">
          <p>
            I&rsquo;d rather ship one system I understand end to end than clone ten
            tutorials I don&rsquo;t. That&rsquo;s why I built a key-value store from raw
            TCP sockets instead of reaching for Redis, and why my RAG pipeline has an
            evaluation harness instead of a demo that looked right once.
          </p>
          <p>
            Currently a B.Tech IT student at IIIT Bhopal, building multi-modal search
            infrastructure and studying distributed systems. Most of what I know came
            from breaking things at 2am and reading the syscall docs afterward.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center gap-2.5 text-accent">
              <GraduationCap className="size-4.5" />
              <h3 className="font-mono text-xs uppercase tracking-[0.18em]">Education</h3>
            </div>
            <p className="text-base font-medium leading-snug">{education.degree}</p>
            <p className="mt-1 text-sm text-muted-foreground">{education.institution}</p>
            <dl className="mt-5 space-y-2.5 border-t border-border pt-5 font-mono text-xs">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Period</dt>
                <dd>{education.period}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">CGPA</dt>
                <dd className="text-accent">{education.cgpa}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
