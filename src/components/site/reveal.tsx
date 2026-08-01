"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in seconds, for revealing a list one item at a time. */
  delay?: number;
  as?: "div" | "li" | "section";
};

/**
 * Scroll-triggered reveal.
 *
 * The motion element is rendered unconditionally so that Framer owns the inline
 * `style` attribute in both motion modes. Swapping to a plain element under
 * reduced motion would leave the server-rendered `opacity: 0` in the DOM with
 * nothing left to clear it, hiding the content permanently.
 *
 * Under reduced motion the reveal still happens — it just resolves instantly,
 * so there is no perceived movement.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </MotionTag>
  );
}
