"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function MicrosoftClarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!clarityId) return;

    // La analítica no debe competir con el primer render ni con el LCP.
    // Se carga después de que la visita ya es real, o como máximo a los 8 s.
    const loadClarity = () => setShouldLoad(true);
    const timeoutId = window.setTimeout(loadClarity, 8000);

    window.addEventListener("pointerdown", loadClarity, { once: true, passive: true });
    window.addEventListener("keydown", loadClarity, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", loadClarity);
      window.removeEventListener("keydown", loadClarity);
    };
  }, [clarityId]);

  if (!clarityId || !shouldLoad) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}
