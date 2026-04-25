"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { pet, whatsappUrl } from "@/lib/data";

const waHref = whatsappUrl();

export default function StickyHeader() {
  const reduced = useReducedMotion() === true;
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    const threshold = typeof window !== "undefined" ? window.innerHeight * 0.8 : 0;
    setVisible(window.scrollY > threshold);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="sticky-header"
          initial={reduced ? false : { y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: -100, opacity: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-40 border-b border-surface-ring bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-6">
            <a
              href="#hero"
              className="min-w-0 text-left text-sm font-black leading-tight text-foreground sm:text-base"
            >
              <span className="text-brand-red">{pet.name}</span>
              <span className="ml-1.5 text-foreground-muted">· Gato perdido</span>
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-black text-white shadow-md sm:h-11 sm:px-4 sm:text-sm"
            >
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M16.003 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.617 4.64 1.787 6.653L2.667 29.333l6.88-1.76A13.28 13.28 0 0 0 16.003 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.003 2.667Zm0 24A10.613 10.613 0 0 1 10.4 25.12l-.373-.24-3.867.987 1.013-3.747-.267-.387A10.587 10.587 0 0 1 5.333 16c0-5.893 4.8-10.667 10.667-10.667S26.667 10.107 26.667 16 21.893 26.667 16.003 26.667Zm5.84-7.973c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.506-.16-.72.16-.213.32-.827 1.04-.987 1.227-.16.186-.32.213-.64.053-.32-.16-1.36-.5-2.587-1.6-.96-.853-1.6-1.907-1.787-2.227-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.186.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.267-.627-.533-.533-.72-.547H11.7c-.213 0-.56.08-.853.4S9.76 11.84 9.76 13.387c0 1.546 1.12 3.04 1.28 3.253.16.213 2.213 3.373 5.36 4.72.747.32 1.333.507 1.787.653.747.24 1.44.213 1.973.133.6-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.28-.213-.6-.373Z" />
    </svg>
  );
}
