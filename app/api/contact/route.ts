import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const fd = await req.formData();
  console.log("[contact] Novo avistamento recebido:", {
    name: fd.get("name"),
    phone: fd.get("phone"),
    message: fd.get("message"),
    hasFile: fd.has("file") && (fd.get("file") as File)?.size > 0,
  });
  return NextResponse.json({ ok: true });
}
