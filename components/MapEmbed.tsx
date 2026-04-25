export default function MapEmbed() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-black mb-10 text-center">
          Último avistamento no mapa
        </h2>

        <div className="rounded-2xl overflow-hidden shadow-lg aspect-video w-full">
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

        <p className="mt-4 text-center text-sm text-gray-500">
          R. Otávio Queiroz, 27 — Vila Velha / ES (último avistamento). Se você
          viu Týr por perto, entre em contato na hora.
        </p>
      </div>
    </section>
  );
}
