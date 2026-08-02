"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, FileText, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { marqueeItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { socialLinks } from "./social-icons";

type HeadlineLine = {
  text: string;
  /** Word that gets the accent wiped into it after the line lands. */
  wipe?: string;
  tail?: string;
};

/** Headline split into its three rendered lines so they can stagger in. */
const HEADLINE_LINES: HeadlineLine[] = [
  { text: "I build systems" },
  { text: "that don’t fall over —" },
  { text: "and I ", wipe: "measure", tail: " them." },
];

const LINE_STAGGER = 0.06;

/**
 * Full-bleed photo panel. No frame of any kind — the hard vertical edge where
 * the text column meets the image is the composition.
 *
 * The lanterns behind the subject are in sharp focus, so no overlay can
 * suppress them. They are cropped out instead: the image is scaled up inside an
 * overflow-hidden panel, which pushes the densest part of the lantern field
 * outside the frame and leaves a head-and-shoulders composition.
 */
function HeroPhoto() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative order-1 h-[52vh] overflow-hidden lg:order-2 lg:h-auto">
      <motion.div
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/vikas.jpg"
          alt="Vikas Tiwari"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="hero-photo-img object-cover"
        />
      </motion.div>

      {/* Seam blending — all three use the page background, so the panel
          dissolves into the page instead of sitting on top of it. */}
      <span aria-hidden="true" className="hero-fade-top" />
      <span aria-hidden="true" className="hero-fade-bottom" />
      <span aria-hidden="true" className="hero-fade-left" />

      {/* Single focus overlay: darkens the edges without touching colour. */}
      <span aria-hidden="true" className="hero-focus" />
    </div>
  );
}

function Marquee() {
  // Duplicated once so the -50% translate loops seamlessly.
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      aria-hidden="true"
      className="relative flex w-full overflow-hidden border-y border-border/60 py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="animate-marquee flex shrink-0 items-center gap-3 pr-3">
        {items.map((item, i) => (
          <React.Fragment key={`${item}-${i}`}>
            <span className="font-mono text-sm text-muted-foreground">{item}</span>
            <span className="size-1 rounded-full bg-accent/50" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Headline() {
  const reduceMotion = useReducedMotion();

  return (
    // The lg step is deliberately smaller than sm: at 1024 the text column is
    // only ~55% wide, and 3.4rem wraps the middle line into two.
    <h1 className="text-[2.1rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[2.6rem] xl:text-[3.4rem]">
      {HEADLINE_LINES.map((line, i) => (
        <motion.span
          key={line.text}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: reduceMotion ? 0 : i * LINE_STAGGER,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="block"
        >
          {line.text}
          {line.wipe && (
            <>
              <span className="accent-wipe-word">
                {line.wipe}
                <span
                  aria-hidden="true"
                  className="accent-wipe-layer"
                  style={
                    {
                      "--wipe-delay": `${(HEADLINE_LINES.length - 1) * LINE_STAGGER * 1000 + 400}ms`,
                    } as React.CSSProperties
                  }
                >
                  {line.wipe}
                </span>
              </span>
              {line.tail}
            </>
          )}
        </motion.span>
      ))}
    </h1>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate">
      <div className="relative grid lg:min-h-[min(100vh,900px)] lg:grid-cols-[55fr_45fr]">
        <HeroPhoto />

        {/* Text column. Its left padding tracks the page container so the
            headline lines up with every section below it. */}
        <div className="grain relative order-2 flex items-center lg:order-1">
          <div
            aria-hidden="true"
            className="hero-grid pointer-events-none absolute inset-0"
          />

          <div className="relative w-full px-5 py-16 sm:px-8 lg:py-24 lg:pl-[max(2rem,calc((100vw-72rem)/2))] lg:pr-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Open to SDE &amp; AI internships
              </span>
            </div>

            <Headline />

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              B.Tech IT @ IIIT Bhopal. I write backend and distributed systems from
              first principles — raw TCP sockets, vector search, evaluation harnesses
              — then benchmark them until the numbers are real.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#projects">
                  View Projects
                  <ArrowDown className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={siteConfig.resume}>
                  <FileText className="size-4" />
                  Résumé
                </a>
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ul className="flex items-center gap-2">
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} profile`}
                      className="group grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {siteConfig.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
