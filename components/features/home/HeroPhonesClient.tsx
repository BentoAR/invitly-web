"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroLoopVideo from "@/components/features/home/HeroLoopVideo";

type HeroPhonesClientProps = {
  webmSrc: string;
  movSrc: string;
  poster: string;
  ariaLabel: string;
};

export default function HeroPhonesClient({
  webmSrc,
  movSrc,
  poster,
  ariaLabel,
}: HeroPhonesClientProps) {
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const wrap = videoWrapRef.current;
        if (!wrap) return;

        gsap.fromTo(
          wrap,
          { y: -24, autoAlpha: 0, scale: 0.97 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.15 }
        );
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
      <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center">
        <div
          ref={videoWrapRef}
          className="relative w-full"
          style={{ maxWidth: "min(720px, 46vw)" }}
        >
          <HeroLoopVideo webmSrc={webmSrc} movSrc={movSrc} poster={poster} ariaLabel={ariaLabel} />
        </div>
      </div>
    </div>
  );
}
