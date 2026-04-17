"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rafHandlerRef = useRef<((time: number) => void) | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Mantener referencia estable del handler para el cleanup correcto
    rafHandlerRef.current = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafHandlerRef.current);
    gsap.ticker.lagSmoothing(0);

    // Manejar clicks en enlaces con hash
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

    // Manejar hash inicial en la URL
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

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (rafHandlerRef.current) {
        gsap.ticker.remove(rafHandlerRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
