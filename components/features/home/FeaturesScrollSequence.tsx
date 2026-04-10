"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Feature = { title: string; description: string };

export default function FeaturesScrollSequence({
  features,
  sectionTitle,
}: {
  features: Feature[];
  sectionTitle: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyebrowRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (features.length === 0) return;

    // Set initial states before ScrollTrigger calculates positions
    // to prevent flash of unstyled content on slow connections
    features.forEach((_, i) => {
      const text = textRefs.current[i];
      const eyebrow = eyebrowRefs.current[i];
      const image = imageRefs.current[i];

      if (text) gsap.set(text, { y: 60, opacity: 0 });
      if (eyebrow) gsap.set(eyebrow, { y: 20, opacity: 0 });
      if (image) gsap.set(image, { y: 40, opacity: 0, scale: 0.92 });
    });

    // After lazy-load, give the browser one frame to finalize layout
    // before ScrollTrigger calculates trigger positions.
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      features.forEach((_, i) => {
        const block = blockRefs.current[i];
        const text = textRefs.current[i];
        const eyebrow = eyebrowRefs.current[i];
        const image = imageRefs.current[i];
        const imageInner = imageInnerRefs.current[i];

        if (!block || !text || !image) return;

        // Eyebrow number: entra primero, fade + y corto
        if (eyebrow) {
          gsap.fromTo(
            eyebrow,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                end: "top 60%",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // Texto: entrada dramática desde abajo con clipPath reveal
        // y: 60 → 0 + opacity mientras el bloque sube en viewport
        gsap.fromTo(
          text,
          {
            y: 60,
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              end: "top 30%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );

        // Imagen: entra con y + scale, staggered respecto al texto
        // (end más tardío = termina de entrar después que el texto)
        gsap.fromTo(
          image,
          { y: 40, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "top 25%",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );

        // Parallax interno: image inner viaja y -40 → 40 mientras
        // el bloque completo cruza el viewport (efecto depth)
        if (imageInner) {
          gsap.fromTo(
            imageInner,
            { y: -40 },
            {
              y: 40,
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [features.length]);

  return (
    <section
      id="caracteristicas"
      ref={sectionRef}
      aria-label={sectionTitle}
      style={{ backgroundColor: "#ffffff", overflow: "hidden" }}
    >
      {/* ── Section header ── */}
      <div
        className="max-w-6xl mx-auto px-8 lg:px-16"
        style={{
          paddingTop: "clamp(80px, 12vh, 140px)",
          paddingBottom: "clamp(60px, 8vh, 100px)",
        }}
      >
        <p
          className="font-mono text-xs tracking-[0.35em] uppercase mb-5"
          style={{ color: "#bc8129" }}
        >
          Funcionalidades
        </p>
        <h2
          className="font-display font-normal leading-[1.08]"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: "#200041",
            letterSpacing: "-0.03em",
          }}
        >
          Todo lo que necesitás
          <br />
          <span style={{ fontStyle: "italic", color: "rgba(32,0,65,0.35)" }}>
            para tu evento.
          </span>
        </h2>
      </div>

      {/* ── Feature blocks ── */}
      {features.map((feature, i) => {
        const textIsLeft = i % 2 === 0;
        const isLast = i === features.length - 1;

        const textBlock = (
          <div
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Eyebrow */}
            <p
              ref={(el) => {
                eyebrowRefs.current[i] = el;
              }}
              className="font-mono text-xs tracking-[0.35em] uppercase mb-5"
              style={{ color: "#bc8129", willChange: "transform, opacity" }}
            >
              {String(i + 1).padStart(2, "0")}
            </p>

            {/* Title */}
            <h3
              className="font-display font-normal leading-[1.1] mb-6"
              style={{
                fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                color: "#200041",
                letterSpacing: "-0.03em",
              }}
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p
              style={{
                color: "rgba(32,0,65,0.55)",
                fontSize: "1rem",
                lineHeight: "1.75",
                maxWidth: "45ch",
              }}
            >
              {feature.description}
            </p>
          </div>
        );

        const imageBlock = (
          <div
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="w-full overflow-hidden"
            style={{
              borderRadius: "1.5rem",
              willChange: "transform, opacity",
            }}
          >
            <div
              ref={(el) => {
                imageInnerRefs.current[i] = el;
              }}
              className="w-full flex items-center justify-center"
              style={{
                aspectRatio: "4/3",
                background:
                  "linear-gradient(135deg, #DADAC9 0%, #EDE9DA 100%)",
                // scale: 1.15 creates the parallax bleed so inner content
                // can shift y without showing gaps at the edges
                transform: "scale(1.15)",
              }}
            >
              <span
                className="font-display italic select-none"
                style={{
                  fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                  color: "rgba(32,0,65,0.3)",
                  letterSpacing: "-0.01em",
                  // counteract parent scale so text reads at normal size
                  transform: "scale(0.87)",
                  display: "block",
                }}
              >
                {feature.title}
              </span>
            </div>
          </div>
        );

        return (
          <div key={i}>
            {/* Feature block */}
            <div
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className="max-w-6xl mx-auto px-8 lg:px-16"
              style={{
                paddingTop: "clamp(100px, 15vh, 180px)",
                paddingBottom: "clamp(100px, 15vh, 180px)",
              }}
            >
              {/* Desktop: two-column grid with alternating order */}
              <div className="hidden lg:grid grid-cols-2 gap-20 items-center">
                {textIsLeft ? (
                  <>
                    <div>{textBlock}</div>
                    <div>{imageBlock}</div>
                  </>
                ) : (
                  <>
                    <div>{imageBlock}</div>
                    <div>{textBlock}</div>
                  </>
                )}
              </div>

              {/* Mobile: always image-top, text-bottom */}
              <div className="flex flex-col gap-10 lg:hidden">
                <div>{imageBlock}</div>
                <div>{textBlock}</div>
              </div>
            </div>

            {/* Divider between blocks, not after the last */}
            {!isLast && (
              <div
                className="max-w-6xl mx-auto px-8 lg:px-16"
                aria-hidden="true"
              >
                <div
                  className="w-full h-px"
                  style={{ background: "rgba(32,0,65,0.06)" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
