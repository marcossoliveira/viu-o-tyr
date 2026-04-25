import StickyHeader from "@/components/StickyHeader";
import Hero from "@/components/Hero";
import InfoCards from "@/components/InfoCards";
import Gallery from "@/components/Gallery";
import Sightings from "@/components/Sightings";
import MapEmbed from "@/components/MapEmbed";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
      <StickyHeader />
      <Hero />
      <InfoCards />
      <Gallery />
      <Sightings />
      <MapEmbed />
      <ContactForm />

      <footer className="border-t border-surface-ring bg-surface py-8 text-center text-sm text-foreground">
        <p>
          Em caso de avistamento, fale imediatamente:{" "}
          <a
            href="https://wa.me/5527981495862"
            className="font-bold text-brand-amber underline-offset-2 transition-colors hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            (27) 98149-5862
          </a>
        </p>
        <p className="mt-1 text-foreground-muted">
          Recompensa R$ 500 · Praia de Itaparica, Vila Velha/ES
        </p>
      </footer>
    </main>
  );
}
