"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

type MagneticCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. Keep it small — this should be felt, not seen. */
  intensity?: number;
};

/**
 * A card that leans very slightly toward the cursor. Disabled entirely under
 * prefers-reduced-motion, and on touch devices where there is no hover to
 * respond to.
 */
export function MagneticCard({ children, className, intensity = 4 }: MagneticCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 180, damping: 18, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  // Rendered unconditionally so Framer keeps ownership of the inline transform
  // in both motion modes; reduced motion simply never feeds it any input.
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("[transform-style:preserve-3d]", className)}
    >
      {children}
    </motion.div>
  );
}
