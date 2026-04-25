/* eslint-disable @next/next/no-img-element -- data URL em <img> para ImageResponse (Satori) */
import { ImageResponse } from "next/og";
import {
  pet,
  REWARD,
  SITE_URL,
  traits,
  hidingSpots,
  findingSteps,
} from "@/lib/data";
import { publicImage } from "@/lib/publicImage";

export const dynamic = "force-dynamic";

const GOLD = "#fbbf24";
const MUTED = "#d4d4d8";
const SUBTLE = "#a1a1aa";
const PANEL = "#18181b";
const PANEL_RING = "#3f3f46";

function traitValue(label: string): string {
  return traits.find((t) => t.label === label)?.value ?? "";
}

function formatPhoneBR(whatsapp: string): string {
  const n = whatsapp.replace(/^55/, "");
  const ddd = n.slice(0, 2);
  const rest = n.slice(2);
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const imagePath = publicImage("/images/tyr-1.jpg");
  const imageUrl = `${origin}${imagePath}`;

  let imageSrc: string;
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      return new Response(`Failed to load photo: ${res.status}`, { status: 502 });
    }
    const buf = await res.arrayBuffer();
    imageSrc = `data:image/jpeg;base64,${Buffer.from(buf).toString("base64")}`;
  } catch {
    return new Response("Failed to fetch photo", { status: 502 });
  }

  const phone = formatPhoneBR(pet.whatsapp);
  const siteHost = SITE_URL.replace(/^https?:\/\//, "");
  const eyes = traitValue("Olhos");
  const porte = traitValue("Porte");
  const coleira = traitValue("Coleira");
  const chip = traitValue("Microchip");
  const comportamento = traitValue("Comportamento");
  const pelagem = traitValue("Pelagem");
  const spots = hidingSpots.map((h) => h.label).join(" · ");
  const stepChame =
    findingSteps.find((s) => s.label.startsWith("Chame"))?.value ?? "";
  const stepNaoCorra =
    findingSteps.find((s) => s.label.startsWith("Não corra"))?.value ?? "";
  const stepFoto =
    findingSteps.find((s) => s.label.startsWith("Tire"))?.value ?? "";
  const castrado = pet.neutered ? "Castrado" : "Não castrado";
  const dicas = [stepChame, stepNaoCorra, stepFoto].filter(Boolean).join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#09090b",
          color: "#fafafa",
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {/* — Cabeçalho — */}
        <div
          style={{
            background: "#dc2626",
            padding: "18px 40px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            GATO DESAPARECIDO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 900,
              marginTop: 2,
            }}
          >
            {pet.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 4,
              fontSize: 17,
              fontWeight: 700,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Praia de Itaparica · Vila Velha/ES
          </div>
        </div>

        {/* — Corpo: foto + painéis — */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            minHeight: 0,
            background: "#09090b",
          }}
        >
          {/* Coluna foto */}
          <div
            style={{
              width: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "28px 24px 28px 36px",
              background: "#0c0c0e",
            }}
          >
            <img
              src={imageSrc}
              alt=""
              width={452}
              height={568}
              style={{
                borderRadius: 24,
                objectFit: "cover",
                width: 452,
                height: 568,
                boxShadow: "0 24px 48px rgba(0,0,0,0.55)",
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 16,
                fontSize: 16,
                fontWeight: 700,
                color: SUBTLE,
                textAlign: "center",
                lineHeight: 1.35,
                maxWidth: 420,
              }}
            >
              {pet.species} · {pet.breed}
            </div>
          </div>

          {/* Coluna informação */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 14,
              padding: "28px 40px 28px 12px",
            }}
          >
            {/* Recompensa */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: PANEL,
                border: `1px solid ${PANEL_RING}`,
                borderRadius: 18,
                padding: "16px 18px",
                borderLeft: `5px solid ${GOLD}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 12,
                  fontWeight: 800,
                  color: GOLD,
                  letterSpacing: 2,
                }}
              >
                {REWARD.label.toUpperCase()}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 42,
                  fontWeight: 900,
                  marginTop: 2,
                  letterSpacing: -1,
                }}
              >
                {REWARD.amount}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                  fontSize: 13,
                  lineHeight: 1.4,
                  color: MUTED,
                }}
              >
                Gestos de gratidão — o Týr é da nossa família.
              </div>
            </div>

            {/* Identificação */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                background: PANEL,
                border: `1px solid ${PANEL_RING}`,
                borderRadius: 18,
                padding: "16px 18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: 2,
                  color: GOLD,
                }}
              >
                COMO É
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#fafafa",
                  lineHeight: 1.35,
                }}
              >
                {pet.age} · {pet.sex} · {castrado} · Olhos {eyes}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 15,
                  lineHeight: 1.38,
                  color: MUTED,
                }}
              >
                {porte}. {pelagem}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  lineHeight: 1.38,
                  color: SUBTLE,
                }}
              >
                Coleira: {coleira} · Microchip: {chip}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  lineHeight: 1.38,
                  color: SUBTLE,
                }}
              >
                {comportamento}
              </div>
            </div>

            {/* Onde e quando */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                background: PANEL,
                border: `1px solid ${PANEL_RING}`,
                borderRadius: 18,
                padding: "16px 18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: 2,
                  color: GOLD,
                }}
              >
                DESAPARECIDO
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#fafafa",
                }}
              >
                Desde {pet.disappearedAt}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  lineHeight: 1.38,
                  color: MUTED,
                }}
              >
                Último avistamento ({pet.lastSeen.date})
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  lineHeight: 1.38,
                  color: SUBTLE,
                }}
              >
                {pet.lastSeen.location}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 4,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: GOLD,
                }}
              >
                ONDE PROCURAR
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  lineHeight: 1.38,
                  color: MUTED,
                }}
              >
                {spots}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 4,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: GOLD,
                }}
              >
                SE O VIU
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 13,
                  lineHeight: 1.42,
                  color: MUTED,
                }}
              >
                {dicas}
              </div>
            </div>
          </div>
        </div>

        {/* — Faixa WhatsApp (destaque) — */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#128C7E",
            padding: "22px 40px 24px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 3,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            VIU O TÝR? AVISE JÁ
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 6,
              fontSize: 46,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 1,
            }}
          >
            {phone}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 4,
              fontSize: 15,
              fontWeight: 600,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            WhatsApp · mensagem ou chamada
          </div>
        </div>

        {/* — Rodapé site — */}
        <div
          style={{
            background: "#0f0f12",
            padding: "16px 36px 18px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            borderTop: "1px solid #27272a",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              fontWeight: 800,
              color: "#fafafa",
            }}
          >
            {siteHost}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 14,
              color: SUBTLE,
              textAlign: "center",
            }}
          >
            Mapa, fotos e formulário de contacto
          </div>
          {origin.replace(/^https?:\/\//, "") !== siteHost ? (
            <div
              style={{
                display: "flex",
                fontSize: 12,
                color: "#71717a",
                textAlign: "center",
              }}
            >
              {`Cópia local: ${origin.replace(/^https?:\/\//, "")}`}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1350,
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=86400",
      },
    }
  );
}
