"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rafHandlerRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Mantener referencia estable del handler para el cleanup correcto
    rafHandlerRef.current = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafHandlerRef.current);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (rafHandlerRef.current) {
        gsap.ticker.remove(rafHandlerRef.current);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
