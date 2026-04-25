"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { GalleryMediaItem } from "@/lib/data";

interface LightboxProps {
  items: GalleryMediaItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  const count = items.length;
  const safeIndex =
    index !== null ? Math.min(Math.max(index, 0), count - 1) : null;
  const item = safeIndex !== null ? items[safeIndex] : null;

  const goPrev = useCallback(() => {
    if (safeIndex === null || count < 2) return;
    onIndexChange(safeIndex === 0 ? count - 1 : safeIndex - 1);
  }, [count, onIndexChange, safeIndex]);

  const goNext = useCallback(() => {
    if (safeIndex === null || count < 2) return;
    onIndexChange(safeIndex === count - 1 ? 0 : safeIndex + 1);
  }, [count, onIndexChange, safeIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (safeIndex !== null) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [safeIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || safeIndex === null) return;
    dialog.querySelectorAll("video").forEach((v) => {
      v.pause();
    });
  }, [safeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (safeIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onClose, safeIndex]);

  if (safeIndex === null || !item) return null;

  const labelPrev = "Mídia anterior";
  const labelNext = "Mídia seguinte";

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/85"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex h-[100dvh] flex-col bg-neutral-950/95 text-white">
        <header
          className="flex shrink-0 justify-end px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-12 min-w-12 items-center justify-center rounded-full bg-white/15 text-2xl font-bold leading-none transition-colors hover:bg-white/25 active:bg-white/30"
          >
            ×
          </button>
        </header>

        <div
          className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-3 pb-2"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const endX = e.changedTouches[0]?.clientX;
            if (endX === undefined) return;
            const dx = endX - touchStartX.current;
            touchStartX.current = null;
            if (dx > 56) goPrev();
            else if (dx < -56) goNext();
          }}
        >
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label={labelPrev}
                className="absolute left-1 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 min-[480px]:flex lg:left-4 lg:h-16 lg:w-16"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label={labelNext}
                className="absolute right-1 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 min-[480px]:flex lg:right-4 lg:h-16 lg:w-16"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div className="flex max-h-full w-full max-w-5xl flex-col items-center justify-center gap-3">
            {item.type === "video" ? (
              <video
                key={item.id}
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                className="max-h-[min(68dvh,85vw)] w-full rounded-xl shadow-2xl"
              />
            ) : (
              <div className="relative h-[min(68dvh,85vw)] w-full max-w-5xl">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain object-center drop-shadow-2xl"
                  sizes="100vw"
                />
              </div>
            )}

            {item.alt ? (
              <p className="line-clamp-3 max-w-prose px-2 text-center text-sm text-white/75">
                {item.alt}
              </p>
            ) : null}
          </div>
        </div>

        {count > 1 && (
          <footer
            className="shrink-0 border-t border-white/10 bg-gradient-to-t from-black/80 to-black/40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md min-[480px]:hidden"
          >
            <div className="mx-auto flex max-w-md items-center justify-between gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label={labelPrev}
                className="flex h-14 min-w-14 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25 active:bg-white/30"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <span className="min-w-[4.5rem] text-center text-sm font-semibold tabular-nums text-white/90">
                {safeIndex + 1} / {count}
              </span>
              <button
                type="button"
                onClick={goNext}
                aria-label={labelNext}
                className="flex h-14 min-w-14 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25 active:bg-white/30"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>
          </footer>
        )}

        {count > 1 && (
          <div className="hidden shrink-0 border-t border-white/10 py-3 text-center text-sm font-medium text-white/70 min-[480px]:block pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            {safeIndex + 1} de {count} · deslize para o lado ou use as setas
          </div>
        )}
      </div>
    </dialog>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}
