"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * 2px reading-progress bar pinned to the top of the viewport.
 *
 * Purely decorative — hidden from assistive tech, and it carries no motion a
 * reduced-motion user would object to since it only tracks their own scrolling.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      data-print-hide
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}
