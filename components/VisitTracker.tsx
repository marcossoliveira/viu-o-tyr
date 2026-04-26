"use client";

import { useEffect } from "react";

const STORAGE_KEY = "__tyr_tracked";

type ConnectionInfo = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
};

function getConnection(): ConnectionInfo | undefined {
  if (typeof navigator === "undefined") return undefined;
  const c = (navigator as Navigator & { connection?: ConnectionInfo & EventTarget })
    .connection;
  if (!c) return undefined;
  return {
    effectiveType: c.effectiveType,
    downlink: c.downlink,
    rtt: c.rtt,
    saveData: c.saveData,
  };
}

function collect() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return null;
  }

  const langs = Array.isArray(navigator.languages)
    ? navigator.languages.join(", ")
    : null;

  let timeZone: string | undefined;
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    timeZone = undefined;
  }

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  const colorScheme: string | undefined =
    prefersDark === true ? "dark" : prefersDark === false ? "light" : undefined;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches === true;

  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string; brands?: { brand: string; version: string }[] };
    deviceMemory?: number;
  };

  const platform =
    nav.userAgentData?.platform ??
    (typeof nav.platform === "string" && nav.platform.length > 0 ? nav.platform : undefined);

  return {
    language: navigator.language,
    languages: langs ?? undefined,
    timeZone,
    screenW: window.screen?.width,
    screenH: window.screen?.height,
    innerW: window.innerWidth,
    innerH: window.innerHeight,
    dpr: window.devicePixelRatio,
    platform,
    hardwareConcurrency:
      typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : undefined,
    deviceMemory:
      typeof nav.deviceMemory === "number" ? nav.deviceMemory : undefined,
    connection: getConnection(),
    colorScheme,
    coarsePointer,
    href: window.location?.href,
    pathname: window.location?.pathname,
    documentReferrer: document.referrer || undefined,
  };
}

export default function VisitTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      return;
    }

    const payload = collect();
    if (!payload) return;

    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* fail-silent */
    });
  }, []);

  return null;
}
