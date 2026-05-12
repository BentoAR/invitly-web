"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HeroPhonesClientProps = {
  frontImage: string;
  lateralImage: string;
  imageAlt: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function HeroPhonesClient({
  frontImage,
  lateralImage,
  imageAlt,
}: HeroPhonesClientProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const floatTweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const top = topRef.current;
        const bottom = bottomRef.current;
        if (!top || !bottom) return;

        const root = document.querySelector("#inicio");
        const q = root ? gsap.utils.selector(root) : null;
        const titleEl =
          q && (q("[data-hero='title']")[0] as HTMLElement | undefined);
        const subtitleEl =
          q && (q("[data-hero='subtitle']")[0] as HTMLElement | undefined);
        const ctaEl =
          q && (q("[data-hero='cta']")[0] as HTMLElement | undefined);
        const contentEl =
          q && (q("[data-hero='content']")[0] as HTMLElement | undefined);

        const allEls = [top, bottom, titleEl, subtitleEl, ctaEl].filter(
          Boolean
        ) as HTMLElement[];

        gsap.set(allEls, { autoAlpha: 0 });

        const intro = gsap.timeline();
        intro
          .fromTo(
            top,
            { y: -40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" }
          )
          .fromTo(
            bottom,
            { y: -60, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" },
            0.08
          );

        if (titleEl) {
          intro.fromTo(
            titleEl,
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
            0.05
          );
        }
        if (subtitleEl) {
          intro.fromTo(
            subtitleEl,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
            0.12
          );
        }
        if (ctaEl) {
          intro.fromTo(
            ctaEl,
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
            0.2
          );
        }

        intro.add(() => {
          const floatTop = gsap.to(top, {
            y: -12,
            duration: 1.7,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          const floatBottom = gsap.to(bottom, {
            y: 16,
            duration: 3.1,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          floatTweensRef.current = [floatTop, floatBottom];
        });

        // Definir callbacks fuera del objeto config para evitar recrearlos
        const handleEnter = () => {
          floatTweensRef.current.forEach((tw) => tw.kill());
          gsap.set(top, { y: 0 });
          gsap.set(bottom, { y: 0 });
        };

        const handleLeaveBack = () => {
          gsap.set(top, { y: 0 });
          gsap.set(bottom, { y: 0 });
          const floatTop = gsap.to(top, {
            y: -12,
            duration: 1.7,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          const floatBottom = gsap.to(bottom, {
            y: 16,
            duration: 3.1,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          floatTweensRef.current = [floatTop, floatBottom];
        };

        const scrollOut = gsap.timeline({
          scrollTrigger: {
            trigger: "#inicio",
            start: "top top",
            end: "+=160%",
            scrub: 1.2,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            onEnter: handleEnter,
            onLeaveBack: handleLeaveBack,
          },
        });

        scrollOut
          .to(top, { yPercent: -220, x: 22, ease: "none" }, 0)
          .to(
            bottom,
            { xPercent: 120, yPercent: 120, x: -18, ease: "none" },
            0
          );

        if (titleEl) {
          scrollOut.to(titleEl, { xPercent: -180, ease: "none" }, 0);
        }
        if (subtitleEl) {
          scrollOut.to(subtitleEl, { xPercent: -160, ease: "none" }, 0.04);
        }
        if (ctaEl) {
          scrollOut.to(ctaEl, { xPercent: -140, ease: "none" }, 0.08);
        }
        if (contentEl) {
          scrollOut.to(contentEl, { xPercent: -160, ease: "none" }, 0);
        }

        return () => {};
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none hidden lg:block"
      style={{ zIndex: 20 }}
      aria-hidden="true"
    >
      <div className="absolute right-0 top-0 w-1/2 h-full flex items-center">
        <div className="relative w-[85%] mx-auto h-[680px]">
          {/* Teléfono costado — derecha, rotado hacia afuera, detrás */}
          <div
            ref={bottomRef}
            className="absolute w-[45%]"
            style={{ right: "10%", zIndex: 1, transform: "rotate(5deg)", opacity: 0.9 }}
          >
            <Image
              src={frontImage}
              alt={imageAlt}
              width={280}
              height={480}
              className="w-full h-auto drop-shadow-[0_20px_44px_rgba(0,0,0,0.18)]"
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 20vw"
              role="img"
            />
          </div>
          {/* Teléfono lateral — izquierda, protagonista */}
          <div
            ref={topRef}
            className="absolute top-6 w-[72%]"
            style={{ left: "-8%", zIndex: 2 }}
          >
            <Image
              src={lateralImage}
              alt={imageAlt}
              width={900}
              height={1380}
              className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.28)]"
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 36vw"
              role="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
