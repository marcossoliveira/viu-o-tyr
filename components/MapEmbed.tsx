import Reveal from "@/components/motion/Reveal";
import { pet } from "@/lib/data";

export default function MapEmbed() {
  return (
    <section className="border-t border-surface-ring bg-background-subtle py-16 px-5 sm:px-6" id="mapa">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-black text-foreground sm:text-4xl">
            Último avistamento no mapa
          </h2>
          <p className="mb-10 text-center text-foreground-muted sm:text-base">
            {pet.lastSeen.location} — ponto aproximado.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-surface-ring shadow-2xl shadow-black/10 dark:ring-white/10">
            <iframe
              src="https://www.google.com/maps?q=-20.37637,-40.3102802&hl=pt-BR&z=18&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa — último avistamento: R. Otávio Queiroz, 27, Vila Velha/ES"
            />
          </div>
        </Reveal>

        <p className="mt-4 text-center text-sm text-foreground-muted">
          R. Otávio Queiroz, 27 — Vila Velha / ES (último avistamento). Se você
          viu Týr por perto, entre em contato na hora.
        </p>
      </div>
    </section>
  );
}
