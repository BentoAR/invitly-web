"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = { number: string; title: string; description: string };

const GRID_COLS: [number, number, number][][] = [
  [[0, 0, 100], [3, 0, 78], [5, 0,  90]],
  [[5, 0, 100], [4, 0,  85], [3, 0, 100]],
  [[2, 0,  88], [5, 0, 100], [3, 0,  80]],
];

const STEP_FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorksClient({
  steps,
  sectionTitle,
  subtitle,
  templateImages = [],
}: {
  steps: Step[];
  sectionTitle: string;
  subtitle: string;
  templateImages?: string[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const bgNumRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rightPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const n = steps.length;
    const section = sectionRef.current;
    if (!section || n === 0) return;

    const ctx = gsap.context(() => {
      // Todo el código GSAP corre exclusivamente en desktop (≥1024px).
      // En mobile, los gsap.set iniciales NO se aplican, por lo que
      // los elementos permanecen visibles sin intervención de GSAP.
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        const heights = descRefs.current.map((el) => (el ? el.offsetHeight : 0));

        // Estado inicial de los paneles del lado derecho
        rightPanelRefs.current.forEach((el, i) => {
          gsap.set(el, { y: i === 0 ? "0%" : "100%" });
        });

        // Estado inicial de descripciones, títulos, números y dots
        descRefs.current.forEach((el, i) => {
          gsap.set(el, { height: i === 0 ? heights[i] : 0, autoAlpha: i === 0 ? 1 : 0, overflow: "hidden" });
        });
        titleRefs.current.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0.35 }));
        bgNumRefs.current.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));
        dotRefs.current.forEach((el, i) => gsap.set(el, { scale: i === 0 ? 1 : 0.5, opacity: i === 0 ? 1 : 0.3 }));

        // Animación de entrada en desktop
        gsap.set(headerRef.current, { autoAlpha: 0, y: 16 });
        gsap.set([contentRef.current, dotsContainerRef.current], { autoAlpha: 0, x: -80 });
        gsap.set(bgContainerRef.current, { autoAlpha: 0 });

        const entranceTl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 60%", end: "top top", scrub: 1.2 },
        });
        entranceTl
          .fromTo(bgContainerRef.current, { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", duration: 0.4 })
          .fromTo(headerRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.5 }, 0.4)
          .fromTo(contentRef.current, { x: -80, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.out", duration: 0.5 }, 0.55)
          .fromTo(dotsContainerRef.current, { x: -80, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.out", duration: 0.4 }, 0.7)
          .fromTo(rightPanelRefs.current[0], { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.out", duration: 0.5 }, 0.5);

        // Pin de la sección (solo desktop)
        const scrollLength = (n - 1) * window.innerHeight * 2.2;
        ScrollTrigger.create({
          trigger: section,
          pin: true,
          start: "top top",
          end: `+=${scrollLength}`,
          anticipatePin: 1,
        });

        // Parallax de columnas del panel derecho
        const colParallax = [
          { from:   0, to: 280 },
          { from: 220, to:   0 },
          { from:   0, to: 280 },
        ];
        colRefs.current.forEach((el, ci) => {
          if (!el) return;
          const { from, to } = colParallax[ci];
          gsap.fromTo(el,
            { y: from },
            { y: to, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: `+=${scrollLength}`, scrub: 0.8 } }
          );
        });

        // Timeline principal de transición entre steps
        const stepTl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top top", end: `+=${scrollLength}`, scrub: 1.6 },
        });

        stepTl.to({}, { duration: 1.5 });

        for (let i = 0; i < n - 1; i++) {
          stepTl.to(descRefs.current[i], { height: 0, autoAlpha: 0, duration: 0.6, ease: "power2.in" });
          stepTl.to(titleRefs.current[i], { opacity: 0.35, duration: 0.6 }, "<");
          stepTl.to(bgNumRefs.current[i], { autoAlpha: 0, duration: 0.5 }, "<");
          stepTl.to(dotRefs.current[i], { scale: 0.5, opacity: 0.3, duration: 0.4 }, "<");

          stepTl.to(rightPanelRefs.current[i + 1], { y: "0%", duration: 0.9, ease: "power3.out" }, "<0.05");

          stepTl.to(descRefs.current[i + 1], { height: heights[i + 1], autoAlpha: 1, duration: 0.7, ease: "power2.out" });
          stepTl.to(titleRefs.current[i + 1], { opacity: 1, duration: 0.6 }, "<");
          stepTl.to(bgNumRefs.current[i + 1], { autoAlpha: 1, duration: 0.6 }, "<");
          stepTl.to(dotRefs.current[i + 1], { scale: 1, opacity: 1, duration: 0.4 }, "<");

          stepTl.to({}, { duration: 1.5 });
        }

        // Cleanup automático cuando matchMedia deja de aplicar
        return () => {};
      });
    }, section);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <>
      {/* ─── MOBILE LAYOUT (< lg) ─── */}
      <section
        id="como-funciona"
        className="lg:hidden px-6 py-20"
        style={{ backgroundColor: "#ffffff" }}
        aria-label={sectionTitle}
      >
        {/* Header mobile */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "rgba(32,0,65,0.4)" }}>
            {subtitle}
          </p>
          <h2
            className="font-display font-normal"
            style={{ fontSize: "clamp(1.75rem, 7vw, 2.5rem)", color: "#200041", letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            {sectionTitle}
          </h2>
        </motion.div>

        {/* Steps verticales */}
        <ol className="relative space-y-0">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;

            return (
              <motion.li
                key={i}
                className="relative pl-10"
                variants={STEP_FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              >
                {/* Línea vertical conectora */}
                {!isLast && (
                  <span
                    className="absolute left-[0.6rem] top-8 bottom-0 w-px"
                    style={{ backgroundColor: "rgba(32,0,65,0.10)" }}
                    aria-hidden="true"
                  />
                )}

                {/* Dot indicador */}
                <span
                  className="absolute left-0 top-[0.45rem] w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: "#bc8129", backgroundColor: "#ffffff" }}
                  aria-hidden="true"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#bc8129" }}
                  />
                </span>

                <div className="pb-12">
                  {/* Número del step */}
                  <p
                    className="font-mono text-[0.65rem] tracking-[0.25em] uppercase mb-2"
                    style={{ color: "#bc8129" }}
                  >
                    {step.number}
                  </p>

                  {/* Título */}
                  <h3
                    className="font-display font-normal mb-3"
                    style={{ fontSize: "clamp(1.2rem, 5vw, 1.5rem)", color: "#200041", letterSpacing: "-0.02em", lineHeight: 1.25 }}
                  >
                    {step.title}
                  </h3>

                  {/* Descripción */}
                  <p
                    className="mb-6"
                    style={{ fontSize: "0.9375rem", color: "rgba(32,0,65,0.55)", lineHeight: "1.75", maxWidth: "40ch" }}
                  >
                    {step.description}
                  </p>

                  {/* Imagen preview del step */}
                  {i === 0 && templateImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {templateImages.slice(0, 4).map((src, ti) => (
                        <div key={ti} className="relative overflow-hidden" style={{ borderRadius: 10, aspectRatio: "3/4", boxShadow: "0 4px 16px rgba(32,0,65,0.10)" }}>
                          <Image src={src} alt="" fill className="object-cover" unoptimized aria-hidden="true" />
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 1 && (
                    <div className="relative w-full overflow-hidden" style={{ borderRadius: 16, aspectRatio: "4/3", boxShadow: "0 8px 32px rgba(32,0,65,0.12)" }}>
                      <Image
                        src="https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/backgrounds/optimized.webp"
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.25)" }} />
                    </div>
                  )}
                  {i === 2 && templateImages.length > 0 && (
                    <div className="relative w-full overflow-hidden" style={{ borderRadius: 16, aspectRatio: "4/3", boxShadow: "0 8px 32px rgba(32,0,65,0.12)" }}>
                      <Image src={templateImages[4 % templateImages.length]} alt="" fill className="object-cover" unoptimized aria-hidden="true" />
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </section>

      {/* ─── DESKTOP LAYOUT (≥ lg) ─── */}
      <section
        id="como-funciona"
        ref={sectionRef}
        className="relative h-screen overflow-hidden hidden lg:flex flex-col items-center justify-center"
        style={{ backgroundColor: "#ffffff", zIndex: 25, position: "relative", isolation: "isolate" }}
        aria-label={sectionTitle}
      >
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{ backgroundColor: "#DADAC9", zIndex: 0 }}
          aria-hidden="true"
        />

        <div ref={headerRef} className="absolute top-16 left-0 right-0 text-center px-8 lg:right-auto lg:w-1/2 lg:text-left lg:pl-16 lg:pr-8 z-10">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "rgba(32,0,65,0.4)" }}>
            {subtitle}
          </p>
          <h2 className="font-display font-normal" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#200041", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {sectionTitle}
          </h2>
        </div>

        <div ref={bgContainerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[6]" aria-hidden="true">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { bgNumRefs.current[i] = el; }}
              className="absolute font-display font-normal leading-none select-none [--bg-num-left:50%] lg:[--bg-num-left:25%]"
              style={{ fontSize: "clamp(18rem, 40vw, 36rem)", color: "rgba(32,0,65,0.032)", letterSpacing: "-0.06em", top: "50%", left: "var(--bg-num-left, 50%)", transform: "translate(-50%, -46%)" }}
            >
              {step.number}
            </div>
          ))}
        </div>

        <div ref={contentRef} className="relative z-10 w-full max-w-3xl mx-auto px-8 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:max-w-none lg:mx-0 lg:px-0 flex items-center">
          <div className="w-full lg:px-16">
            {steps.map((step, i) => (
              <div key={i} className="border-b" style={{ borderColor: "rgba(32,0,65,0.08)" }}>
                <div className="py-5 flex items-center gap-4">
                  <span className="font-mono text-xs tracking-[0.25em] uppercase shrink-0" style={{ color: "#bc8129", minWidth: "2rem" }}>
                    {step.number}
                  </span>
                  <h3
                    ref={(el) => { titleRefs.current[i] = el; }}
                    className="font-display font-normal"
                    style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)", color: "#200041", letterSpacing: "-0.02em", lineHeight: 1.25 }}
                  >
                    {step.title}
                  </h3>
                </div>
                <div ref={(el) => { descRefs.current[i] = el; }}>
                  <p className="pb-6 lg:pl-[calc(2rem+1rem)]" style={{ fontSize: "1rem", color: "rgba(32,0,65,0.55)", lineHeight: "1.75", maxWidth: "44ch" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden" style={{ zIndex: 2 }} aria-hidden="true">
          {steps.map((_, si) => (
            <div
              key={si}
              ref={(el) => { rightPanelRefs.current[si] = el; }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "#DADAC9" }}
            >
              {si === 1 && (
                <>
                  <Image
                    src="https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/backgrounds/optimized.webp"
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
                </>
              )}
              {si === 0 && templateImages.length > 0 && (
                <div className="absolute inset-0 flex gap-6 overflow-hidden px-6">
                  <div ref={(el) => { colRefs.current[0] = el; }} className="flex flex-col gap-10 flex-1" style={{ marginLeft: "-45%", height: "calc(100% + 200px)", marginTop: "-100px" }}>
                    {GRID_COLS[0].map(([imgIdx,, w], ri) => (
                      <div key={ri} className="flex-1 flex items-center justify-center">
                        <div className="h-full overflow-hidden" style={{ width: `${w}%`, borderRadius: 14, boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}>
                          <Image src={templateImages[imgIdx % templateImages.length]} alt="" width={220} height={300} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div ref={(el) => { colRefs.current[1] = el; }} className="flex flex-col gap-10 flex-1">
                    {GRID_COLS[1].map(([imgIdx,, w], ri) => (
                      <div key={ri} className="flex-1 flex items-center justify-center">
                        <div className="h-full overflow-hidden" style={{ width: `${w}%`, borderRadius: 16, boxShadow: "0 8px 28px rgba(0,0,0,0.14)" }}>
                          <Image src={templateImages[imgIdx % templateImages.length]} alt="" width={320} height={300} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div ref={(el) => { colRefs.current[2] = el; }} className="flex flex-col gap-10 flex-1" style={{ marginRight: "-45%", height: "calc(100% + 200px)", marginTop: "-100px" }}>
                    {GRID_COLS[2].map(([imgIdx,, w], ri) => (
                      <div key={ri} className="flex-1 flex items-center justify-center">
                        <div className="h-full overflow-hidden" style={{ width: `${w}%`, borderRadius: 14, boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}>
                          <Image src={templateImages[imgIdx % templateImages.length]} alt="" width={220} height={300} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div ref={dotsContainerRef} className="absolute bottom-16 left-1/2 -translate-x-1/2 lg:left-1/4 flex items-center gap-2.5 z-10" aria-hidden="true">
          {steps.map((_, i) => (
            <span key={i} ref={(el) => { dotRefs.current[i] = el; }} className="block w-1.5 h-1.5 rounded-full" style={{ background: "#200041" }} />
          ))}
        </div>
      </section>
    </>
  );
}
