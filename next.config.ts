import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Evita inferir o root a partir de outro lockfile (ex.: na pasta home) — reduz cache Turbopack corrompido em dev.
  turbopack: {
    root: projectRoot,
  },
  images: {
    // Troca de ficheiros em public/ com o mesmo nome: evita servir cópia antiga do otimizador.
    minimumCacheTTL: 0,
    // Next 16: `?v=` nas URLs locais exige padrão; omitir `search` aceita qualquer query.
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
