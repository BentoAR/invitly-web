"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ClipboardCheck, Image, Music, LayoutDashboard, Users, Headphones, type LucideIcon } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

type Feature = { title: string; description: string; icon?: string };

// Iconos de Lucide por índice (orden en el array de features)
const FEATURE_ICONS_BY_INDEX: LucideIcon[] = [
  ClipboardCheck,  // 0: Invitación digital completa
  Image,           // 1: Álbum de fotos colaborativo
  Music,           // 2: Playlist de la fiesta
  LayoutDashboard, // 3: Dashboard en vivo
  Users,           // 4: Gestión completa del evento
  Headphones,      // 5: Soporte dedicado
];

// Posiciones iniciales en X: alternan entre izquierda (-) y derecha (+)
// Más cerca del centro para que pasen por el medio
const getInitialX = (index: number) => {
  const isLeft = index % 2 === 0;
  return isLeft ? -350 : 350; // Más cerca del centro
};

// Helper para aplicar estilos especiales a palabras específicas del título
const formatTitle = (title: string) => {
  // Palabras que llevan estilo especial (cursiva + gris)
  const specialWords = ["invitación", "invitation"];

  const words = title.split(" ");
  return words.map((word, i) => {
    const isSpecial = specialWords.some(sw => word.toLowerCase().includes(sw.toLowerCase()));
    if (isSpecial) {
      return (
        <span key={i} style={{ fontStyle: "italic", color: "#9ca3af" }}>
          {word}{i < words.length - 1 ? " " : ""}
        </span>
      );
    }
    return word + (i < words.length - 1 ? " " : "");
  });
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturesScrollSequence({
  features,
  sectionTitle,
}: {
  features: Feature[];
  sectionTitle: string;
}) {
  const desktopSectionRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const desktopSection = desktopSectionRef.current;
    const titleWrap = titleWrapRef.current;
    if (!desktopSection || !titleWrap) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const n = features.length;

    // Estado inicial: cards abajo del viewport con blur, alternando izquierda/derecha
    cards.forEach((card, i) => {
      gsap.set(card, {
        x: getInitialX(i),
        y: 400, // Más abajo del viewport
        opacity: 0,
        filter: "blur(10px)",
      });
    });

    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        // Duración total del scroll: 1 viewport por card + hold inicial
        const scrollDist = window.innerHeight * (n + 1);

        // Pin de la sección
        ScrollTrigger.create({
          trigger: desktopSection,
          pin: true,
          start: "top top",
          end: `+=${scrollDist}`,
          anticipatePin: 1,
        });

        // Timeline principal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopSection,
            start: "top top",
            end: `+=${scrollDist}`,
            scrub: 1.8,
          },
        });

        // Título se achica gradualmente al inicio
        tl.to(
          titleWrap,
          {
            scale: 0.75,
            duration: 1,
            ease: "power2.inOut"
          },
          0
        );

        // Cuando empiezan a pasar las cards, el título pierde opacidad (pero mantiene el scale)
        tl.to(
          titleWrap,
          {
            opacity: 0.3,
            duration: 0.4,
            ease: "power2.out"
          },
          1 // Justo cuando empieza la primera card
        );

        // Cada card sube en línea recta desde bottom hasta top (sin moverse en X)
        cards.forEach((card, i) => {
          const startTime = 1 + i * 1.5;
          const lateralX = getInitialX(i); // Posición fija en X (izq o der)

          // Movimiento Y: bottom → top (lineal, constante)
          tl.fromTo(
            card,
            { x: lateralX, y: 400 },
            {
              x: lateralX,
              y: -350,
              duration: 1.8,
              ease: "none" // Movimiento constante
            },
            startTime
          );

          // Fade in + blur out (entrada) - duración más larga para efecto más suave
          tl.fromTo(
            card,
            { opacity: 0, filter: "blur(10px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out"
            },
            startTime
          );

          // Fade out + blur (salida)
          tl.to(
            card,
            {
              opacity: 0,
              filter: "blur(10px)",
              duration: 0.3,
              ease: "power2.in"
            },
            startTime + 1.5 // Desaparece al final del recorrido
          );
        });

        // Hold final
        tl.to({}, { duration: 0.8 });

        return () => {};
      });

      // Mobile: sin animaciones
      gsap.matchMedia().add("(max-width: 1023px)", () => {
        return () => {};
      });
    }, desktopSection);

    return () => ctx.revert();
  }, [features.length]);

  return (
    <>
      {/* ══ DESKTOP ══ */}
      <section
        id="caracteristicas"
        ref={desktopSectionRef}
        aria-label={sectionTitle}
        className="hidden lg:block relative"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {/* Título fijo centrado */}
        <div
          ref={titleWrapRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 10, pointerEvents: "none" }}
        >
          <h2
            className="font-display font-normal text-center leading-tight"
            style={{
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              color: "#200041",
              letterSpacing: "-0.03em",
            }}
          >
            {formatTitle(sectionTitle)}
          </h2>
        </div>

        {/* Cards que pasan por el centro */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 20, pointerEvents: "none" }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute"
            >
              <MinimalFeatureCard feature={feature} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ MOBILE ══ */}
      <section
        id="caracteristicas-mobile"
        aria-label={sectionTitle}
        className="lg:hidden py-12 md:py-20 relative"
      >
        <div className="text-center px-6 mb-12 relative z-10">
          <h2
            className="font-display font-normal leading-tight"
            style={{
              fontSize: "clamp(2rem, 8vw, 3rem)",
              color: "#200041",
              letterSpacing: "-0.03em",
            }}
          >
            {formatTitle(sectionTitle)}
          </h2>
        </div>

        <div className="space-y-6 px-6 max-w-2xl mx-auto relative z-10">
          {features.map((feature, i) => (
            <div key={i}>
              <MinimalFeatureCard feature={feature} index={i} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── MinimalFeatureCard ───────────────────────────────────────────────────────

function MinimalFeatureCard({ feature, index }: { feature: Feature; index: number }) {
  // Obtener el ícono correspondiente por índice
  const IconComponent = FEATURE_ICONS_BY_INDEX[index];

  return (
    <div
      className="flex items-start gap-6 px-8 py-7"
      style={{
        border: "1px solid rgba(32, 0, 65, 0.08)",
        borderRadius: "1.75rem",
        backgroundColor: "#ffffff",
        maxWidth: "820px",
        minHeight: "120px",
        boxShadow: "0 4px 24px rgba(32, 0, 65, 0.06)",
      }}
    >
      {/* Ícono Lucide outline */}
      <div className="shrink-0 flex items-center justify-center pt-1">
        {IconComponent ? (
          <IconComponent
            size={34}
            strokeWidth={1.5}
            style={{ color: "#200041", opacity: 0.9 }}
          />
        ) : (
          <div style={{ width: 34, height: 34 }} />
        )}
      </div>

      {/* Texto */}
      <div className="flex-1">
        <h3
          className="mb-2"
          style={{
            fontSize: "1.3rem",
            lineHeight: 1.25,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#200041",
          }}
        >
          {feature.title}
        </h3>
        <p
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            fontWeight: 400,
            maxWidth: "55ch",
            color: "rgba(32, 0, 65, 0.6)",
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}
