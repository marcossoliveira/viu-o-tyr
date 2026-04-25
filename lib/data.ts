import { publicImage, publicVideo } from "./publicImage";

export const LAST_SIGHTING_MAPS_URL =
  "https://www.google.com/maps/place/R.+Ot%C3%A1vio+Queiroz,+27+-+Vila+Velha,+ES,+29102-260/@-20.3762612,-40.3105951,18z/data=!4m6!3m5!1s0xb83e1f8cef983f:0x6abdc412aae59783!8m2!3d-20.37637!4d-40.3102802!16s%2Fg%2F11cslg1wgr";

export const pet = {
  name: "Týr",
  species: "Gato",
  breed: "Sem raça definida (SRD)",
  color: "Rajado, pescoço e queixo brancos e barriga laranja",
  age: "5 anos",
  sex: "Macho",
  neutered: true,
  weight: "6 kg",
  disappearedAt: "17 de abril de 2026",
  disappearedSince: "17/04/2026",
  reward: "R$ 500",
  whatsapp: "5527981495862",
  lastSeen: {
    location: "Esquina da Av. Luiz Emanoel Vellozo com a R. Otávio Queiroz - Praia de Itaparica",
    date: "17/04/2026",
    mapsLink: LAST_SIGHTING_MAPS_URL,
  },
};

/** Mensagem padrão para links do WhatsApp (CTA). */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Oi! Acho que vi o Týr — gostaria de compartilhar a informação.";

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${pet.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const characteristics = [
  { label: "Pelagem", value: "Rajado, pescoço e queixo brancos e barriga laranja" },
  { label: "Olhos", value: "Amarelos/dourados" },
  { label: "Tamanho", value: "Grande, por volta de 6 kg" },
  { label: "Castrado", value: "Sim" },
  { label: "Coleira", value: "Não usava quando desapareceu" },
  { label: "Comportamento", value: "Dócil com pessoas, pode estar assustado" },
  { label: "Microchip", value: "Não" },
];

export type GalleryMediaItem = {
  id: number;
  src: string;
  alt: string;
  type: "image" | "video";
  poster?: string;
};

export const gallery: GalleryMediaItem[] = [
  {
    id: 1,
    src: publicImage("/images/tyr-1.jpg"),
    alt: "Týr atento, olhando o movimento",
    type: "image",
  },
  {
    id: 2,
    src: publicImage("/images/tyr-2.jpg"),
    alt: "Týr olhando para a câmera",
    type: "image",
  },
  {
    id: 3,
    src: publicImage("/images/tyr-3.jpg"),
    alt: "Týr descansando no sofá",
    type: "image",
  },
  {
    id: 4,
    src: publicImage("/images/tyr-4.jpg"),
    alt: "Týr dormindo",
    type: "image",
  },
  {
    id: 5,
    src: publicVideo("/videos/tyr-5.mp4"),
    alt: "Týr tomando banho — vídeo",
    type: "video",
    poster: publicImage("/images/thumb-tyr-5.png"),
  },
];

export const sightings: {
  id: number;
  date: string;
  location: string;
  description: string;
  mapsLink: string;
  image?: string;
  video?: string;
  videoPoster?: string;
}[] = [
  {
    id: 1,
    date: "17/04/2026",
    location: "R. Otávio Queiroz, 27 — Vila Velha/ES",
    description:
      "Último avistamento confirmado neste endereço. Týr foi visto correndo em direção à rua após um barulho alto.",
    mapsLink: LAST_SIGHTING_MAPS_URL,
    image: publicImage("/images/sighting-1.jpg"),
    video: publicVideo("/videos/ultimo-avistamento.mp4"),
    videoPoster: publicImage("/images/thumb-ultimo-avistamento.png"),
  },
];
