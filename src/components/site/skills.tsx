import {
  Brain,
  Cloud,
  Code2,
  Cpu,
  LayoutGrid,
  Network,
  Server,
  type LucideIcon,
} from "lucide-react";

import { skillGroups, type SkillGroup } from "@/lib/data";
import { Section } from "./section";
import { Reveal } from "./reveal";

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  network: Network,
  server: Server,
  brain: Brain,
  layout: LayoutGrid,
  cloud: Cloud,
  cpu: Cpu,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="04 / Skills"
      title="What I actually work in"
      description="Grouped by the layer of the stack they belong to, not by how impressive the list looks."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <Reveal as="li" key={group.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-[1.25rem] border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/40">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent-subtle text-accent">
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="text-base font-semibold">{group.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-muted px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
