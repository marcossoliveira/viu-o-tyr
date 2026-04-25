import Image from "next/image";
import { sightings } from "@/lib/data";

export default function Sightings() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-black mb-10 text-center">
          Avistamentos
        </h2>

        {sightings.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum avistamento registrado ainda.
          </p>
        ) : (
          <ul className="space-y-6">
            {sightings.map((s) => (
              <li
                key={s.id}
                className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-5 border-l-4 border-yellow-400"
              >
                {s.image && (
                  <div className="relative w-full md:w-36 aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={s.image}
                      alt={`Avistamento em ${s.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 150px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="text-sm font-semibold text-gray-500">
                      {s.date}
                    </span>
                    <span className="text-sm font-bold text-black">
                      {s.location}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {s.description}
                  </p>
                  <a
                    href={s.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1 text-sm font-semibold text-yellow-600 hover:text-yellow-700 transition-colors w-fit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.07-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.079 3.14-4.65 3.14-7.327 0-4.697-3.817-8.5-8.5-8.5S3.5 7.303 3.5 12c0 2.677 1.196 5.248 3.14 7.327a19.58 19.58 0 0 0 2.683 2.282 16.975 16.975 0 0 0 1.144.742ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ver no mapa
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
