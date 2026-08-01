"use client";

import * as React from "react";
import { ArrowUpRight, Github, Maximize2, Star } from "lucide-react";

import { projects, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { MagneticCard } from "./magnetic-card";
import { ScreenshotGallery } from "./screenshot-gallery";
import { ProjectDetail } from "./project-detail";

/** Links stop the card's own click handler from also opening the dialog. */
const stop = (e: React.MouseEvent) => e.stopPropagation();

function RepoLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-1.5">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
        aria-label={`${project.name} source on GitHub`}
        className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <Github className="size-4" />
      </a>
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          aria-label={`${project.name} live site`}
          className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUpRight className="size-4" />
        </a>
      )}
    </div>
  );
}

function FeaturedProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <Reveal className="mb-8">
      <article className="relative overflow-hidden rounded-[1.25rem] border border-border bg-card">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="mb-9 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="accent">
                  <Star className="mr-1.5 size-3" aria-hidden="true" />
                  Featured
                </Badge>
                <Badge variant="outline">1,327 tests · 99% coverage</Badge>
                <Badge variant="outline">64 Playwright E2E specs</Badge>
              </div>

              <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
                {project.name}
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {project.tagline}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Button size="sm" onClick={onOpen}>
                Read the engineering
                <Maximize2 className="size-4" />
              </Button>
              <RepoLinks project={project} />
            </div>
          </div>

          {project.screenshots && (
            <div className="min-w-0">
              <ScreenshotGallery screenshots={project.screenshots} />
            </div>
          )}

          <ul className="mt-8 flex flex-wrap gap-2 border-t border-border pt-7">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <Reveal as="li" delay={index * 0.08}>
      <MagneticCard className="h-full">
        <article className="group relative flex h-full flex-col rounded-[1.25rem] border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/40 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold leading-snug">
              <button
                type="button"
                onClick={onOpen}
                className="text-left after:absolute after:inset-0 after:content-['']"
              >
                {project.name}
              </button>
            </h3>
            <span className="relative z-10">
              <RepoLinks project={project} />
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>

          <ul className="mt-6 space-y-2">
            {project.results.slice(0, 3).map((result) => (
              <li
                key={result}
                className="flex gap-2.5 font-mono text-xs leading-snug text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1 shrink-0 rounded-full bg-accent"
                />
                {result}
              </li>
            ))}
          </ul>

          <ul className="mt-auto flex flex-wrap gap-1.5 pt-7">
            {project.tech.slice(0, 5).map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>

          <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Read the engineering
            <ArrowUpRight className="size-3.5" />
          </p>
        </article>
      </MagneticCard>
    </Reveal>
  );
}

export function Projects() {
  const [openSlug, setOpenSlug] = React.useState<string | null>(null);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <Section
      id="projects"
      eyebrow="02 / Projects"
      title="Four systems, built and benchmarked"
      description="Each one started with a problem I could not solve by installing something. Open any card for the architecture, the decisions worth defending, and the numbers."
    >
      {featured && (
        <FeaturedProject project={featured} onOpen={() => setOpenSlug(featured.slug)} />
      )}

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            onOpen={() => setOpenSlug(project.slug)}
          />
        ))}
      </ul>

      <Dialog
        open={openProject !== null}
        onOpenChange={(open) => !open && setOpenSlug(null)}
      >
        <DialogContent>
          {openProject && <ProjectDetail project={openProject} />}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
