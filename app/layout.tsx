import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { publicImage, PUBLIC_IMAGES_VERSION } from "@/lib/publicImage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viu-o-tyr.vercel.app"),
  title: "GATO PERDIDO — Týr | Praia de Itaparica, Vila Velha/ES",
  description:
    "Týr desapareceu em 17/04 na Praia de Itaparica. Recompensa R$ 500. Se você o viu, entre em contato pelo WhatsApp.",
  openGraph: {
    title: "GATO PERDIDO — Týr | Praia de Itaparica, Vila Velha/ES",
    description:
      "Týr desapareceu em 17/04 na Praia de Itaparica. Recompensa R$ 500. Se você o viu, entre em contato pelo WhatsApp.",
    images: [
      { url: publicImage("/images/tyr-1.jpg"), width: 800, height: 600, alt: "Týr" },
    ],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} h-full bg-background text-foreground antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href={`/images/tyr-1.jpg?v=${PUBLIC_IMAGES_VERSION}`}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
