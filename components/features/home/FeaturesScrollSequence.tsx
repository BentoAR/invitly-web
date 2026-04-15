"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

type Feature = { title: string; description: string };

// ─── Fixed card count ─────────────────────────────────────────────────────────
const N_CARDS = 6;

// ─── Card positions: circular distribution around center ────
const CARD_SLOTS: Array<{
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  xPercent?: number;
}> = [
  { top: "8%",  right: "2%" },   // 0 – top-right (pegado al borde)
  { top: "2%",  left: "50%", xPercent: -50 },  // 1 – top-center (arriba arriba)
  { top: "8%",  left: "2%" },    // 2 – top-left (pegado al borde)
  { bottom: "8%", left: "2%" },  // 3 – bottom-left (pegado al borde)
  { bottom: "2%", left: "50%", xPercent: -50 }, // 4 – bottom-center (abajo abajo)
  { bottom: "8%", right: "2%" }, // 5 – bottom-right (pegado al borde)
];

// Final resting rotation per slot
const CARD_ROTATIONS = [2, 0, -2, -2, 0, 2];

// Entry: from outside the circle
const CARD_ENTRY: Array<{ x: number; y: number; rotation: number }> = [
  { x:  800, y: -400, rotation:  18 },  // from top-right
  { x:    0, y: -600, rotation:   0 },  // from top
  { x: -800, y: -400, rotation: -18 },  // from top-left
  { x: -800, y:  400, rotation: -18 },  // from bottom-left
  { x:    0, y:  600, rotation:   0 },  // from bottom
  { x:  800, y:  400, rotation:  18 },  // from bottom-right
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturesScrollSequence({
  features,
  sectionTitle,
}: {
  features: Feature[];
  sectionTitle: string;
}) {
  const desktopSectionRef = useRef<HTMLDivElement>(null);
  const titleWrapRef      = useRef<HTMLDivElement>(null);
  const titleTextRef      = useRef<HTMLHeadingElement>(null);
  const eyebrowRef        = useRef<HTMLParagraphElement>(null);
  const cardRefs          = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorsRef     = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isStacked, setIsStacked] = useState(false);

  useLayoutEffect(() => {
    const desktopSection = desktopSectionRef.current;
    const titleWrap      = titleWrapRef.current;
    const eyebrow        = eyebrowRef.current;
    const indicators     = indicatorsRef.current;
    if (!desktopSection || !titleWrap) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const n = N_CARDS;

    // Initial states
    gsap.set(titleWrap, { scale: 1, yPercent: 0, transformOrigin: "50% 50%" });
    if (eyebrow)    gsap.set(eyebrow,    { autoAlpha: 1, yPercent: 0 });
    if (indicators) gsap.set(indicators, { autoAlpha: 0, y: 20 });

    cards.forEach((card, i) => {
      const slot = CARD_SLOTS[i];
      gsap.set(card, {
        // Set final position properties first
        left: slot.left || "auto",
        right: slot.right || "auto",
        top: slot.top || "auto",
        bottom: slot.bottom || "auto",
        xPercent: slot.xPercent ?? 0,
        yPercent: 0,
        // Then offset with entry animation values
        x: CARD_ENTRY[i]?.x ?? 0,
        y: CARD_ENTRY[i]?.y ?? 0,
        rotation: CARD_ENTRY[i]?.rotation ?? 0,
        // Visual properties
        visibility: "visible",
        opacity: 0,
        scale: 0.9,
        willChange: "transform, opacity",
      });
    });

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      // ══ DESKTOP ══
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        const phase1 = window.innerHeight * 1;
        const phase2 = window.innerHeight * n * 0.3;
        const phase3 = window.innerHeight * n * 0.6; // Space for stacked carousel (6 cards × 2.5 units each = 15, scaled down)
        const phase4 = window.innerHeight * 0.8; // Hold at end with all cards stacked
        const scrollDist = phase1 + phase2 + phase3 + phase4;

        ScrollTrigger.create({
          trigger: desktopSection,
          pin: true,
          start: "top top",
          end: `+=${scrollDist}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopSection,
            start: "top top",
            end: `+=${scrollDist}`,
            scrub: 2.5,
            invalidateOnRefresh: true,
          },
        });

        // ── Phase 1: Title shrinks ──
        tl.to(titleWrap, {
          scale: 0.5,
          yPercent: -60,
          ease: "power2.inOut",
          duration: 1.2,
        }, 0);

        if (eyebrow) {
          tl.to(eyebrow, {
            autoAlpha: 0,
            yPercent: -30,
            ease: "power2.in",
            duration: 0.8,
          }, 0);
        }

        // ── Phase 2: Cards scatter in (overlapping with title) ──
        const cardStart = 0.2;
        const cardStep  = 0.4;

        // Transition to dark mode while cards enter
        tl.to(desktopSection, {
          backgroundColor: "#0a0a0a",
          duration: 1.5,
          ease: "power2.inOut"
        }, cardStart);

        // Change title color to white
        const titleText = titleTextRef.current;
        if (titleText) {
          tl.to(titleText, {
            color: "#ffffff",
            duration: 1.5,
            ease: "power2.inOut"
          }, cardStart);
        }

        // Change eyebrow color to orange
        if (eyebrow) {
          tl.to(eyebrow, {
            color: "#FFA459",
            duration: 1.5,
            ease: "power2.inOut"
          }, cardStart);
        }

        cards.forEach((card, i) => {
          const slot = CARD_SLOTS[i];
          tl.to(card, {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            xPercent: slot.xPercent ?? 0,
            rotation: CARD_ROTATIONS[i] ?? 0,
            ease: "power3.out",
            duration: 1.0,
          }, cardStart + i * cardStep);
        });

        // ── Phase 3: Stacked Vertical Carousel ──
        const stackPhaseStart = cardStart + n * cardStep + 0.5;

        // Move title almost to the top
        tl.to(titleWrap, {
          yPercent: -330,
          scale: 0.75,
          ease: "power2.inOut",
          duration: 0.8,
        }, stackPhaseStart);

        // Stack positions HORIZONTAL: 6 slots (card at index 2 is centered)
        const stackPositions = [
          { x: -500, y: 0, scale: 0.75, opacity: 0,   zIndex: 30 }, // izq izq (oculta)
          { x: -240, y: 0, scale: 0.85, opacity: 0.5, zIndex: 31 }, // izquierda
          { x: 0,    y: 0, scale: 1.15, opacity: 1,   zIndex: 33 }, // CENTRO (activa, más grande)
          { x: 240,  y: 0, scale: 0.85, opacity: 0.5, zIndex: 31 }, // derecha
          { x: 500,  y: 0, scale: 0.75, opacity: 0,   zIndex: 30 }, // der der (oculta)
          { x: 750,  y: 0, scale: 0.7,  opacity: 0,   zIndex: 29 }  // fuera
        ];

        // Show indicators first
        if (indicators) {
          tl.to(indicators, {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          }, stackPhaseStart);
        }

        // ── Step 1: Cards fly to center ONE BY ONE (staggered arrival) ──
        const moveToStackStart = stackPhaseStart + 0.4;
        const arrivalStagger = 0.15; // Time between each card arrival

        // Marcar como apiladas cuando comienzan a moverse al centro
        tl.call(() => setIsStacked(true), [], moveToStackStart);

        cards.forEach((card, i) => {
          const arrivalTime = moveToStackStart + i * arrivalStagger;
          const targetPos = stackPositions[i] || stackPositions[stackPositions.length - 1];

          // Each card flies from its circular position to the center stack (horizontal)
          tl.to(card, {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            rotation: 0,
            x: targetPos.x,
            y: targetPos.y,
            scale: targetPos.scale,
            opacity: targetPos.opacity,
            zIndex: targetPos.zIndex,
            duration: 0.8,
            ease: "back.out(1.2)", // Dramatic bounce on arrival
          }, arrivalTime);

          // Animar background a sólido cuando llega al centro
          const cardBg = card.querySelector('.card-background');
          if (cardBg) {
            tl.to(cardBg, {
              background: "rgba(15, 15, 15, 0.95)",
              backdropFilter: "blur(20px)",
              duration: 0.6,
              ease: "power2.out",
            }, arrivalTime + 0.2);
          }
        });

        // Set initial active index (card 2 is centered) after all cards have arrived
        const allCardsArrivedAt = moveToStackStart + (cards.length - 1) * arrivalStagger + 0.8;
        tl.call(() => setActiveIndex(2), [], allCardsArrivedAt);

        // ── Step 3: Carousel rotation (each card rotates to center) ──
        const carouselStart = allCardsArrivedAt + 0.7; // Start after all cards have stacked
        const rotationStep = 2.5;

        // We want all 6 cards to rotate through the center
        // Order: card 2 (already centered), then 3, 4, 5, 0, 1
        const rotationSequence = [2, 3, 4, 5, 0, 1];

        rotationSequence.forEach((activeCardIndex, iteration) => {
          const startTime = carouselStart + iteration * rotationStep;

          // Rotate all cards to new positions (horizontal carousel)
          cards.forEach((card, cardIndex) => {
            // Calculate offset from the active card
            const offset = (cardIndex - activeCardIndex + n) % n;
            const newPos = stackPositions[offset] || stackPositions[stackPositions.length - 1];

            tl.to(card, {
              x: newPos.x,
              y: newPos.y,
              scale: newPos.scale,
              opacity: newPos.opacity,
              zIndex: newPos.zIndex,
              duration: 1.2,
              ease: "power2.inOut"
            }, startTime);
          });

          // Update active index when card reaches center
          tl.call(() => setActiveIndex(activeCardIndex), [], startTime + 0.6);
        });

        // Clear active index at the end
        const stackPhaseEnd = carouselStart + rotationSequence.length * rotationStep;
        tl.call(() => setActiveIndex(null), [], stackPhaseEnd);

        // Final hold
        tl.to({}, { duration: 0.6 });

        return () => {};
      });

      // ══ MOBILE ══
      gsap.matchMedia().add("(max-width: 1023px)", () => {
        // No animations in mobile - keep it simple
        return () => {};
      });
    }, desktopSection);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [features.length]);

  return (
    <>
      {/* ══ DESKTOP ══ */}
      <section
        id="caracteristicas"
        ref={desktopSectionRef}
        aria-label={sectionTitle}
        className="hidden lg:block relative"
        style={{ height: "100vh", backgroundColor: "#FAFAF9", overflow: "hidden" }}
      >
        {/* Gradient background - modo oscuro */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(188,129,41,0.15) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Dot pattern - modo oscuro */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Title */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10, pointerEvents: "none" }}
        >
          <p
            ref={eyebrowRef}
            className="font-mono uppercase text-center"
            style={{ fontSize: "0.7rem", letterSpacing: "0.4em", color: "#bc8129", marginBottom: "1.5rem" }}
          >
            Funcionalidades
          </p>
          <div ref={titleWrapRef} style={{ willChange: "transform" }}>
            <h2
              ref={titleTextRef}
              className="font-display font-normal text-center leading-[1.06]"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                color: "#200041",
                letterSpacing: "-0.04em",
                whiteSpace: "nowrap",
              }}
            >
              {sectionTitle}
            </h2>
          </div>
        </div>

        {/* Cards */}
        {Array.from({ length: N_CARDS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute"
            style={{
              width: "clamp(300px, 24vw, 380px)",
              height: "clamp(420px, 32vw, 520px)",
              zIndex: activeIndex === i ? 100 : 20,
              visibility: "hidden",
            }}
          >
            <FeatureCard
              feature={features[i % features.length]}
              index={i}
              isStacked={isStacked}
            />
          </div>
        ))}

        {/* Indicators */}
        <div
          ref={indicatorsRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3"
          style={{ zIndex: 60 }}
        >
          {Array.from({ length: N_CARDS }).map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{
                width: activeIndex === i ? 32 : 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: activeIndex === i ? "#bc8129" : "rgba(32,0,65,0.2)",
                boxShadow: activeIndex === i ? "0 2px 8px rgba(188,129,41,0.4)" : "none",
              }}
            />
          ))}
        </div>
      </section>

      {/* ══ MOBILE ══ */}
      <section
        id="caracteristicas-mobile"
        aria-label={sectionTitle}
        className="lg:hidden py-12 md:py-20"
        style={{
          backgroundColor: "#FAFAF9",
        }}
      >
        <div className="text-center px-6 mb-12">
          <p
            className="font-mono uppercase"
            style={{ fontSize: "0.68rem", letterSpacing: "0.38em", color: "#bc8129", marginBottom: "1rem" }}
          >
            Funcionalidades
          </p>
          <h2
            className="font-display font-normal leading-[1.08]"
            style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "#200041", letterSpacing: "-0.03em" }}
          >
            {sectionTitle}
          </h2>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          pagination={{ 
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.2,
              spaceBetween: 24,
            },
          }}
          className="features-swiper-pagination max-w-md mx-auto px-5"
          style={{
            paddingBottom: "3.5rem"
          }}
        >
          {Array.from({ length: N_CARDS }).map((_, i) => (
            <SwiperSlide key={i}>
              <div style={{ height: "280px" }}>
                <FeatureCard
                  feature={features[i % features.length]}
                  index={i}
                  isStacked={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

// ─── FeatureCard ──────────────────────────────────────────────────────────────

// Placeholder images (diferentes para cada feature)
const FEATURE_IMAGES = [
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop", // RSVP - personas/grupo
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop", // Álbum - fotos/momentos
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop", // Música - auriculares/audio
  "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800&h=600&fit=crop", // Regalos - gift/presente
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop", // Ubicación - mapa/ciudad
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", // Dashboard - gráficos/analytics
];

function FeatureCard({
  feature,
  index,
  isStacked
}: {
  feature?: { title: string; description: string; icon?: string },
  index?: number,
  isStacked?: boolean
}) {
  if (!feature) return null;

  const idx = index || 0;
  const imageUrl = FEATURE_IMAGES[idx];
  const showDescription = isStacked === true;

  // Diseño premium: imagen flotante + contenido abajo
  return (
    <article
      className="feature-card relative flex flex-col"
      style={{
        height: "100%",
        width: "100%",
        padding: "1.5rem",
      }}
    >
      {/* Background animado (transparente → sólido cuando se apila) */}
      <div
        className="card-background absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(10, 10, 10, 0)",
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
          borderRadius: "1.5rem",
          zIndex: -1,
          transition: "all 0.8s ease",
        }}
      />

      {/* Imagen flotante con sombra difusa */}
      <div
        className="relative mb-6 flex-shrink-0"
        style={{
          height: "65%",
          filter: "drop-shadow(0 20px 60px rgba(0, 0, 0, 0.4))",
        }}
      >
        <div
          className="relative overflow-hidden h-full"
          style={{
            borderRadius: "1.25rem",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          />
          {/* Overlay gradiente sutil */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.2) 100%)",
            }}
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col">
        <h3
          className="font-bold text-white"
          style={{
            fontSize: showDescription ? "clamp(1.15rem, 1.5vw, 1.4rem)" : "clamp(1rem, 1.3vw, 1.2rem)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            marginBottom: showDescription ? "0.625rem" : "0",
          }}
        >
          {feature.title}
        </h3>
        {showDescription && (
          <p
            className="leading-relaxed"
            style={{
              fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
              color: "rgba(255, 255, 255, 0.65)",
              lineHeight: 1.6,
            }}
          >
            {feature.description}
          </p>
        )}
      </div>
    </article>
  );
}
