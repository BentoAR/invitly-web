"use client";

import { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  location: string;
  eventType: string;
  eventDate: string;
  quote: string;
}

interface TestimonialsClientProps {
  badge: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export default function TestimonialsClient({
  badge,
  title,
  subtitle,
  testimonials,
}: TestimonialsClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Memoizar handlers para evitar recrearlos y facilitar cleanup
  const handleMouseEnter = useCallback((card: HTMLDivElement) => () => {
    gsap.to(card, {
      y: -6,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback((card: HTMLDivElement) => () => {
    gsap.to(card, {
      y: 0,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const contentWrapper = contentWrapperRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !contentWrapper) return;

    // Delay mayor para esperar a que Features se inicialice completamente
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1000);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Estado inicial del wrapper: más pequeño en el centro con border-radius y sombra
      gsap.set(contentWrapper, {
        scale: 0.75,
        borderRadius: "32px",
        boxShadow: "0 20px 60px rgba(32, 0, 65, 0.12)",
      });

      // Pin de la sección con animación scrub de expansión
      // refreshPriority muy bajo para que se calcule DESPUÉS de Features
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%", // Pin total más largo
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -100, // Prioridad muy baja para no interferir con Features
          id: "testimonials-pin",
        },
      });

      // Animación de expansión (solo la primera parte del timeline)
      tl.to(contentWrapper, {
        scale: 1,
        borderRadius: "0px",
        boxShadow: "0 0px 0px rgba(32, 0, 65, 0)",
        ease: "none",
        duration: 0.6, // 60% del timeline - se expande rápido
      })
      // Hold (el resto del tiempo se queda fijo)
      .to({}, { duration: 0.4 }); // 40% restante - aguanta en pantalla completa

      // Hover animations para las cards con cleanup correcto
      const cardHandlers: Array<{ card: HTMLDivElement; enter: () => void; leave: () => void }> = [];

      cards.forEach((card) => {
        if (!card) return;

        const enterHandler = handleMouseEnter(card);
        const leaveHandler = handleMouseLeave(card);

        card.addEventListener("mouseenter", enterHandler);
        card.addEventListener("mouseleave", leaveHandler);

        cardHandlers.push({ card, enter: enterHandler, leave: leaveHandler });
      });

      // Cleanup de event listeners
      return () => {
        cardHandlers.forEach(({ card, enter, leave }) => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        });
      };
    }, section);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        zIndex: 40,
        position: "relative",
        isolation: "isolate",
      }}
    >

      <div
        ref={contentWrapperRef}
        className="w-full h-full overflow-hidden relative"
        style={{
          willChange: "transform, border-radius, box-shadow",
          zIndex: 10,
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 60px rgba(32, 0, 65, 0.12)"
        }}
      >
        <div className="h-full flex flex-col justify-center py-12 md:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 w-full">
            <div className="text-center mb-16">
              <p
                className="font-mono text-xs tracking-[0.35em] uppercase mb-5"
                style={{ color: "#bc8129" }}
              >
                {badge}
              </p>
              <h2
                className="font-display font-normal leading-[1.08] mb-4"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "#200041",
                  letterSpacing: "-0.03em",
                }}
              >
                {title}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-secondary/10 p-6 cursor-pointer transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #bc8129, #200041)" }}
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-foreground/80 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-0.5" aria-label="5 estrellas">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <span key={si} className="inline-block" aria-hidden="true">
                          <svg className="h-4 w-4 fill-primary text-primary" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-foreground mt-1">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.eventType} · {t.eventDate} · {t.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
