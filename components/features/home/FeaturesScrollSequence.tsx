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
  { top: "20%",  right: "15%" },   // 0 – top-right
  { top: "12%",  left: "50%", xPercent: -50 },  // 1 – top-center (centered with xPercent)
  { top: "20%",  left: "15%" },    // 2 – top-left
  { bottom: "20%", left: "15%" },  // 3 – bottom-left
  { bottom: "12%", left: "50%", xPercent: -50 }, // 4 – bottom-center (centered with xPercent)
  { bottom: "20%", right: "15%" }, // 5 – bottom-right
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
  const eyebrowRef        = useRef<HTMLParagraphElement>(null);
  const cardRefs          = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorsRef     = useRef<HTMLDivElement>(null);
  const overlayRef        = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const desktopSection = desktopSectionRef.current;
    const titleWrap      = titleWrapRef.current;
    const eyebrow        = eyebrowRef.current;
    const indicators     = indicatorsRef.current;
    const overlay        = overlayRef.current;
    if (!desktopSection || !titleWrap) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const n = N_CARDS;

    // Initial states
    gsap.set(titleWrap, { scale: 1, yPercent: 0, transformOrigin: "50% 50%" });
    if (eyebrow)    gsap.set(eyebrow,    { autoAlpha: 1, yPercent: 0 });
    if (indicators) gsap.set(indicators, { autoAlpha: 0, y: 20 });
    if (overlay)    gsap.set(overlay,    { autoAlpha: 0 });

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
        const phase3 = window.innerHeight * n * 1.5;
        const phase4 = window.innerHeight * 0.3;
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

        // ── Phase 3: Show indicators then focus cards one by one ──
        const focusPhaseStart = cardStart + n * cardStep + 0.5;

        if (indicators) {
          tl.to(indicators, {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          }, focusPhaseStart);
        }

        const focusStep = 3;

        cards.forEach((card, i) => {
          const startTime = focusPhaseStart + 0.3 + i * focusStep;

          // Show overlay
          if (overlay) {
            tl.to(overlay, {
              autoAlpha: 1,
              duration: focusStep * 0.2,
              ease: "power2.out",
            }, startTime);
          }

          // Focus this card - move to center using absolute positioning
          tl.to(card, {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            width: "70vh",
            height: "70vh",
            scale: 1,
            zIndex: 100,
            opacity: 1,
            rotation: 0,
            duration: focusStep * 0.25,
            ease: "power2.out",
            onStart: () => setActiveIndex(i),
          }, startTime);

          // Return to position
          const returnTime = startTime + focusStep * 0.65;
          const slot = CARD_SLOTS[i];

          // Hide overlay
          if (overlay) {
            tl.to(overlay, {
              autoAlpha: 0,
              duration: focusStep * 0.15,
              ease: "power2.in",
            }, returnTime);
          }

          tl.to(card, {
            left: slot.left || "auto",
            right: slot.right || "auto", 
            top: slot.top || "auto",
            bottom: slot.bottom || "auto",
            width: "clamp(220px, 18vw, 280px)",
            height: "clamp(220px, 18vw, 280px)",
            xPercent: slot.xPercent ?? 0,
            yPercent: 0,
            x: 0,
            y: 0,
            scale: 1,
            rotation: CARD_ROTATIONS[i] ?? 0,
            zIndex: 20,
            duration: focusStep * 0.25,
            ease: "power2.inOut",
            onComplete: i === n - 1 ? () => setActiveIndex(null) : undefined,
          }, returnTime);
        });

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
        {/* Gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(188,129,41,0.04) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(32,0,65,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Overlay for focus effect */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: "rgba(0,0,0,0.75)",
            zIndex: 50,
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
              width: "clamp(220px, 18vw, 280px)",
              height: "clamp(220px, 18vw, 280px)",
              zIndex: activeIndex === i ? 100 : 20,
              visibility: "hidden",
            }}
          >
            <FeatureCard feature={features[i % features.length]} />
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
                <FeatureCard feature={features[i % features.length]} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

// ─── FeatureCard ──────────────────────────────────────────────────────────────

function FeatureCard({ feature }: { feature?: { title: string; description: string } }) {
  if (!feature) return null;
  
  return (
    <article
      className="p-6 flex flex-col justify-center"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(32,0,65,0.07)",
        borderRadius: "1.5rem",
        height: "100%",
        width: "100%",
        boxShadow: "0 8px 32px rgba(32,0,65,0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}
    >
      <h3 
        className="font-semibold mb-3"
        style={{ 
          fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)", 
          color: "#200041",
          lineHeight: 1.3
        }}
      >
        {feature.title}
      </h3>
      <p 
        className="leading-relaxed"
        style={{
          fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
          color: "rgba(32,0,65,0.7)",
          lineHeight: 1.6
        }}
      >
        {feature.description}
      </p>
    </article>
  );
}
