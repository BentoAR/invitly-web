"use client";

import { useLayoutEffect, useRef } from "react";
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
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const tagline = taglineRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !tagline || !titleEl || !subtitleEl) return;

    // Esperamos a que ScrollTrigger se actualice después de que las secciones pinned se inicialicen
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 500);

    const ctx = gsap.context(() => {
      // Estado inicial
      gsap.set([tagline, titleEl, subtitleEl], { y: 40, opacity: 0 });
      gsap.set(cards, { y: 60, opacity: 0, scale: 0.95 });

      // Timeline para entrada del header
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1, // Se calcula después del carrusel pinned
        },
      });

      headerTl
        .to(tagline, { y: 0, opacity: 1, ease: "none" })
        .to(titleEl, { y: 0, opacity: 1, ease: "none" }, "-=0.5")
        .to(subtitleEl, { y: 0, opacity: 1, ease: "none" }, "-=0.5");

      // Timeline para salida del header
      const headerOutTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });

      headerOutTl
        .to(tagline, { y: -30, opacity: 0, ease: "none" })
        .to(titleEl, { y: -30, opacity: 0, ease: "none" }, "-=0.5")
        .to(subtitleEl, { y: -30, opacity: 0, ease: "none" }, "-=0.5");

      // Timeline para entrada de las cards
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
          end: "top 40%",
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });

      cards.forEach((card, i) => {
        cardsTl.to(card, { y: 0, opacity: 1, scale: 1, ease: "none" }, i * 0.1);
      });

      // Timeline para salida de las cards
      const cardsOutTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });

      cards.forEach((card, i) => {
        cardsOutTl.to(card, { y: -40, opacity: 0, scale: 0.95, ease: "none" }, i * 0.05);
      });

      // Hover animations para las cards
      cards.forEach((card) => {
        if (!card) return;

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -6,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 0px 0px rgba(0,0,0,0)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, section);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative py-12 md:py-24 bg-background overflow-hidden"
      style={{ zIndex: 40, position: "relative", isolation: "isolate" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <p
            ref={taglineRef}
            className="font-mono text-xs tracking-[0.35em] uppercase mb-5"
            style={{ color: "#bc8129" }}
          >
            {badge}
          </p>
          <h2
            ref={titleRef}
            className="font-display font-normal leading-[1.08] mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#200041",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </h2>
          <p ref={subtitleRef} className="text-muted-foreground max-w-xl mx-auto">
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
    </section>
  );
}
