import { pet, characteristics } from "@/lib/data";

export default function InfoCards() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-black mb-10 text-center">
          Informações
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card: Desaparecimento */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-600">
            <h3 className="font-black text-lg text-red-600 mb-4 uppercase tracking-wide">
              Desaparecimento
            </h3>
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-semibold">Data:</span>{" "}
              {pet.disappearedAt}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-semibold">Desde:</span>{" "}
              {pet.disappearedSince}
            </p>
          </div>

          {/* Card: Último avistamento */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-yellow-400">
            <h3 className="font-black text-lg text-yellow-600 mb-4 uppercase tracking-wide">
              Último avistamento
            </h3>
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-semibold">Local:</span>{" "}
              {pet.lastSeen.location}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-semibold">Data:</span>{" "}
              {pet.lastSeen.date}
            </p>
            <a
              href={pet.lastSeen.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-semibold text-yellow-600 hover:text-yellow-700 underline underline-offset-2 transition-colors"
            >
              Ver no mapa →
            </a>
          </div>

          {/* Card: Características */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-black">
            <h3 className="font-black text-lg text-black mb-4 uppercase tracking-wide">
              Características
            </h3>
            <ul className="space-y-1">
              {characteristics.map((c) => (
                <li key={c.label} className="text-gray-700 text-sm">
                  <span className="font-semibold">{c.label}:</span> {c.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
