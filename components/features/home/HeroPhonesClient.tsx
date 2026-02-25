"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image, { type StaticImageData } from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HeroPhonesClientProps = {
  topImage: StaticImageData;
  bottomImage: StaticImageData;
  imageAlt: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function HeroPhonesClient({
  topImage,
  bottomImage,
  imageAlt,
}: HeroPhonesClientProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (topRef.current && bottomRef.current) {
        const root = document.querySelector("#inicio");
        const q = root ? gsap.utils.selector(root) : null;
        const titleEl =
          q && (q("[data-hero='title']")[0] as HTMLElement | undefined);
        const subtitleEl =
          q && (q("[data-hero='subtitle']")[0] as HTMLElement | undefined);
        const ctaEl =
          q && (q("[data-hero='cta']")[0] as HTMLElement | undefined);

        gsap.set(
          [topRef.current, bottomRef.current, titleEl, subtitleEl, ctaEl],
          { autoAlpha: 0 }
        );

        const intro = gsap.timeline();
        intro
          .fromTo(
            topRef.current,
            { y: -40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" }
          )
          .fromTo(
            bottomRef.current,
            { y: -60, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" },
            0.08
          )
          .add(() => {
            gsap.to(topRef.current, {
              y: -12,
              duration: 1.7,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
            gsap.to(bottomRef.current, {
              y: 16,
              duration: 3.1,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });

        intro
          .fromTo(
            titleEl,
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
            0.05
          )
          .fromTo(
            subtitleEl,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
            0.12
          )
          .fromTo(
            ctaEl,
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
            0.2
          );
      }

      if (topRef.current && bottomRef.current) {
        const root = document.querySelector("#inicio");
        const q = root ? gsap.utils.selector(root) : null;
        const contentEl =
          q && (q("[data-hero='content']")[0] as HTMLElement | undefined);
        const titleEl =
          q && (q("[data-hero='title']")[0] as HTMLElement | undefined);
        const subtitleEl =
          q && (q("[data-hero='subtitle']")[0] as HTMLElement | undefined);
        const ctaEl =
          q && (q("[data-hero='cta']")[0] as HTMLElement | undefined);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#inicio",
            start: "top top",
            end: "+=520",
            scrub: 1.4,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(topRef.current, { yPercent: -160, ease: "none" }, 0)
          .to(
            bottomRef.current,
            { xPercent: 90, yPercent: 90, ease: "none" },
            0
          )
          .to(
            titleEl,
            { xPercent: -140, ease: "none" },
            0
          )
          .to(
            subtitleEl,
            { xPercent: -120, ease: "none" },
            0.06
          )
          .to(
            ctaEl,
            { xPercent: -100, ease: "none" },
            0.12
          )
          .to(
            contentEl,
            { xPercent: -120, ease: "none" },
            0
          );

        gsap.to(topRef.current, {
          yPercent: -220,
          ease: "none",
          scrollTrigger: {
            trigger: "#inicio",
            start: "bottom top",
            end: "bottom+=300 top",
            scrub: 1.4,
          },
        });

        gsap.to(bottomRef.current, {
          xPercent: 120,
          yPercent: 120,
          ease: "none",
          scrollTrigger: {
            trigger: "#inicio",
            start: "bottom top",
            end: "bottom+=300 top",
            scrub: 1.4,
          },
        });

        if (titleEl) {
          gsap.to(titleEl, {
            xPercent: -180,
            ease: "none",
            scrollTrigger: {
              trigger: "#inicio",
              start: "bottom top",
              end: "bottom+=300 top",
              scrub: 1.4,
            },
          });
        }

        if (subtitleEl) {
          gsap.to(subtitleEl, {
            xPercent: -160,
            ease: "none",
            scrollTrigger: {
              trigger: "#inicio",
              start: "bottom top",
              end: "bottom+=300 top",
              scrub: 1.4,
            },
          });
        }

        if (ctaEl) {
          gsap.to(ctaEl, {
            xPercent: -140,
            ease: "none",
            scrollTrigger: {
              trigger: "#inicio",
              start: "bottom top",
              end: "bottom+=300 top",
              scrub: 1.4,
            },
          });
        }

        if (contentEl) {
          gsap.to(contentEl, {
            xPercent: -160,
            ease: "none",
            scrollTrigger: {
              trigger: "#inicio",
              start: "bottom top",
              end: "bottom+=300 top",
              scrub: 0.8,
            },
          });
        }

        gsap.to(topRef.current, {
          x: 22,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: "#inicio",
            start: "top top",
            end: "+=520",
            scrub: 1.4,
          },
        });

        gsap.to(bottomRef.current, {
          x: -18,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: "#inicio",
            start: "top top",
            end: "+=520",
            scrub: 1.4,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-[640px] sm:h-[740px] lg:h-[900px]">
      <div
        ref={topRef}
        className="absolute left-1/2 -translate-x-1/2 top-8 z-20 w-[108%] sm:w-[102%] lg:w-[96%]"
      >
        <Image
          src={topImage}
          alt={imageAlt}
          className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
          priority
          role="img"
        />
      </div>
      <div
        ref={bottomRef}
        className="absolute left-1/2 -translate-x-1/2 top-32 z-10 w-[100%] sm:w-[94%] lg:w-[88%]"
      >
        <Image
          src={bottomImage}
          alt={imageAlt}
          className="w-full h-auto drop-shadow-[0_24px_50px_rgba(0,0,0,0.25)]"
          priority
          role="img"
        />
      </div>
    </div>
  );
}
