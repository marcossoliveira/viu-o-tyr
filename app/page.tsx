import StickyHeader from "@/components/StickyHeader";
import Hero from "@/components/Hero";
import WhoIsTyr from "@/components/WhoIsTyr";
import HowToHelp from "@/components/HowToHelp";
import Gallery from "@/components/Gallery";
import Sightings from "@/components/Sightings";
import MapEmbed from "@/components/MapEmbed";
import ContactForm from "@/components/ContactForm";
import {
  WHATSAPP_DISPLAY,
  pet,
  whatsappUrl,
} from "@/lib/data";
import {
  PiGithubLogo,
  PiGift,
  PiHeart,
  PiMapPin,
  PiPawPrint,
  PiWhatsappLogo,
} from "react-icons/pi";

export default function Home() {
  return (
    <main>
      <StickyHeader />
      <Hero />
      <WhoIsTyr />
      <HowToHelp />
      <Gallery />
      <Sightings />
      <MapEmbed />
      <ContactForm />

      <footer className="border-t border-surface-ring bg-background-subtle px-5 py-10 text-foreground sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-4xl border border-surface-ring bg-surface/90 p-5 shadow-xl shadow-black/5 backdrop-blur sm:p-8 dark:shadow-none">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-amber/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-brand-amber">
                  <PiPawPrint className="h-4 w-4" aria-hidden />
                  Viu o Týr?
                </div>
                <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  Cada pista pode trazer o Týr de volta para casa.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-muted sm:text-base">
                  Se você viu um gato parecido ou ouviu miados na região,
                  mande uma mensagem com local, horário e, se possível, uma
                  foto.
                </p>
              </div>

              <a
                href={whatsappUrl()}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-center text-base font-black text-white shadow-lg shadow-[#25D366]/20 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:opacity-95"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enviar mensagem no WhatsApp para ${WHATSAPP_DISPLAY}`}
              >
                <PiWhatsappLogo className="h-7 w-7 shrink-0" aria-hidden />
                Chamar {WHATSAPP_DISPLAY}
              </a>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl bg-background-subtle p-4 ring-1 ring-surface-ring">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <PiMapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-black text-foreground">
                    Último avistamento
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {pet.lastSeen.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-background-subtle p-4 ring-1 ring-surface-ring">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-amber/10 text-brand-amber">
                  <PiGift className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-black text-foreground">
                    Recompensa
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {pet.reward} para quem ajudar a encontrar o Týr.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-4 rounded-3xl border border-surface-ring bg-surface/70 p-5 text-sm shadow-md shadow-black/5 backdrop-blur sm:p-6 dark:shadow-none">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-3xl">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-background-subtle px-3 py-1 text-xs font-black uppercase tracking-widest text-foreground-muted ring-1 ring-surface-ring">
                  <PiGithubLogo className="h-4 w-4" aria-hidden />
                  Projeto aberto
                </div>
                <p className="font-bold text-foreground">
                  Este site também pode ajudar outras famílias.
                </p>
                <p className="mt-1 leading-6 text-foreground-muted">
                  O código está aberto no GitHub para quem quiser adaptar a
                  página, trocar as informações e criar uma busca pelo próprio
                  pet. Desenvolvido com{" "}
                  <PiHeart
                    className="inline h-4 w-4 align-[-2px] text-brand-red"
                    aria-label="amor"
                  />{" "}
                  pelo tutor do Týr, <a href="http://github.com/marcossoliveira" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-amber underline-offset-2 transition-colors hover:underline">github.com/marcossoliveira</a>
                </p>
              </div>

              <a
                href="https://github.com/marcossoliveira/viu-o-tyr"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3 font-black text-background transition hover:-translate-y-0.5 hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PiGithubLogo className="h-5 w-5" aria-hidden />
                Ver repositório
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
