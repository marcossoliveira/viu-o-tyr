import { PDFDocument } from "pdf-lib";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = new URL(request.url).origin;
  const posterUrl = `${origin}/api/poster`;

  const posterRes = await fetch(posterUrl);
  if (!posterRes.ok) {
    return new Response("Failed to generate poster image", {
      status: posterRes.status,
    });
  }

  const pngBytes = new Uint8Array(await posterRes.arrayBuffer());
  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedPng(pngBytes);

  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const margin = 28;
  const maxW = width - margin * 2;
  const maxH = height - margin * 2;
  const imgW = image.width;
  const imgH = image.height;
  const ratio = imgW / imgH;
  const boxRatio = maxW / maxH;
  let drawW: number;
  let drawH: number;
  if (ratio > boxRatio) {
    drawW = maxW;
    drawH = maxW / ratio;
  } else {
    drawH = maxH;
    drawW = maxH * ratio;
  }
  const x = (width - drawW) / 2;
  const y = (height - drawH) / 2;

  page.drawImage(image, { x, y, width: drawW, height: drawH });

  const pdfBytes = await pdfDoc.save();

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="folheto-tyr.pdf"',
      "Cache-Control": "public, max-age=300, s-maxage=86400",
    },
  });
}
