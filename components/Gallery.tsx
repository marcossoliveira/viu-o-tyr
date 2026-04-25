"use client";

import { useState } from "react";
import Image from "next/image";
import { gallery } from "@/lib/data";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedIds, setLoadedIds] = useState<Set<number>>(new Set());

  const markLoaded = (id: number) =>
    setLoadedIds((prev) => new Set([...prev, id]));

  return (
    <section className="bg-white py-14 px-4 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-3xl font-black text-black sm:mb-10 sm:text-4xl">
          Mídias de Týr
        </h2>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
          {gallery.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-square overflow-hidden rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-red-600"
              aria-label={
                item.type === "video"
                  ? `Abrir vídeo: ${item.alt}`
                  : `Ampliar foto: ${item.alt}`
              }
            >
              {!loadedIds.has(item.id) && (
                <div className="absolute inset-0 animate-pulse bg-neutral-200" />
              )}

              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  preload="metadata"
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-300 group-active:scale-[0.98] sm:group-hover:scale-105"
                  onLoadedMetadata={() => markLoaded(item.id)}
                />
              ) : (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-active:scale-[0.98] sm:group-hover:scale-105"
                  loading={idx === 0 ? "eager" : "lazy"}
                  onLoad={() => markLoaded(item.id)}
                  aria-hidden
                />
              )}

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/15 group-active:bg-black/25">
                {item.type === "video" ? (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white shadow-lg ring-2 ring-white/40 sm:h-16 sm:w-16">
                    <PlayIcon className="ml-1 h-7 w-7 sm:h-8 sm:w-8" />
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="h-8 w-8 opacity-0 drop-shadow transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        items={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
