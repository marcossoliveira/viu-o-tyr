"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";

type ToastState = { visible: boolean; success: boolean; message: string };

const inputClass =
  "w-full rounded-xl border border-surface-ring bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/80 focus:outline-none focus:ring-2 focus:ring-brand-red/80 transition";

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
    <section
      className="border-t border-surface-ring bg-background-subtle py-16 px-5 sm:px-6"
      id="contato"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-black text-foreground sm:text-4xl">
            Você viu Týr?
          </h2>
          <p className="mb-10 text-center text-foreground-muted sm:text-base">
            Deixe sua mensagem — qualquer pista é valiosa.
          </p>
        </Reveal>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <RevealStagger className="flex flex-col gap-5 rounded-2xl bg-surface p-6 ring-1 ring-surface-ring shadow-xl shadow-black/5 sm:p-8 dark:shadow-none">
            <RevealStaggerItem>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-foreground"
                >
                  Nome <span className="text-brand-red">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Seu nome"
                />
              </div>
            </RevealStaggerItem>

            <RevealStaggerItem>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-foreground"
                >
                  Telefone / WhatsApp
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="(27) 99999-9999"
                />
              </div>
            </RevealStaggerItem>

            <RevealStaggerItem>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-foreground"
                >
                  Mensagem <span className="text-brand-red">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Onde você viu Týr? Data, horário, local..."
                />
              </div>
            </RevealStaggerItem>

            <RevealStaggerItem>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="file"
                  className="text-sm font-semibold text-foreground"
                >
                  Foto (opcional)
                </label>
                <input
                  id="file"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="text-sm text-foreground-muted file:mr-4 file:rounded-lg file:border-0 file:bg-brand-red/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-red hover:file:bg-brand-red/20"
                />
              </div>
            </RevealStaggerItem>

            <RevealStaggerItem>
              <button
                type="submit"
                disabled={loading}
                className="mt-1 min-h-12 w-full rounded-xl bg-brand-red px-8 py-3 text-base font-black text-white shadow transition-colors duration-200 hover:opacity-95 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar mensagem"}
              </button>
            </RevealStaggerItem>
          </RevealStagger>
        </form>
      </div>

      <AnimatePresence>
        {toast.visible && (
          <motion.div
            role="status"
            aria-live="polite"
            className="pointer-events-none fixed bottom-[max(6.5rem,env(safe-area-inset-bottom))] left-1/2 z-50 w-[min(100%,24rem)] -translate-x-1/2 px-4"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`pointer-events-auto rounded-xl px-6 py-3 text-center text-sm font-semibold text-white shadow-lg ${
                toast.success ? "bg-green-600" : "bg-brand-red"
              }`}
            >
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
