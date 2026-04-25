export default function MapEmbed() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-black mb-10 text-center">
          Área de busca
        </h2>

        <div className="rounded-2xl overflow-hidden shadow-lg aspect-video w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3739.123!2d-40.2795!3d-20.3365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb81c2c0f4d3e5c5%3A0x1!2sPraia+de+Itaparica%2C+Vila+Velha+-+ES!5e0!3m2!1spt-BR!2sbr!4v1681900000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa da área de busca — Praia de Itaparica, Vila Velha/ES"
          />
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Praia de Itaparica, Vila Velha / ES — Se você avistou Týr nessa
          região, entre em contato imediatamente.
        </p>
      </div>
    </section>
  );
}
