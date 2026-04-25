import { pet, characteristics } from "@/lib/data";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import Reveal from "@/components/motion/Reveal";

export default function InfoCards() {
  return (
    <section
      className="border-t border-surface-ring bg-background-subtle py-16 px-5 sm:py-20 sm:px-6"
      id="informacoes"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-black tracking-tight text-foreground sm:mb-3 sm:text-4xl">
            Informações
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-foreground-muted sm:mb-12 sm:text-lg">
            Tudo o que precisa para reconhecer o Týr e avisar na hora.
          </p>
        </Reveal>

        <RevealStagger className="grid gap-5 md:grid-cols-3 md:gap-6">
          <RevealStaggerItem>
            <article className="flex h-full flex-col rounded-2xl bg-surface p-6 ring-1 ring-surface-ring shadow-lg shadow-black/5 transition-shadow duration-200 hover:shadow-xl dark:shadow-none">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-foreground">
                Desaparecimento
              </h3>
              <p className="mt-3 text-sm text-foreground-muted">
                <span className="font-semibold text-foreground">Data: </span>
                {pet.disappearedAt}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                <span className="font-semibold text-foreground">Desde: </span>
                {pet.disappearedSince}
              </p>
            </article>
          </RevealStaggerItem>

          <RevealStaggerItem>
            <article className="flex h-full flex-col rounded-2xl bg-surface p-6 ring-1 ring-surface-ring shadow-lg shadow-black/5 transition-shadow duration-200 hover:shadow-xl dark:shadow-none">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-amber/15 text-amber-700 dark:text-brand-amber">
                <MapPinIcon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-foreground">
                Último avistamento
              </h3>
              <p className="mt-3 text-sm text-foreground-muted">
                <span className="font-semibold text-foreground">Local: </span>
                {pet.lastSeen.location}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                <span className="font-semibold text-foreground">Data: </span>
                {pet.lastSeen.date}
              </p>
              <a
                href={pet.lastSeen.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-fit text-sm font-bold text-brand-red underline decoration-2 underline-offset-4 transition-colors hover:opacity-90"
              >
                Ver no mapa →
              </a>
            </article>
          </RevealStaggerItem>

          <RevealStaggerItem>
            <article className="flex h-full flex-col rounded-2xl bg-surface p-6 ring-1 ring-surface-ring shadow-lg shadow-black/5 transition-shadow duration-200 hover:shadow-xl dark:shadow-none md:col-span-1">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-foreground">
                <IdIcon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-foreground">
                Características
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
                {characteristics.map((c) => (
                  <li key={c.label}>
                    <span className="font-semibold text-foreground">{c.label}: </span>
                    {c.value}
                  </li>
                ))}
              </ul>
            </article>
          </RevealStaggerItem>
        </RevealStagger>
      </div>
    </section>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5"
      />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.125-7.5 10.5-7.5 10.5S4.5 17.625 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

function IdIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
      />
    </svg>
  );
}
