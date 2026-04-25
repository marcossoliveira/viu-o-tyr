"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const STAGGER = 0.08;
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = (reduced: boolean) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduced ? 0 : STAGGER,
      delayChildren: reduced ? 0 : 0.04,
    },
  },
});

const child = (reduced: boolean) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0.01 : 0.45, ease },
  },
});

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  amount?: number | "some" | "all";
  once?: boolean;
};

/**
 * Staggered scroll reveal — wrap direct children in RevealStaggerItem
 */
export function RevealStagger({
  children,
  className,
  amount = 0.15,
  once = true,
}: RevealStaggerProps) {
  const reducedPref = useReducedMotion();
  const reduced = reducedPref === true;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={container(reduced)}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function RevealStaggerItem({ children, className }: RevealStaggerItemProps) {
  const reducedPref = useReducedMotion();
  const reduced = reducedPref === true;
  return (
    <motion.div className={className} variants={child(reduced)}>
      {children}
    </motion.div>
  );
}
