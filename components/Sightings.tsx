import Image from "next/image";
import { sightings } from "@/lib/data";

export default function Sightings() {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-white to-neutral-100 py-14 px-4 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-3xl font-black text-neutral-900 sm:text-4xl">
          Avistamentos
        </h2>
        <p className="mb-10 text-center text-sm text-neutral-600 sm:text-base">
          Registros confirmados — se você o viu, fale conosco na hora.
        </p>

        {sightings.length === 0 ? (
          <p className="text-center text-neutral-500">
            Nenhum avistamento registrado ainda.
          </p>
        ) : (
          <ul className="flex flex-col gap-12">
            {sightings.map((s) => (
              <li key={s.id}>
                <article className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-lg shadow-neutral-900/5 ring-1 ring-black/5">
                  {s.video ? (
                    <div className="border-b border-neutral-100 bg-neutral-950 px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
                      <p className="mb-3 text-center text-[0.65rem] font-black uppercase tracking-[0.2em] text-amber-400 sm:text-xs">
                        Último avistamento em vídeo
                      </p>
                      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl ring-2 ring-amber-400/90 ring-offset-2 ring-offset-neutral-950">
                        <video
                          src={s.video}
                          poster={s.videoPoster ?? s.image}
                          controls
                          playsInline
                          preload="metadata"
                          className="aspect-video max-h-[min(70vh,520px)] w-full bg-black object-contain"
                        />
                      </div>
                      <p className="mt-3 text-center text-xs text-neutral-400">
                        Ative o som se precisar de áudio.
                      </p>
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-5 p-5 sm:p-7">
                    {!s.video && s.image ? (
                      <div className="relative mx-auto aspect-[4/3] w-full max-w-xs shrink-0 overflow-hidden rounded-2xl sm:mx-0 sm:max-w-md">
                        <Image
                          src={s.image}
                          alt={`Registro em ${s.location}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 448px"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div className="min-w-0 space-y-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
                        <span className="inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-600">
                          {s.date}
                        </span>
                        <h3 className="text-lg font-black leading-snug text-neutral-900 sm:text-xl">
                          {s.location}
                        </h3>
                      </div>

                      <p className="text-base leading-relaxed text-neutral-700">
                        {s.description}
                      </p>

                      <a
                        href={s.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 py-3.5 text-center text-sm font-black text-neutral-950 shadow-md transition-colors hover:bg-amber-400 active:bg-amber-600 sm:w-auto sm:justify-start sm:px-6"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 shrink-0"
                          aria-hidden
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.07-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.079 3.14-4.65 3.14-7.327 0-4.697-3.817-8.5-8.5-8.5S3.5 7.303 3.5 12c0 2.677 1.196 5.248 3.14 7.327a19.58 19.58 0 0 0 2.683 2.282 16.975 16.975 0 0 0 1.144.742ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Abrir no mapa
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
