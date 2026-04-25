"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number | "some" | "all";
  once?: boolean;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.2,
  once = true,
}: RevealProps) {
  const reducedPref = useReducedMotion();
  const reduced = reducedPref === true;
  const offset = reduced ? 0 : y;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        delay,
        duration: reduced ? 0.01 : 0.5,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
