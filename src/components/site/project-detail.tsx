"use client";

import { ArrowUpRight, Github } from "lucide-react";

import type { Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ArchitectureDiagram } from "./diagrams";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <header className="mb-8 max-w-3xl pr-12">
        <DialogTitle className="text-2xl font-semibold leading-tight sm:text-3xl">
          {project.name}
        </DialogTitle>
        <DialogDescription className="mt-3 text-base leading-relaxed text-muted-foreground">
          {project.tagline}
        </DialogDescription>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="sm" variant="outline">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              Source
            </a>
          </Button>
          {project.live && (
            <Button asChild size="sm">
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                Live site
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          )}
        </div>
      </header>

      <div className="space-y-10">
        <Block title="The problem">
          {/* Lead sentence carries the whole point for anyone skimming. */}
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-foreground">
            {project.problemShort}
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            {project.problem}
          </p>
        </Block>

        <Block title="Architecture">
          <p className="mb-6 max-w-3xl leading-relaxed text-muted-foreground">
            {project.architecture}
          </p>
          <ArchitectureDiagram variant={project.diagram} />
        </Block>

        <Block title="Decisions worth defending">
          <ul className="max-w-3xl space-y-4">
            {project.decisions.map((decision) => (
              <li key={decision} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="leading-relaxed text-muted-foreground">{decision}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Measured results">
          <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {project.results.map((result) => (
              <li
                key={result}
                className="bg-card px-5 py-4 font-mono text-sm leading-snug text-muted-foreground"
              >
                {result}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Stack">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </div>
  );
}
