"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/shared/Container";
import ContactInfo from "@/components/features/contact/ContactInfo";
import ContactForm from "@/components/features/contact/ContactForm";
import ContactTitle from "@/components/features/contact/ContactTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaFinal() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const right = rightColRef.current;
    const form = formRef.current;
    if (!right || !form) return;

    gsap.set(right, { autoAlpha: 0, x: 60 });
    gsap.set(form, { autoAlpha: 0, y: 50 });

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="contacto" className="py-12 md:py-24 bg-secondary/20">
      <Container>
        {/* CTA — contacto */}
        <div className="max-w-lg mx-auto mb-20">
          <div
            ref={rightColRef}
            className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-background/50 p-8"
            style={{ willChange: "transform, opacity" }}
          >
            <div>
              <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#9B5A00" }}>
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
