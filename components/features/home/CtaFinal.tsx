"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import Link from "next/link";
import ContactInfo from "@/components/features/contact/ContactInfo";
import ContactForm from "@/components/features/contact/ContactForm";
import ContactTitle from "@/components/features/contact/ContactTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const APP_URL = "https://app.bento.com.ar";

export default function CtaFinal() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const left = leftColRef.current;
    const right = rightColRef.current;
    const form = formRef.current;
    if (!left || !right || !form) return;

    // Estados iniciales
    gsap.set(left, { autoAlpha: 0, x: -60 });
    gsap.set(right, { autoAlpha: 0, x: 60 });
    gsap.set(form, { autoAlpha: 0, y: 50 });

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      // Split divergente con scrub suave
      gsap.fromTo(
        left,
        { autoAlpha: 0, x: -60 },
        {
          autoAlpha: 1, x: 0, ease: "power3.out",
          scrollTrigger: {
            trigger: left,
            start: "top 85%", end: "top 50%",
            scrub: 1.2, invalidateOnRefresh: true,
          },
        }
      );
      gsap.fromTo(
        right,
        { autoAlpha: 0, x: 60 },
        {
          autoAlpha: 1, x: 0, ease: "power3.out",
          scrollTrigger: {
            trigger: right,
            start: "top 85%", end: "top 50%",
            scrub: 1.2, invalidateOnRefresh: true,
          },
        }
      );

      // Formulario desde abajo
      gsap.fromTo(
        form,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1, y: 0, ease: "power3.out",
          scrollTrigger: {
            trigger: form,
            start: "top 88%", end: "top 60%",
            scrub: 1, invalidateOnRefresh: true,
          },
        }
      );

      // Shimmer en loop sobre el botón CTA
      if (shimmerRef.current) {
        gsap.set(shimmerRef.current, { x: "-110%" });
        gsap.to(shimmerRef.current, {
          x: "220%",
          duration: 1.6,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 2.8,
          delay: 2,
        });
      }
    }, sectionRef);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="contacto" className="py-24 bg-secondary/20">
      <Container>
        {/* Dual CTA — split divergente */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {/* Self-service */}
          <div
            ref={leftColRef}
            className="flex flex-col gap-5 rounded-2xl border border-primary/30 bg-background p-8"
            style={{ willChange: "transform, opacity" }}
          >
            <div>
              <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#bc8129" }}>
                Empezá ahora
              </p>
              <h3
                className="font-display font-normal leading-tight mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#200041", letterSpacing: "-0.02em" }}
              >
                Tu evento se merece la mejor invitación
              </h3>
              <p className="text-sm text-muted-foreground">
                Creá tu primera invitación gratis en menos de 5 minutos.
              </p>
            </div>

            <Link href={`${APP_URL}/register`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full group relative overflow-hidden">
                Crear mi invitación gratis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                {/* Shimmer dorado */}
                <span
                  ref={shimmerRef}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                    willChange: "transform",
                  }}
                  aria-hidden="true"
                />
              </Button>
            </Link>

            <p className="text-xs text-muted-foreground">
              Sin tarjeta de crédito · Cancelás cuando querés · Soporte en español
            </p>
          </div>

          {/* Contact */}
          <div
            ref={rightColRef}
            className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-background/50 p-8"
            style={{ willChange: "transform, opacity" }}
          >
            <div>
              <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#bc8129" }}>
                ¿Tenés preguntas?
              </p>
              <h3
                className="font-display font-normal leading-tight mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#200041", letterSpacing: "-0.02em" }}
              >
                Hablá con nosotros
              </h3>
              <p className="text-sm text-muted-foreground">
                Por WhatsApp, email o Instagram. Te respondemos rápido.
              </p>
            </div>
            <ContactInfo />
          </div>
        </div>

        {/* Formulario */}
        <div
          ref={formRef}
          className="max-w-2xl mx-auto"
          style={{ willChange: "transform, opacity" }}
        >
          <ContactTitle />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
