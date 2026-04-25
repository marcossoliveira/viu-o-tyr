"use client";

import { useState } from "react";
import Image from "next/image";
import { gallery } from "@/lib/data";
import Lightbox from "./Lightbox";

type GalleryItem = (typeof gallery)[number];

export default function Gallery() {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [loadedIds, setLoadedIds] = useState<Set<number>>(new Set());

  const markLoaded = (id: number) =>
    setLoadedIds((prev) => new Set([...prev, id]));

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-black mb-10 text-center">
          Fotos de Týr
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="relative aspect-square rounded-xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-red-600 group"
              aria-label={`Ampliar: ${item.alt}`}
            >
              {/* Skeleton */}
              {!loadedIds.has(item.id) && (
                <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
              )}

              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  preload="metadata"
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onLoadedMetadata={() => markLoaded(item.id)}
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading={idx === 0 ? "eager" : "lazy"}
                  onLoad={() => markLoaded(item.id)}
                />
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </section>
  );
}
