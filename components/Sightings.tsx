import Image from "next/image";
import { sightings } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";

function MapIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.07-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.079 3.14-4.65 3.14-7.327 0-4.697-3.817-8.5-8.5-8.5S3.5 7.303 3.5 12c0 2.677 1.196 5.248 3.14 7.327a19.58 19.58 0 0 0 2.683 2.282 16.975 16.975 0 0 0 1.144.742ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Sightings() {
  return (
    <section
      className="border-t border-surface-ring bg-gradient-to-b from-background via-background to-background-subtle py-14 px-5 sm:py-20 sm:px-6"
      id="avistamentos"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Avistamentos
          </h2>
          <p className="mb-10 text-center text-sm text-foreground-muted sm:mb-12 sm:text-base">
            Registros confirmados — se você o viu, fale conosco na hora.
          </p>
        </Reveal>

        {sightings.length === 0 ? (
          <p className="text-center text-foreground-muted">
            Nenhum avistamento registrado ainda.
          </p>
        ) : (
          <ul className="flex flex-col gap-10 sm:gap-12">
            {sightings.map((s) => (
              <li key={s.id}>
                <Reveal>
                  <article className="overflow-hidden rounded-2xl bg-surface ring-1 ring-surface-ring">
                    {s.video ? (
                      <div className="bg-black">
                        <video
                          src={s.video}
                          poster={s.videoPoster ?? s.image}
                          controls
                          playsInline
                          preload="metadata"
                          className="aspect-video max-h-[min(62vh,440px)] w-full object-contain"
                        />
                        <p className="border-t border-white/10 px-4 py-2 text-center text-[11px] leading-snug text-neutral-500">
                          Ative o som se precisar de áudio.
                        </p>
                      </div>
                    ) : null}

                    {!s.video && s.image ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={s.image}
                          alt={`Registro em ${s.location}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 672px"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div className="space-y-4 p-5 sm:p-6 sm:space-y-5">
                      <header className="space-y-1">
                        <p className="text-xs font-medium text-foreground-muted">
                          {s.date}
                        </p>
                        <h3 className="text-pretty text-lg font-bold leading-snug text-foreground sm:text-xl">
                          {s.location}
                        </h3>
                      </header>

                      <p className="text-pretty text-sm leading-relaxed text-foreground-muted sm:text-base">
                        {s.description}
                      </p>

                      <a
                        href={s.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-surface-ring bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-background-subtle sm:w-auto"
                      >
                        <MapIcon className="h-4 w-4 shrink-0 text-foreground-muted" />
                        Abrir no mapa
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
