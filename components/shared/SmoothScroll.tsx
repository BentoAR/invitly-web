"use client";

import { useEffect, useRef } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rafHandlerRef = useRef<((time: number) => void) | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    // Diferir la inicialización de Lenis + GSAP hasta después de que el
    // navegador haya pintado el LCP y esté idle. Esto elimina el bloqueo
    // de main thread durante FCP/LCP.
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

    // Usar requestIdleCallback cuando esté disponible; fallback a setTimeout
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(initScroll, { timeout: 2000 });
      return () => {
        cancelIdleCallback(id);
        cleanupRef.current?.();
      };
    } else {
      const id = setTimeout(initScroll, 200);
      return () => {
        clearTimeout(id);
        cleanupRef.current?.();
      };
    }
  }, []);

  return <>{children}</>;
}
