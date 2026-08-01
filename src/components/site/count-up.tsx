"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Duration in milliseconds. */
  duration?: number;
  className?: string;
};

const format = (n: number) => n.toLocaleString("en-US");

/**
 * Counts from zero to `value` the first time it scrolls into view. Users who
 * prefer reduced motion get the final number straight away.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutExpo — fast out of the gate, settles precisely on the value.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  );
}
