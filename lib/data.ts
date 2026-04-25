export const pet = {
  name: "Týr",
  species: "Gato",
  breed: "Sem raça definida (SRD)",
  color: "Laranja e branco",
  age: "2 anos",
  sex: "Macho",
  neutered: true,
  weight: "4 kg",
  disappearedAt: "17 de abril de 2025",
  disappearedSince: "17/04/2025",
  reward: "R$ 500",
  whatsapp: "5527981495862",
  lastSeen: {
    location: "Praia de Itaparica, Vila Velha/ES",
    date: "17/04/2025",
    mapsLink:
      "https://www.google.com/maps/search/Praia+de+Itaparica,+Vila+Velha,+ES",
  },
};

export const characteristics = [
  { label: "Pelagem", value: "Laranja com manchas brancas no peito e patas" },
  { label: "Olhos", value: "Amarelos/dourados" },
  { label: "Tamanho", value: "Médio, por volta de 4 kg" },
  { label: "Castrado", value: "Sim" },
  { label: "Coleira", value: "Não usava quando desapareceu" },
  { label: "Comportamento", value: "Dócil com pessoas, pode estar assustado" },
  { label: "Microchip", value: "Não" },
];

export const gallery: {
  id: number;
  src: string;
  alt: string;
  type: "image" | "video";
  poster?: string;
}[] = [
  { id: 1, src: "/images/tyr-1.jpg", alt: "Týr descansando no sofá", type: "image" },
  { id: 2, src: "/images/tyr-2.jpg", alt: "Týr olhando para a câmera", type: "image" },
  { id: 3, src: "/images/tyr-3.jpg", alt: "Týr brincando", type: "image" },
  { id: 4, src: "/images/tyr-4.jpg", alt: "Týr dormindo", type: "image" },
];

export const sightings: {
  id: number;
  date: string;
  location: string;
  description: string;
  mapsLink: string;
  image?: string;
}[] = [
  {
    id: 1,
    date: "17/04/2025",
    location: "Praia de Itaparica — próximo à entrada principal",
    description:
      "Último avistamento confirmado. Týr foi visto correndo em direção à rua após um barulho alto.",
    mapsLink:
      "https://www.google.com/maps/search/Praia+de+Itaparica,+Vila+Velha,+ES",
    image: "/images/sighting-1.jpg",
  },
];
