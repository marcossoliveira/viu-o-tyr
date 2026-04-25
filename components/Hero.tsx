"use client";

import Image from "next/image";
import { useReducedMotion, motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { PiShareNetwork } from "react-icons/pi";
import { pet, whatsappUrl } from "@/lib/data";
import { publicImage } from "@/lib/publicImage";
import ShareModal from "@/components/ShareModal";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const waHref = whatsappUrl();

export default function Hero() {
  const reduced = useReducedMotion() === true;
  const [scrolled, setScrolled] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: reduced ? 0.01 : 0.55, ease },
  });

  return (
    <>
    <section
      id="hero"
      className="relative h-[100svh] min-h-0 w-full overflow-hidden sm:min-h-[640px]"
    >
      {/* Photo + Ken Burns */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 ${!reduced ? "hero-kenburns" : ""}`}
          style={{ willChange: reduced ? undefined : "transform" }}
        >
          <Image
            src={publicImage("/images/tyr-1.jpg")}
            alt="Foto de Týr — gato laranja perdido na Praia de Itaparica, Vila Velha/ES"
            fill
            sizes="100vw"
            className="object-cover object-center max-sm:object-[center_32%] sm:object-center"
            priority
          />
        </div>
      </div>

      {/* Gradients: no mobile menos opacidade em baixo para o rosto aparecer por cima do texto */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/15 to-transparent max-sm:from-black/45 max-sm:via-black/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/88 via-black/45 to-black/25 max-sm:from-black/68 max-sm:via-black/28 max-sm:to-transparent"
        aria-hidden
      />

      {/* Top pill */}
      <div className="absolute inset-x-0 top-0 z-[2] flex justify-center px-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <motion.div {...fadeUp(0.05)} className="w-full max-w-6xl">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md sm:text-sm">
            <span aria-hidden>⚠</span> Gato desaparecido
          </span>
        </motion.div>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col justify-end px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-14 max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pt-24">
        <div className="mx-auto w-full max-w-6xl">
          <motion.h1
            className="font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] [font-size:clamp(2.35rem,10vw,6rem)] max-sm:[font-size:clamp(2.1rem,11vw,3.25rem)]"
            {...fadeUp(0.12)}
          >
            <span className="block text-[0.45em] font-black uppercase tracking-[0.12em] text-white/80">
              Você viu o
            </span>
            <span className="mt-1 block text-brand-red [font-size:1.05em] [text-shadow:0_4px_32px_rgba(0,0,0,0.45)]">
              {pet.name}?
            </span>
          </motion.h1>

          <motion.p
            className="mt-2 max-w-2xl text-pretty text-sm leading-snug text-white/90 max-sm:line-clamp-3 sm:mt-4 sm:text-base sm:leading-normal sm:line-clamp-none sm:text-lg"
            title={`Desapareceu em ${pet.disappearedAt}. Último avistamento: ${pet.lastSeen.location}.`}
            {...fadeUp(0.22)}
          >
            Desapareceu em <strong className="font-semibold">{pet.disappearedAt}</strong>
            . Último avistamento: {pet.lastSeen.location}.
          </motion.p>

          <motion.div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:gap-4" {...fadeUp(0.3)}>
            <motion.span
              className="inline-flex w-fit max-w-full items-center rounded-2xl bg-brand-amber px-4 py-2 text-sm font-black text-neutral-950 shadow-xl ring-2 ring-white/20 sm:px-5 sm:py-2.5 sm:text-base"
              animate={
                reduced
                  ? undefined
                  : { scale: [1, 1.02, 1], boxShadow: ["0 20px 40px -12px rgba(0,0,0,0.35)", "0 24px 48px -10px rgba(0,0,0,0.4)", "0 20px 40px -12px rgba(0,0,0,0.35)"] }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              Recompensa {pet.reward}
            </motion.span>

            <div className="flex flex-row flex-wrap items-stretch gap-2 sm:items-center sm:gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-base font-black text-white shadow-2xl ring-1 ring-white/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] sm:min-h-14 sm:flex-none sm:gap-3 sm:px-7 sm:py-3.5 sm:text-lg"
              >
                <WhatsappIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                <span className="truncate sm:hidden">WhatsApp</span>
                <span className="hidden sm:inline">Falar no WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-3 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 sm:min-h-14 sm:flex-none sm:px-5 sm:text-base"
              >
                <PiShareNetwork className="h-5 w-5 shrink-0" aria-hidden />
                <span className="sm:hidden">Compartilhar</span>
                <span className="hidden sm:inline">Compartilhar</span>
              </button>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {!scrolled && (
            <motion.div
              key="scroll-hint"
              className="mx-auto mt-4 flex max-w-6xl flex-col items-center text-white/70 max-sm:mt-3 sm:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 6, 0] }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
            >
              <span className="mb-1 text-xs font-semibold uppercase tracking-widest">
                Role para ver mais
              </span>
              <ChevronDown className="h-6 w-6" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
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

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
