import {
  PiCalendarBlank,
  PiHeart,
  PiMapPin,
  PiMoneyWavy,
  PiWarningCircle,
} from "react-icons/pi";
import Reveal from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { pet, REWARD, temperament, traits, type IconItem } from "@/lib/data";

type TileItem = IconItem & { accent: "amber" | "rose" };

const accentClasses: Record<TileItem["accent"], string> = {
  amber: "bg-brand-amber/15 text-brand-amber",
  rose: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};

const tiles: TileItem[] = [
  ...traits.map((t) => ({ ...t, accent: "amber" as const })),
  ...temperament.map((t) => ({ ...t, accent: "rose" as const })),
];

export default function WhoIsTyr() {
  return (
    <section
      className="border-t border-surface-ring bg-background-subtle py-16 px-5 sm:py-20 sm:px-6"
      id="informacoes"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-black tracking-tight text-foreground sm:mb-3 sm:text-4xl">
            Quem é o Týr
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-foreground-muted sm:mb-12 sm:text-lg">
            Tudo o que precisa para reconhecê-lo e avisar na hora.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {tiles.map(({ Icon, label, value, accent }) => (
            <RevealStaggerItem key={label}>
              <div className="flex h-full min-h-[9.5rem] flex-col items-center rounded-2xl bg-surface p-4 text-center ring-1 ring-surface-ring shadow-md shadow-black/5 transition-shadow hover:shadow-lg dark:shadow-none sm:p-5">
                <div
                  className={`mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accentClasses[accent]}`}
                >
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <p className="font-bold leading-snug text-foreground">{label}</p>
                {value ? (
                  <p className="mt-1 text-xs leading-snug text-foreground-muted sm:text-sm">
                    {value}
                  </p>
                ) : null}
              </div>
            </RevealStaggerItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-12">
          <div className="rounded-3xl bg-surface p-6 ring-1 ring-surface-ring shadow-lg shadow-black/5 sm:p-8 dark:shadow-none">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/15 text-brand-red">
                <PiWarningCircle className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-foreground">
                Desaparecimento
              </h3>
            </div>

            <ul className="space-y-4 text-foreground-muted">
              <li className="flex gap-3">
                <PiCalendarBlank
                  className="mt-0.5 h-5 w-5 shrink-0 text-foreground-muted"
                  aria-hidden
                />
                <div>
                  <p className="font-semibold text-foreground">Desapareceu em</p>
                  <p>{pet.disappearedAt}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <PiMapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-foreground-muted"
                  aria-hidden
                />
                <div>
                  <p className="font-semibold text-foreground">
                    Último avistamento
                  </p>
                  <p>{pet.lastSeen.location}</p>
                </div>
              </li>
            </ul>

            <a
              href={pet.lastSeen.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-fit text-sm font-bold text-brand-red underline decoration-2 underline-offset-4 transition-colors hover:opacity-90"
            >
              Ver no mapa →
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-6" delay={0.1}>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-amber/15 via-brand-amber/10 to-transparent p-6 text-center ring-1 ring-brand-amber/30 sm:p-10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-amber/25 text-brand-amber">
              <PiMoneyWavy className="h-7 w-7" aria-hidden />
            </div>

            <p className="text-[0.7rem] font-black uppercase tracking-[0.25em] text-brand-amber">
              {REWARD.label}
            </p>
            <p className="mt-2 text-5xl font-black tabular-nums text-foreground sm:text-6xl">
              {REWARD.amount}
            </p>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground-muted sm:text-lg">
              <PiHeart
                className="mr-1 inline-block h-5 w-5 align-text-bottom text-rose-500 dark:text-rose-400"
                aria-hidden
              />
              {REWARD.message}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
