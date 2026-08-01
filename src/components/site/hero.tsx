"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, FileText, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import { marqueeItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { socialLinks } from "./social-icons";

function GradientMesh() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-mesh absolute -left-[15%] -top-[25%] size-[36rem] rounded-full bg-accent/20 blur-[110px] dark:bg-accent/25" />
      <div
        className="animate-mesh absolute -right-[10%] top-[5%] size-[30rem] rounded-full bg-sky-500/15 blur-[110px] dark:bg-sky-400/15"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="animate-mesh absolute bottom-[-20%] left-[25%] size-[28rem] rounded-full bg-violet-500/10 blur-[120px] dark:bg-violet-400/12"
        style={{ animationDelay: "-14s" }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
    </div>
  );
}

function HeroPhoto() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // A gentle lift as the hero leaves the viewport — not parallax theatre.
  const y = useTransform(scrollYProgress, [0, 0.25], [0, -28]);

  return (
    <motion.div
      style={reduceMotion ? undefined : { y }}
      className="relative mx-auto w-full max-w-[19rem] lg:max-w-[22rem]"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-linear-to-tr from-accent/25 via-transparent to-sky-500/20 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-border-strong/60 shadow-2xl shadow-black/25">
        <Image
          src="/vikas.jpg"
          alt="Vikas Tiwari"
          width={880}
          height={1100}
          priority
          sizes="(max-width: 1024px) 19rem, 22rem"
          className="h-auto w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-background/45 via-transparent to-transparent"
        />
      </div>
    </motion.div>
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

export function Hero() {
  return (
    <section id="top" className="relative isolate">
      <div className="grain relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <GradientMesh />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Photo stacks above the copy on mobile, sits right on desktop. */}
          <div className="order-1 lg:order-2">
            <HeroPhoto />
          </div>

          <div className="order-2 lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Open to SDE &amp; AI internships
              </span>
            </div>

            <h1 className="text-[2.1rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              I build systems that don&rsquo;t fall over
              <span className="text-gradient"> — and I measure them.</span>
            </h1>

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
