import Hero from "@/components/Hero";
import InfoCards from "@/components/InfoCards";
import Gallery from "@/components/Gallery";
import Sightings from "@/components/Sightings";
import MapEmbed from "@/components/MapEmbed";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <InfoCards />
      <Gallery />
      <Sightings />
      <MapEmbed />
      <ContactForm />

      <footer className="bg-black text-white text-center py-6 text-sm">
        <p>
          Em caso de avistamento, ligue imediatamente:{" "}
          <a
            href="https://wa.me/5527981495862"
            className="font-bold underline hover:text-yellow-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            (27) 98149-5862
          </a>
        </p>
        <p className="mt-1 text-gray-400">Recompensa R$ 500 · Praia de Itaparica, Vila Velha/ES</p>
      </footer>
    </main>
  );
}
