import { NextRequest, NextResponse } from "next/server";

/** Discord field value max is 1024; stay under to leave margin for ellipsis. */
const MAX_FIELD = 1000;

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

function safeFileName(name: string) {
  const base = name.replace(/[/\\?%*:|"<>]/g, "_").trim() || "anexo";
  return base.length > 100 ? `${base.slice(0, 90)}${base.match(/\.\w+$/)?.[0] ?? ""}` : base;
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[contact] DISCORD_CONTACT_WEBHOOK_URL is not set");
    return NextResponse.json(
      { ok: false, error: "contact_unavailable" },
      { status: 503 }
    );
  }

  const fd = await req.formData();
  const name = String(fd.get("name") ?? "").trim() || "(sem nome)";
  const phone = String(fd.get("phone") ?? "").trim() || "—";
  const message = String(fd.get("message") ?? "").trim() || "—";
  const fileEntry = fd.get("file");
  const file =
    fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

  const embed: Record<string, unknown> = {
    title: "Novo avistamento — contato",
    color: 0xe63946,
    fields: [
      { name: "Nome", value: truncate(name, MAX_FIELD), inline: true },
      { name: "Telefone", value: truncate(phone, MAX_FIELD), inline: true },
      { name: "Mensagem", value: truncate(message, MAX_FIELD) },
    ],
    timestamp: new Date().toISOString(),
  };

  try {
    if (file) {
      const filename = safeFileName(file.name);
      if (file.type.startsWith("image/")) {
        embed.image = { url: `attachment://${filename}` };
      }

      const out = new FormData();
      out.append(
        "payload_json",
        JSON.stringify({
          embeds: [embed],
          attachments: [{ id: 0, filename }],
        })
      );
      out.append("files[0]", file, filename);

      const res = await fetch(webhookUrl, { method: "POST", body: out });
      if (!res.ok) {
        const t = await res.text();
        console.error("[contact] Discord error:", res.status, t);
        return NextResponse.json({ ok: false }, { status: 502 });
      }
    } else {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] }),
      });
      if (!res.ok) {
        const t = await res.text();
        console.error("[contact] Discord error:", res.status, t);
        return NextResponse.json({ ok: false }, { status: 502 });
      }
    }
  } catch (e) {
    console.error("[contact] envio ao Discord falhou:", e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
