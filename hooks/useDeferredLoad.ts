"use client";

import { useEffect, useState } from "react";

/**
 * Pospone la carga de scripts de terceros (analytics, tracking) hasta la
 * primera interacción real del usuario, con un timeout como red de seguridad.
 * Evita que compitan por CPU/red con el LCP en la carga inicial.
 */
export function useDeferredLoad(timeoutMs = 8000) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const load = () => setShouldLoad(true);
    const timeoutId = window.setTimeout(load, timeoutMs);

    window.addEventListener("pointerdown", load, { once: true, passive: true });
    window.addEventListener("keydown", load, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
    };
  }, [timeoutMs]);

  return shouldLoad;
}
