import { NextRequest, NextResponse } from "next/server";

/** Discord field value max is 1024; stay under to leave margin for markdown. */
const MAX_FIELD = 1000;
const MAX_TITLE = 200;

const COLOR_HUMAN = 0x4c9a70;
const COLOR_BOT = 0x6b7280;

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

/**
 * UAs that look like crawlers, preview fetchers, or headless (case-insensitive).
 * Used when a client somehow POSTs with a bot-like UA; human browsers rarely match.
 */
const BOT_RE =
  /(googlebot|adsbot|mediapartners|bingbot|slurp|duckduck|baiduspider|yandex|facebot|facebookexternalhit|twitterbot|linkedinbot|pinterest|embedly|tumblr|telegrambot|discourse|discordbot|applebot|ia_archiver|lighthouse|headless|puppeteer|prerender|httppreview|preview\/|crawl(er|ing)|scraper|curl\/|wget\/)|whatsapp\/|slackbot\/|yandex(?!browser)/i;

function isBot(userAgent: string) {
  return !userAgent ? false : BOT_RE.test(userAgent);
}

function firstForwardedIp(s: string | null): string | null {
  if (!s) return null;
  const p = s.split(",")[0]?.trim();
  return p || null;
}

function getClientIP(req: NextRequest) {
  const h = req.headers;
  return (
    firstForwardedIp(h.get("x-forwarded-for")) ||
    h.get("x-real-ip") ||
    firstForwardedIp(h.get("x-vercel-forwarded-for")) ||
    null
  );
}

type ClientPayload = {
  language?: string;
  languages?: string;
  timeZone?: string;
  screenW?: number;
  screenH?: number;
  innerW?: number;
  innerH?: number;
  dpr?: number;
  platform?: string;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
  colorScheme?: string;
  coarsePointer?: boolean;
  href?: string;
  pathname?: string;
  documentReferrer?: string;
};

function orDash(s: string | null | undefined) {
  if (s == null || s === "") return "—";
  return s;
}

function buildLocationLine(
  city: string | null,
  region: string | null,
  country: string | null,
  lat: string | null,
  lng: string | null
) {
  const line = [city, region, country]
    .filter((x) => x && x.length > 0)
    .join(", ");
  if (lat && lng) {
    const a = parseFloat(lat);
    const b = parseFloat(lng);
    if (Number.isFinite(a) && Number.isFinite(b)) {
      const mapUrl = `https://www.google.com/maps?q=${a},${b}`;
      if (line) {
        return `[${truncate(line, 800)}](${mapUrl})`;
      }
      return `[${a.toFixed(4)}, ${b.toFixed(4)}](${mapUrl})`;
    }
  }
  if (line) return truncate(line, MAX_FIELD);
  return "—";
}

