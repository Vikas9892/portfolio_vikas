"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Route-level error boundary. Catches render and data errors below the root
 * layout, so a failure shows this instead of a blank page.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 py-24">
      <div
        aria-hidden="true"
        className="grid-pattern pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />

      <div className="relative w-full max-w-lg text-center">
        <span className="mx-auto mb-7 grid size-14 place-items-center rounded-2xl bg-accent-subtle text-accent">
          <AlertTriangle className="size-6" />
        </span>

        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
          Something broke on this page
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Not your fault. Reloading the section usually clears it — if it doesn&rsquo;t,
          the rest of the portfolio still works from the home page.
        </p>

        {error.digest && (
          <p className="mt-5 font-mono text-xs text-muted-foreground">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={reset}>
            <RotateCw className="size-4" />
            Try again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to the portfolio</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
