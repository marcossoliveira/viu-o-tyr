import type { IconType } from "react-icons";
import {
  PiArmchair,
  PiCamera,
  PiCar,
  PiChatCircleText,
  PiCheckCircle,
  PiCircleDashed,
  PiCpu,
  PiEye,
  PiHandPalm,
  PiHeart,
  PiHouseLine,
  PiMagnifyingGlass,
  PiPawPrint,
  PiRuler,
  PiSmiley,
  PiTree,
  PiWarningCircle,
  PiWhatsappLogo,
} from "react-icons/pi";
import { publicImage, publicVideo } from "./publicImage";

/** URL pública do site (OG, poster, fetch absoluto). Sem barra final. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://viu-o-tyr.vercel.app"
).replace(/\/$/, "");

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

/** Texto da recompensa simbólica (UI emocional). */
export const REWARD = {
  amount: pet.reward,
  label: "Recompensa simbólica",
  message:
    "Týr é da nossa família. A recompensa é apenas um gesto de gratidão — ele vale infinitamente mais para nós do que qualquer dinheiro do mundo.",
} as const;

/** Mensagem padrão para links do WhatsApp (CTA). */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Oi! Acho que vi o Týr — gostaria de compartilhar a informação.";

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${pet.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type IconItem = {
  Icon: IconType;
  label: string;
  value?: string;
};

/** Características físicas e identificação (ícones Phosphor). */
export const traits: IconItem[] = [
  {
    Icon: PiPawPrint,
    label: "Pelagem",
    value: "Rajado, pescoço e queixo brancos, barriga laranja",
  },
  { Icon: PiEye, label: "Olhos", value: "Amarelos/dourados" },
  { Icon: PiRuler, label: "Porte", value: "Grande, por volta de 6 kg" },
  { Icon: PiCheckCircle, label: "Castrado", value: "Sim" },
  { Icon: PiCircleDashed, label: "Coleira", value: "Não usava quando desapareceu" },
  {
    Icon: PiSmiley,
    label: "Comportamento",
    value: "Dócil com pessoas, pode estar assustado",
  },
  { Icon: PiCpu, label: "Microchip", value: "Não" },
];

/** Compat: formato antigo `{ label, value }` (ex.: imports legados). */
export const characteristics = traits.map((t) => ({
  label: t.label,
  value: t.value ?? "",
}));

export const temperament: IconItem[] = [
  {
    Icon: PiHeart,
    label: "Muito dócil",
    value: "Adora carinho, especialmente de quem conhece",
  },
  {
    Icon: PiWarningCircle,
    label: "Pode estar assustado",
    value: "Nunca tinha saído à rua antes",
  },
  {
    Icon: PiHouseLine,
    label: "É um gato de casa",
    value: "Provavelmente está escondido perto",
  },
];

export const hidingSpots: IconItem[] = [
  { Icon: PiCar, label: "Embaixo de carros" },
  { Icon: PiTree, label: "Matos e jardins" },
  { Icon: PiHouseLine, label: "Quintais e garagens" },
  { Icon: PiArmchair, label: "Embaixo de móveis" },
];

export const findingSteps: IconItem[] = [
  {
    Icon: PiMagnifyingGlass,
    label: "Olhe ao redor com calma",
    value: "Especialmente em locais escuros e baixos",
  },
  {
    Icon: PiChatCircleText,
    label: "Chame em tom calmo",
    value: "“Týr, Týr” — ele responde a vozes calmas",
  },
  {
    Icon: PiHandPalm,
    label: "Não corra atrás",
    value: "Pode assustá-lo e fazer fugir mais longe",
  },
  {
    Icon: PiCamera,
    label: "Tire uma foto se possível",
    value: "Confirma se é o Týr antes de contatar",
  },
  {
    Icon: PiWhatsappLogo,
    label: "Avise imediatamente",
    value: "Mande WhatsApp com o local exato",
  },
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
    location: "Esquina da Av. Luiz Emanoel Vellozo com a R. Otávio Queiroz - Praia de Itaparica",
    description:
      "Último avistamento confirmado neste endereço. Ele estava assustado e miando muito. Só vimos esse vídeo no dia posterior e ao chegar no local não o encontramos.",
    mapsLink: LAST_SIGHTING_MAPS_URL,
    image: publicImage("/images/sighting-1.jpg"),
    video: publicVideo("/videos/ultimo-avistamento.mp4"),
    videoPoster: publicImage("/images/thumb-ultimo-avistamento.png"),
  },
];
