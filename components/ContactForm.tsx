"use client";

import { useState, useRef } from "react";

type ToastState = { visible: boolean; success: boolean; message: string };

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    success: false,
    message: "",
  });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (success: boolean, message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ visible: true, success, message });
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      4000
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("phone", phone);
      fd.append("message", message);
      if (file) fd.append("file", file);

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json();

      if (data.ok) {
        showToast(true, "Mensagem enviada! Entraremos em contato em breve.");
        setName("");
        setPhone("");
        setMessage("");
        setFile(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        showToast(false, "Erro ao enviar. Tente pelo WhatsApp.");
      }
    } catch {
      showToast(false, "Erro de rede. Tente pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-4" id="contato">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-black mb-3 text-center">
          Você viu Týr?
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Deixe sua mensagem — qualquer pista é valiosa.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold text-sm text-gray-700">
              Nome <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              placeholder="Seu nome"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-semibold text-sm text-gray-700">
              Telefone / WhatsApp
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              placeholder="(27) 99999-9999"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-semibold text-sm text-gray-700">
              Mensagem <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition resize-none"
              placeholder="Onde você viu Týr? Data, horário, local..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="file" className="font-semibold text-sm text-gray-700">
              Foto (opcional)
            </label>
            <input
              id="file"
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-black text-base py-3 px-8 rounded-xl shadow transition-colors duration-200 mt-2"
          >
            {loading ? "Enviando..." : "Enviar mensagem"}
          </button>
        </form>
      </div>

      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          toast.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className={`px-6 py-3 rounded-xl shadow-lg font-semibold text-sm text-white ${
            toast.success ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      </div>
    </section>
  );
}
