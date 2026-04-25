"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface LightboxItem {
  src: string;
  alt: string;
  type: "image" | "video";
}

interface LightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-full max-w-4xl bg-transparent p-0 backdrop:bg-black/80"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-2xl font-bold"
        >
          ×
        </button>

        {item.type === "video" ? (
          <video
            src={item.src}
            controls
            autoPlay
            className="max-h-[80vh] max-w-full rounded-xl shadow-2xl"
          />
        ) : (
          <div className="relative max-h-[80vh] max-w-full w-full aspect-video">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain rounded-xl shadow-2xl"
              sizes="100vw"
            />
          </div>
        )}

        {item.alt && (
          <p className="mt-4 text-white/80 text-sm text-center max-w-lg">
            {item.alt}
          </p>
        )}
      </div>
    </dialog>
  );
}
