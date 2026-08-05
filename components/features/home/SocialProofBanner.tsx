"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { text: "Un pago por evento", highlight: true },
  { text: "Sin suscripción mensual", highlight: true },
  { text: "Para todos tus invitados", highlight: false },
  { text: "RSVP automático", highlight: false },
  { text: "Álbum colaborativo", highlight: false },
  { text: "Playlist compartida", highlight: false },
  { text: "Respuesta en menos de 1 h", highlight: true },
  { text: "Soporte en español", highlight: true },
];

// Triple para ticker seamless
const ALL_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS];

export default function SocialProofBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    const ticker = tickerRef.current;
    if (!banner || !ticker) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Estado inicial fuera del context
    gsap.set(banner, { autoAlpha: 0, y: 28 });

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      gsap.fromTo(
        banner,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: banner,
            start: "top 92%",
            end: "top 72%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      if (prefersReducedMotion) return;

      // Ticker infinito — arranca después del primer frame para medir scrollWidth
      const innerRafId = requestAnimationFrame(() => {
        const totalWidth = ticker.scrollWidth / 3;
        tweenRef.current = gsap.to(ticker, {
          x: -totalWidth,
          duration: 35,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
          },
        });
      });

      return () => {
        if (!prefersReducedMotion) cancelAnimationFrame(innerRafId);
      };
    }, banner);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="w-full bg-secondary/30 border-y border-border/30 md:py-4 overflow-hidden cursor-default"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
    >
      <div
        ref={tickerRef}
        className="flex will-change-transform whitespace-nowrap"
        aria-hidden="true"
      >
        {ALL_ITEMS.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6">
            <span
              className={`text-sm tracking-wide ${
                item.highlight
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item.text}
            </span>
            <span className="font-bold" style={{ color: "#bc8129" }}>·</span>
          </span>
        ))}
      </div>
      <p className="sr-only">
        Un pago por evento, sin suscripción mensual. Invitados para todo tu evento, RSVP automático,
        álbum colaborativo, playlist compartida y soporte en español.
      </p>
    </div>
  );
}
