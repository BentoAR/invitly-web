"use client";

import { InvitationsList } from "@/components/features/templates/InvitationsList";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TemplatesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const ctx = gsap.context(() => {
      const startCurve = "M 0 600 Q 50 -50, 100 600 L 100 700 L 0 700 Z";
      const endCurve = "M 0 600 Q 50 500, 100 600 L 100 700 L 0 700 Z";

      gsap.set(path, { attr: { d: startCurve } });

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
    <section
      ref={sectionRef}
      id="invitaciones"
      className="relative min-h-screen md:-mt-[100vh]"
      style={{
        backgroundColor: "#EDE9DA",
        zIndex: 30,
        position: "relative",
        isolation: "isolate",
      }}
      role="main"
    >
      {/* SVG Dome — solo desktop */}
      <svg
        ref={svgRef}
        className="hidden md:block absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: "70vh", transform: "translateY(calc(-70vh + 1px))" }}
        viewBox="0 0 100 700"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          fill="#EDE9DA"
          d="M 0 600 Q 50 -50, 100 600 L 100 700 L 0 700 Z"
        />
      </svg>

      <div className="relative z-10">
        {/* Título mobile — visible solo en mobile */}
        <div className="md:hidden px-4 pt-12 pb-6">
          <p
            className="font-mono uppercase mb-3"
            style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "#bc8129" }}
          >
            +15 plantillas
          </p>
          <h2
            className="font-display font-normal leading-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 2.8rem)", color: "#200041", letterSpacing: "-0.03em" }}
          >
            Invitaciones
          </h2>
        </div>

        <InvitationsList />
      </div>
    </section>
  );
}
