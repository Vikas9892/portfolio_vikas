import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FolderSearch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navSections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 py-24">
      <div
        aria-hidden="true"
        className="grid-pattern pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative w-full max-w-lg text-center">
        <span className="mx-auto mb-7 grid size-14 place-items-center rounded-2xl bg-accent-subtle text-accent">
          <FolderSearch className="size-6" />
        </span>

        <p className="font-mono text-sm tracking-[0.22em] text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
          This page doesn&rsquo;t exist
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The portfolio is a single page — everything lives under one route. One of
          the links below will get you where you were going.
        </p>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back to the portfolio
            </Link>
          </Button>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-2 border-t border-border pt-8">
          {navSections.map((section) => (
            <li key={section.id}>
              <Link
                href={`/#${section.id}`}
                className="inline-flex rounded-full border border-border px-3.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