function buildHumanEmbed(
  body: ClientPayload,
  options: {
    ip: string | null;
    city: string | null;
    region: string | null;
    country: string | null;
    vercelTz: string | null;
    lat: string | null;
    lng: string | null;
    userAgent: string;
    acceptLanguage: string | null;
    referer: string | null;
    host: string | null;
  }
) {
  const { ip, userAgent, acceptLanguage, referer, host, vercelTz, lat, lng, city, region, country } =
    options;
  const timeZone = body.timeZone || vercelTz || "—";
  const acceptLang = acceptLanguage && acceptLanguage.length > 0 ? acceptLanguage : "—";
  const langs = body.languages
    ? truncate(String(body.languages), MAX_FIELD)
    : "—";
  const lang = body.language ? body.language : "—";

  const w = body.screenW;
  const h = body.screenH;
  const screenStr =
    typeof w === "number" && typeof h === "number" ? `${w}×${h}` : "—";
  const vpW = body.innerW;
  const vpH = body.innerH;
  const vpStr =
    typeof vpW === "number" && typeof vpH === "number" ? `${vpW}×${vpH}` : "—";
  const dprStr =
    typeof body.dpr === "number" && Number.isFinite(body.dpr) ? String(body.dpr) : "—";
  const telaVp = [screenStr, `vp ${vpStr}`, `dpr ${dprStr}`].join(" · ");

  const cores = body.hardwareConcurrency;
  const mem = body.deviceMemory;
  const platformParts: string[] = [];
  if (body.platform) platformParts.push(String(body.platform));
  if (typeof cores === "number") platformParts.push(`${cores} cores`);
  if (typeof mem === "number") platformParts.push(`${mem} GiB RAM`);
  const plat = truncate(
    platformParts.length > 0 ? platformParts.join(" · ") : "—",
    MAX_FIELD
  );

  const c = body.connection;
  const conn = c
    ? [
        c.effectiveType,
        c.downlink != null ? `↓${c.downlink}Mb/s` : null,
        c.rtt != null ? `rtt${c.rtt}ms` : null,
        c.saveData ? "saveData" : null,
      ]
        .filter(Boolean)
        .join(" · ") || "—"
    : "—";

  const local = buildLocationLine(city, region, country, lat, lng);

  const ref = orDash(referer);
  const url = orDash(body.href);
  const refDoc = orDash(body.documentReferrer);

  return {
    title: truncate("Visita no site", MAX_TITLE),
    color: COLOR_HUMAN,
    fields: [
      { name: "IP", value: truncate(orDash(ip), MAX_FIELD), inline: true },
      { name: "Local", value: local, inline: true },
      { name: "Timezone", value: truncate(String(timeZone), MAX_FIELD), inline: true },
      { name: "Idioma", value: truncate(lang, MAX_FIELD), inline: true },
      { name: "Accept-Lang", value: truncate(acceptLang, MAX_FIELD), inline: true },
      { name: "Languages (navigator)", value: truncate(langs, MAX_FIELD) },
      { name: "Tela / Viewport", value: truncate(telaVp, MAX_FIELD) },
      { name: "Plataforma", value: plat, inline: true },
      { name: "Tema", value: orDash(body.colorScheme), inline: true },
      { name: "Toque (pointer coarse)", value: body.coarsePointer === true ? "sim" : "não", inline: true },
      { name: "Conexão (NetworkInformation)", value: truncate(conn, MAX_FIELD) },
      { name: "Request Referer", value: truncate(ref, MAX_FIELD) },
      { name: "Document referrer", value: truncate(refDoc, MAX_FIELD) },
      { name: "Host (Host header)", value: truncate(orDash(host), MAX_FIELD) },
      { name: "Caminho", value: truncate(orDash(body.pathname), MAX_FIELD) },
      { name: "URL (cliente)", value: truncate(url, MAX_FIELD) },
      { name: "User-Agent", value: truncate(`\`${userAgent}\``, MAX_FIELD) },
    ],
    timestamp: new Date().toISOString(),
  };
}

function buildBotEmbed(
  userAgent: string,
  options: {
    ip: string | null;
    city: string | null;
    region: string | null;
    country: string | null;
    href: string | null;
  }
) {
  const place = [options.city, options.region, options.country]
    .filter((x) => x && x.length > 0)
    .join(", ");
  const oneLine = truncate(
    `🤖 rastreio (UA possível bot) — ${userAgent}`.replace(/\s+/g, " ").trim(),
    MAX_FIELD
  );
  return {
    title: truncate("Visita (discreto)", MAX_TITLE),
    color: COLOR_BOT,
    description: oneLine,
    fields: place
      ? [{ name: "Lugar aprox. (Vercel)", value: truncate(place, MAX_FIELD), inline: true }]
      : undefined,
    footer: {
      text: truncate(
        [options.ip, options.href && options.ip ? " · " : "", options.href].filter(Boolean).join("") ||
          "—",
        2000
      ),
    },
    timestamp: new Date().toISOString(),
  };
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.DISCORD_VISIT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: true, skipped: "no_webhook" });
  }

  let body: ClientPayload = {};
  try {
    const j = await req.json();
    if (j && typeof j === "object" && !Array.isArray(j)) {
      body = j as ClientPayload;
    }
  } catch {
    /* empty */
  }

  const userAgent = req.headers.get("user-agent") || "";
  const isBotRequest = isBot(userAgent);
  const ip = getClientIP(req);
  const h = req.headers;
  const city = h.get("x-vercel-ip-city");
  const country = h.get("x-vercel-ip-country");
  const region = h.get("x-vercel-ip-country-region");
  const lat = h.get("x-vercel-ip-latitude");
  const lng = h.get("x-vercel-ip-longitude");
  const vercelTz = h.get("x-vercel-ip-timezone");
  const acceptLanguage = h.get("accept-language");
  const referer = h.get("referer");
  const host = h.get("host");

  const humanEmbed = buildHumanEmbed(body, {
    ip,
    city,
    region,
    country,
    vercelTz,
    lat,
    lng,
    userAgent,
    acceptLanguage,
    referer,
    host,
  });
  const embed = isBotRequest
    ? buildBotEmbed(userAgent, {
        ip,
        city,
        region,
        country,
        href: body.href || null,
      })
    : humanEmbed;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("[track] Discord error:", res.status, t);
    }
  } catch (e) {
    console.error("[track] envio ao Discord falhou:", e);
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
