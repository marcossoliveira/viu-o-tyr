import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Troca de ficheiros em public/ com o mesmo nome: evita servir cópia antiga do otimizador.
    minimumCacheTTL: 0,
    // Next 16: `?v=` nas URLs locais exige padrão; omitir `search` aceita qualquer query.
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
