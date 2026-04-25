import StickyHeader from "@/components/StickyHeader";
import Hero from "@/components/Hero";
import WhoIsTyr from "@/components/WhoIsTyr";
import HowToHelp from "@/components/HowToHelp";
import Gallery from "@/components/Gallery";
import Sightings from "@/components/Sightings";
import MapEmbed from "@/components/MapEmbed";
import ContactForm from "@/components/ContactForm";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/data";

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

      <footer className="border-t border-surface-ring bg-surface py-8 text-center text-sm text-foreground">
        <p>
          Em caso de avistamento, fale imediatamente:{" "}
          <a
            href={whatsappUrl()}
            className="font-bold text-brand-amber underline-offset-2 transition-colors hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {WHATSAPP_DISPLAY}
          </a>
        </p>
        <p className="mt-1 text-foreground-muted">
          Recompensa R$ 500 · Praia de Itaparica, Vila Velha/ES
        </p>
      </footer>
    </main>
  );
}
