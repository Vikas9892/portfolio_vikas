"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, FileText, MapPin } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

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
const PHOTO_DELAY = 0.2;

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

/** 1px grid, masked to fade at the edges, drifting slowly on scroll. */
function HeroGrid() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 60]);

  return (
    <motion.div
      aria-hidden="true"
      style={reduceMotion ? undefined : { y }}
      className="hero-grid pointer-events-none absolute -inset-y-24 inset-x-0"
    />
  );
}

const ORBS = [
  { className: "-left-8 top-4 size-40 bg-accent/25", x: "10%", y: "-12%", d: "18s", delay: "0s" },
  { className: "-right-10 top-1/3 size-32 bg-sky-400/20", x: "-12%", y: "10%", d: "24s", delay: "-6s" },
  { className: "bottom-2 left-1/4 size-36 bg-accent/20", x: "8%", y: "8%", d: "21s", delay: "-12s" },
  { className: "-right-4 bottom-10 size-24 bg-violet-400/20", x: "-9%", y: "-9%", d: "16s", delay: "-3s" },
];

function Orbs() {
  return (
    // No overflow clipping — a blurred orb cut off at a container edge reads as
    // a hard-edged rectangle behind the photo.
    <div aria-hidden="true" className="pointer-events-none absolute -inset-10">
      {ORBS.map((orb, i) => (
        <span
          key={i}
          className={`animate-orb absolute rounded-full blur-[56px] ${orb.className}`}
          style={
            {
              "--orb-x": orb.x,
              "--orb-y": orb.y,
              "--orb-duration": orb.d,
              animationDelay: orb.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function HeroPhoto() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollY = useTransform(scrollYProgress, [0, 0.25], [0, -28]);

  const wrapRef = React.useRef<HTMLDivElement>(null);
  // Pointer-driven tilt. Touch devices never fire pointermove with a mouse
  // type, so this stays inert on phones and tablets.
  const [pointerFine, setPointerFine] = React.useState(false);
  React.useEffect(() => {
    setPointerFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["25%", "75%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["25%", "75%"]);

  const tiltActive = pointerFine && !reduceMotion;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltActive) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduceMotion ? undefined : { y: scrollY }}
      className="relative mx-auto w-full max-w-[19rem] lg:max-w-[22rem]"
    >
      <Orbs />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: PHOTO_DELAY, ease: [0.22, 1, 0.36, 1] }}
        style={
          tiltActive ? { rotateX, rotateY, transformPerspective: 1000 } : undefined
        }
        className="relative"
      >
        {/* Conic ring: a spinning gradient disc clipped to a 2px border. */}
        <div className="relative overflow-hidden rounded-[1.75rem] p-[2px] shadow-2xl shadow-black/30">
          <span
            aria-hidden="true"
            className="animate-ring absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 opacity-40 [background:conic-gradient(from_0deg,transparent_0deg,hsl(var(--accent))_70deg,transparent_150deg,transparent_210deg,hsl(var(--accent))_290deg,transparent_360deg)]"
          />

          <div className="relative overflow-hidden rounded-[1.6rem] bg-background">
            {/* Natural colour, lightly zoomed to trim the outermost lanterns.
                The rounded parent clips the overflow. */}
            <Image
              src="/vikas.jpg"
              alt="Vikas Tiwari"
              width={880}
              height={1100}
              priority
              sizes="(max-width: 1024px) 19rem, 22rem"
              className="photo-natural h-auto w-full object-cover"
            />

            {/* Accent glow tracking the cursor. Framer keeps the two custom
                properties in sync; the gradient itself is plain CSS. */}
            {tiltActive && (
              <motion.span
                aria-hidden="true"
                style={{ "--glow-x": glowX, "--glow-y": glowY } as React.CSSProperties}
                className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_var(--glow-x)_var(--glow-y),hsl(var(--accent)/0.3),transparent_62%)]"
              />
            )}

            <span
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-background/50 via-transparent to-transparent"
            />
          </div>
        </div>
      </motion.div>
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

function Headline() {
  const reduceMotion = useReducedMotion();

  return (
    <h1 className="text-[2.1rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
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
      <div className="grain relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <GradientMesh />
        <HeroGrid />

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
