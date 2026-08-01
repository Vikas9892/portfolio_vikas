import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionProps = {
  id: string;
  /** Small mono label above the heading, e.g. "02 / Projects". */
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24 py-24 sm:py-32", className)}
    >
      <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", containerClassName)}>
        <Reveal className="mb-14 max-w-3xl">
          {eyebrow && (
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {eyebrow}
            </p>
          )}
          <h2
            id={headingId}
            className="text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-[2.75rem]"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
