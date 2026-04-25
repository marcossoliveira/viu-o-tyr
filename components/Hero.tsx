import Image from "next/image";
import { pet } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col bg-white">
      {/* Top bar */}
      <div className="bg-red-600 py-3 px-4 text-center">
        <p className="text-white font-black text-lg md:text-2xl tracking-widest uppercase">
          ⚠ GATO DESAPARECIDO ⚠
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto w-full px-4 py-10">
        {/* Text side */}
        <div className="flex-1 flex flex-col gap-6 items-start">
          <h1 className="font-black text-5xl md:text-7xl text-black leading-tight">
            GATO PERDIDO
            <br />
            <span className="text-red-600">Týr</span>
          </h1>

          <div className="flex flex-wrap gap-3">
            <span className="inline-block bg-yellow-400 text-black font-black text-xl md:text-2xl px-5 py-2 rounded-full shadow">
              RECOMPENSA {pet.reward}
            </span>
          </div>

          <ul className="text-base md:text-lg text-gray-800 space-y-1">
            <li>
              <span className="font-semibold">Desapareceu em:</span>{" "}
              {pet.disappearedAt}
            </li>
            <li>
              <span className="font-semibold">Último avistamento:</span>{" "}
              {pet.lastSeen.location}
            </li>
            <li>
              <span className="font-semibold">Raça:</span> {pet.breed}
            </li>
            <li>
              <span className="font-semibold">Cor:</span> {pet.color}
            </li>
            <li>
              <span className="font-semibold">Idade:</span> {pet.age} •{" "}
              <span className="font-semibold">Sexo:</span> {pet.sex} •{" "}
              <span className="font-semibold">Castrado:</span>{" "}
              {pet.neutered ? "Sim" : "Não"}
            </li>
          </ul>

          <a
            href={`https://wa.me/${pet.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black text-lg md:text-xl px-8 py-4 rounded-2xl shadow-lg transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="w-6 h-6 shrink-0"
              aria-hidden="true"
            >
              <path d="M16.003 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.617 4.64 1.787 6.653L2.667 29.333l6.88-1.76A13.28 13.28 0 0 0 16.003 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.003 2.667Zm0 24A10.613 10.613 0 0 1 10.4 25.12l-.373-.24-3.867.987 1.013-3.747-.267-.387A10.587 10.587 0 0 1 5.333 16c0-5.893 4.8-10.667 10.667-10.667S26.667 10.107 26.667 16 21.893 26.667 16.003 26.667Zm5.84-7.973c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.506-.16-.72.16-.213.32-.827 1.04-.987 1.227-.16.186-.32.213-.64.053-.32-.16-1.36-.5-2.587-1.6-.96-.853-1.6-1.907-1.787-2.227-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.186.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.267-.627-.533-.533-.72-.547H11.7c-.213 0-.56.08-.853.4S9.76 11.84 9.76 13.387c0 1.546 1.12 3.04 1.28 3.253.16.213 2.213 3.373 5.36 4.72.747.32 1.333.507 1.787.653.747.24 1.44.213 1.973.133.6-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.28-.213-.6-.373Z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>

        {/* Photo side */}
        <div className="flex-1 flex justify-center w-full max-w-md">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-red-600">
            <Image
              src="/images/tyr-1.jpg"
              alt="Foto de Týr — gato laranja perdido na Praia de Itaparica"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
