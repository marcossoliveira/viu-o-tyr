/**
 * Incremente quando substituir ficheiros em public/images/ mantendo o mesmo nome.
 * O otimizador do Next.js e o browser tratam a URL como identidade — sem isto,
 * a imagem antiga pode continuar em cache.
 */
export const PUBLIC_IMAGES_VERSION = "2";

export function publicImage(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const sep = clean.includes("?") ? "&" : "?";
  return `${clean}${sep}v=${PUBLIC_IMAGES_VERSION}`;
}

/** Versão para vídeos em public/videos/ (troca de ficheiro com o mesmo nome). */
export const PUBLIC_VIDEOS_VERSION = "1";

export function publicVideo(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const sep = clean.includes("?") ? "&" : "?";
  return `${clean}${sep}v=${PUBLIC_VIDEOS_VERSION}`;
}
