"use client";

import { Container } from "@/components/shared/Container";
import { TemplatesHeader } from "@/components/features/templates/TemplatesHeader";
import { InvitationsList } from "@/components/features/templates/InvitationsList";
import { CategorySelect } from "@/components/features/templates/CategorySelect";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TemplatesSection() {
  const t = useTranslations("Templates");
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const ctx = gsap.context(() => {
      // Initial dome curve - very pronounced semicircle
      const startCurve = "M 0 600 Q 50 -50, 100 600 L 100 700 L 0 700 Z";
      // Final flattened curve
      const endCurve = "M 0 600 Q 50 595, 100 600 L 100 700 L 0 700 Z";

      // Set initial state
      gsap.set(path, { attr: { d: startCurve } });

      // Animate the dome flattening on scroll
      gsap.to(path, {
        attr: { d: endCurve },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
          pinSpacing: false,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>

      {/* Dome Section */}
      <section
        ref={sectionRef}
        id="invitaciones"
        className="relative min-h-screen"
        style={{
          backgroundColor: "#EDE9DA",
          zIndex: 30, // Mayor que HowItWorks (25) para taparlo
          position: "relative",
          isolation: "isolate",
        }}
        role="main"
      >
        {/* SVG Dome Shape - sobresale hacia arriba para crear el efecto */}
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{
            height: "70vh",
            transform: "translateY(calc(-70vh + 1px))",
          }}
          viewBox="0 0 100 700"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            fill="#EDE9DA"
            d="M 0 600 Q 50 -50, 100 600 L 100 700 L 0 700 Z"
          />
        </svg>

        {/* Contenido de Templates */}
        <div className="relative z-10">
          <Container>
            <TemplatesHeader
              title={t("featuredInvitations")}
              description={t("featuredDescription")}
            />
            <CategorySelect />
            <InvitationsList />
          </Container>
        </div>
      </section>
    </>
  );
}
