"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

type HeroPhonesClientProps = {
  frontImage: string;
  lateralImage: string;
  imageAlt: string;
};

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

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const top = topRef.current;
        const bottom = bottomRef.current;
        if (!top || !bottom) return;

        gsap.set([top, bottom], { autoAlpha: 0 });

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
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none hidden lg:block"
      style={{ zIndex: 20 }}
      aria-hidden="true"
    >
      <div className="absolute right-0 top-0 w-1/2 h-full flex items-center">
        <div className="relative w-[85%] mx-auto" style={{ height: "min(680px, 82vh)", transform: "scale(min(1, calc(100vh / 820px)))", transformOrigin: "center center" }}>
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
          <div
            ref={topRef}
            className="absolute top-6 w-[72%]"
            style={{ left: "-8%", zIndex: 2 }}
          >
            <Image
              src={lateralImage}
              alt={imageAlt}
              width={1080}
              height={1132}
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
