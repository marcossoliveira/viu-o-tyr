"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PiWhatsappLogo } from "react-icons/pi";
import Reveal from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { findingSteps, hidingSpots, whatsappUrl } from "@/lib/data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ChipIcon({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() === true;
  return (
    <motion.div
      className="mb-2 flex justify-center"
      initial={reduced ? undefined : { scale: 0.88, opacity: 0.7 }}
      whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function HowToHelp() {
  const wa = whatsappUrl();

  return (
    <section
      className="border-t border-surface-ring bg-background py-16 px-5 sm:py-20 sm:px-6"
      id="como-ajudar"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-black tracking-tight text-foreground sm:mb-3 sm:text-4xl">
            Você pode ajudar
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-foreground-muted sm:text-lg">
            O Týr pode estar assustado e escondido. Qualquer pista no bairro é
            valiosa.
          </p>
        </Reveal>

        <Reveal>
          <h3 className="mb-4 text-center text-sm font-black uppercase tracking-widest text-foreground-muted sm:mb-6 sm:text-left">
            Onde ele pode estar escondido
          </h3>
        </Reveal>

        <RevealStagger className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {hidingSpots.map((spot) => {
            const { Icon, label } = spot;
            return (
              <RevealStaggerItem key={label}>
                <div className="flex h-full flex-col rounded-2xl bg-surface p-4 text-center ring-1 ring-surface-ring shadow-md shadow-black/5 dark:shadow-none">
                  <ChipIcon>
                    <Icon
                      className="h-8 w-8 text-brand-amber"
                      aria-hidden
                    />
                  </ChipIcon>
                  <p className="text-sm font-bold leading-snug text-foreground">
                    {label}
                  </p>
                </div>
              </RevealStaggerItem>
            );
          })}
        </RevealStagger>

        <Reveal>
          <h3 className="mb-6 text-center text-sm font-black uppercase tracking-widest text-foreground-muted sm:text-left">
            O que fazer se encontrar
          </h3>
        </Reveal>

        <RevealStagger className="w-full space-y-5">
          {findingSteps.map((step, i) => {
            const { Icon, label, value } = step;
            return (
              <RevealStaggerItem key={label}>
                <div className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-sm font-black text-brand-red"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl bg-surface p-4 ring-1 ring-surface-ring">
                    <div className="mb-1 flex items-start gap-2">
                      <Icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-foreground-muted"
                        aria-hidden
                      />
                      <p className="font-bold text-foreground">{label}</p>
                    </div>
                    {value ? (
                      <p className="ml-7 text-sm text-foreground-muted">
                        {value}
                      </p>
                    ) : null}
                  </div>
                </div>
              </RevealStaggerItem>
            );
          })}
        </RevealStagger>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-center text-lg font-black text-white shadow-2xl ring-1 ring-white/20 transition hover:opacity-95 sm:mx-auto sm:flex sm:max-w-md"
          >
            <PiWhatsappLogo className="h-7 w-7 shrink-0" aria-hidden />
            Chamar no WhatsApp agora
          </a>
        </Reveal>
      </div>
    </section>
  );
}
