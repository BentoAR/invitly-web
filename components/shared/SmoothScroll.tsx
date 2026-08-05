"use client";

import { useEffect, useRef } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rafHandlerRef = useRef<((time: number) => void) | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    // El smooth scroll altera la relación entre el gesto y el movimiento de
    // la página. Para quien pidió menos movimiento, eso es exactamente lo que
    // no quiere: se respeta la preferencia del sistema.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lenis no es crítico para leer ni navegar la home. Arrancarlo durante
    // la carga compite con el LCP y el JS de producto; el scroll nativo ya
    // funciona mientras tanto y la mejora se activa luego del primer tramo.
    const initScroll = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 0.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      rafHandlerRef.current = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(rafHandlerRef.current);
      gsap.ticker.lagSmoothing(0);

      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest("a");

        if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
          const hash = anchor.getAttribute("href");
          const id = hash?.replace("#", "");

          if (id) {
            const element = document.getElementById(id);
            if (element) {
              e.preventDefault();
              lenis.scrollTo(element, { offset: -80, duration: 1 });
            }
          }
        }
      };

      const handleInitialHash = () => {
        const hash = window.location.hash;
        if (hash) {
          const id = hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            setTimeout(() => {
              lenis.scrollTo(element, { offset: -80, duration: 1 });
            }, 100);
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);
      handleInitialHash();

      cleanupRef.current = () => {
        document.removeEventListener("click", handleAnchorClick);
        if (rafHandlerRef.current) {
          gsap.ticker.remove(rafHandlerRef.current);
        }
        lenis.destroy();
      };
    };

    const timeoutId = window.setTimeout(initScroll, 8000);

    return () => {
      window.clearTimeout(timeoutId);
      cleanupRef.current?.();
    };
  }, []);

  return <>{children}</>;
}
