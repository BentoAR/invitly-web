"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

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
}

const WA_URL = "https://wa.me/541162183918?text=" + encodeURIComponent("Hola! Quiero consultar sobre Bento 👋");

export default function CtaSplitClient({ right }: CtaSplitClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rightEl = rightColRef.current;
    if (!rightEl) return;

    if (window.innerWidth < 1024) return;

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      gsap.set(rightEl, { autoAlpha: 0, y: 40 });
      gsap.fromTo(
        rightEl,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, ease: "power3.out",
          scrollTrigger: {
            trigger: rightEl,
            start: "top 88%",
            end: "top 50%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

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
        <div className="w-full max-w-2xl mx-auto">
          <div
            ref={rightColRef}
            className="flex flex-col justify-center gap-4 px-2 py-6 sm:p-8 sm:rounded-2xl sm:border sm:border-border/60 sm:bg-background/50"
            style={{ willChange: "transform, opacity" }}
          >
            <p className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: "#9B5A00" }}>
              {right.badge}
            </p>
            <h3
              className="font-display font-normal leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#200041", letterSpacing: "-0.02em" }}
            >
              {right.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{right.description}</p>
            <Link href={WA_URL} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button size="lg" className="w-full group relative overflow-hidden">
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
            </Link>
            <p className="text-xs text-muted-foreground">{right.footer}</p>
          </div>
        </div>
      </Container>

    </div>
  );
}
