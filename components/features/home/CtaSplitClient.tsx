"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ContactForm from "@/components/features/contact/ContactForm";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const APP_URL = "https://app.bento.com.ar";

interface CtaSplitClientProps {
  left: {
    badge: string;
    title: string;
    description: string;
    cta: string;
    footer: string;
  };
  right: {
    badge: string;
    title: string;
    description: string;
    cta: string;
    footer: string;
  };
  contactDialogTitle: string;
}

export default function CtaSplitClient({ left, right, contactDialogTitle }: CtaSplitClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const leftEl = leftColRef.current;
    const rightEl = rightColRef.current;
    if (!leftEl || !rightEl) return;

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      // Only animate on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(leftEl, { autoAlpha: 0, x: -60 });
        gsap.set(rightEl, { autoAlpha: 0, x: 60 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: leftEl,
            start: "top 88%",
            end: "top 30%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          leftEl,
          { autoAlpha: 0, x: -60 },
          { autoAlpha: 1, x: 0, ease: "power3.out", duration: 0.6 },
          0
        ).fromTo(
          rightEl,
          { autoAlpha: 0, x: 60 },
          { autoAlpha: 1, x: 0, ease: "power3.out", duration: 0.6 },
          0.1
        );
      });

      // Shimmer en loop sobre el CTA
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
    <div ref={sectionRef} className="py-8 md:py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Self-service */}
          <div
            ref={leftColRef}
            className="flex flex-col gap-5 p-8 border-0 md:rounded-2xl md:border md:border-primary/30 bg-background"
            style={{ willChange: "transform, opacity" }}
          >
            <div>
              <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#bc8129" }}>
                {left.badge}
              </p>
              <h3
                className="font-display font-normal leading-tight mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#200041", letterSpacing: "-0.02em" }}
              >
                {left.title}
              </h3>
              <p className="text-sm text-muted-foreground">{left.description}</p>
            </div>
            <Link href={`${APP_URL}/register`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full group">
                {left.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">{left.footer}</p>
          </div>

          <div
            ref={rightColRef}
            className="flex flex-col justify-center gap-4 p-8 border-0 md:rounded-2xl md:border md:border-border/60 bg-background/50"
            style={{ willChange: "transform, opacity" }}
          >
            <p className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: "#bc8129" }}>
              {right.badge}
            </p>
            <h3
              className="font-display font-normal leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#200041", letterSpacing: "-0.02em" }}
            >
              {right.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{right.description}</p>
            <Button size="lg" className="w-full group relative overflow-hidden" onClick={() => setIsContactOpen(true)}>
              <Mail className="mr-2 h-4 w-4" />
              {right.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
            <p className="text-xs text-muted-foreground">{right.footer}</p>
          </div>
        </div>
      </Container>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl" style={{ color: "#200041" }}>
              {contactDialogTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <ContactForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
