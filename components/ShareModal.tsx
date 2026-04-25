"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PiImage, PiPrinter, PiShareNetwork, PiX } from "react-icons/pi";

const SHARE_TITLE = "Você viu o Týr? | Gato perdido | Praia de Itaparica, Vila Velha/ES";
const SHARE_TEXT =
  "Týr desapareceu na Praia de Itaparica, Vila Velha/ES. Se você o viu, ajude a espalhar ou fale no WhatsApp do site.";

type ShareModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ShareModal({ open, onClose }: ShareModalProps) {
  const reduced = useReducedMotion() === true;
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const handleShareLink = async () => {
    const url = shareUrl || `${window.location.origin}/`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url,
        });
        onClose();
      } else {
        await navigator.clipboard.writeText(`${SHARE_TEXT}\n\n${url}`);
        showToast("Link copiado para a área de transferência.");
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(`${SHARE_TEXT}\n\n${url}`);
        showToast("Link copiado para a área de transferência.");
      } catch {
        showToast("Não foi possível copiar. Copie o endereço manualmente.");
      }
    }
  };

  const handleDownloadImage = async () => {
    try {
      const res = await fetch("/api/poster");
      if (!res.ok) throw new Error("poster");
      const blob = await res.blob();
      const file = new File([blob], "folheto-tyr.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: SHARE_TITLE });
        onClose();
        return;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "folheto-tyr.png";
      a.rel = "noopener";
      a.click();
      URL.revokeObjectURL(url);
      showToast("Imagem transferida — verifique as transferências.");
    } catch {
      showToast("Erro ao gerar a imagem. Tente de novo.");
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const res = await fetch("/api/poster/pdf");
      if (!res.ok) throw new Error("pdf");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "folheto-tyr.pdf";
      a.rel = "noopener";
      a.click();
      URL.revokeObjectURL(url);
      showToast("PDF transferido — pronto para imprimir.");
    } catch {
      showToast("Erro ao gerar o PDF. Tente de novo.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="share-backdrop"
          role="presentation"
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:items-center sm:p-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
            className="relative w-full max-w-md rounded-3xl bg-surface p-6 shadow-2xl ring-1 ring-surface-ring"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 16 }}
            transition={{ duration: reduced ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-foreground-muted transition hover:bg-background-subtle hover:text-foreground"
              aria-label="Fechar"
            >
              <PiX className="h-5 w-5" />
            </button>

            <div className="mb-4 flex items-center gap-3 pr-10">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                <PiShareNetwork className="h-6 w-6" aria-hidden />
              </span>
              <h2
                id="share-modal-title"
                className="text-xl font-black tracking-tight text-foreground"
              >
                Espalhar a notícia
              </h2>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-foreground-muted">
              Cada partilha aumenta a hipótese de alguém reconhecer o Týr.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => void handleShareLink()}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-red px-4 py-3 text-base font-black text-white shadow-md transition hover:opacity-95"
              >
                <PiShareNetwork className="h-5 w-5 shrink-0" aria-hidden />
                Compartilhar link
              </button>
              <button
                type="button"
                onClick={() => void handleDownloadImage()}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-surface-ring bg-background px-4 py-3 text-base font-bold text-foreground transition hover:bg-background-subtle"
              >
                <PiImage className="h-5 w-5 shrink-0 text-foreground-muted" aria-hidden />
                Baixar imagem do folheto
              </button>
              <button
                type="button"
                onClick={() => void handleDownloadPdf()}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-surface-ring bg-background px-4 py-3 text-base font-bold text-foreground transition hover:bg-background-subtle"
              >
                <PiPrinter className="h-5 w-5 shrink-0 text-foreground-muted" aria-hidden />
                Baixar PDF para imprimir
              </button>
            </div>
          </motion.div>

          {toast ? (
            <div
              role="status"
              className="pointer-events-none fixed bottom-[max(6rem,env(safe-area-inset-bottom))] left-1/2 z-[110] w-[min(100%,22rem)] -translate-x-1/2 px-4"
            >
              <div className="rounded-xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background shadow-lg">
                {toast}
              </div>
            </div>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
