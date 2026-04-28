"use client";

import { useLayoutEffect, useRef, type Ref } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import { Mic, Plus, Smile } from "lucide-react";
import messageAnimation from "@/assets/lotties/ContactUs.json";

gsap.registerPlugin(ScrollTrigger);

type Step = { number: string; title: string; description: string };
type WhatsappReply = { id: string; text: string };
type WhatsappChatMessage = WhatsappReply & { direction: "incoming" | "outgoing" };

const GRID_COLS: [number, number, number][][] = [
  [[0, 0, 100], [3, 0, 78], [5, 0,  90]],
  [[5, 0, 100], [4, 0,  85], [3, 0, 100]],
  [[2, 0,  88], [5, 0, 100], [3, 0,  80]],
];

const STEP_FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const HOW_IT_WORKS_WHATSAPP_MESSAGE = "Hola! Te quiero invitar a mi fiesta";

export const HOW_IT_WORKS_WHATSAPP_REPLIES: WhatsappReply[] = [
  { id: "confirmed", text: "¡Ya confirmé! ✓✓" },
  { id: "vegan-menu", text: "¿Hay menú vegano?" },
  { id: "plus-two", text: "Voy con +2 ✓" },
  { id: "family-share", text: "Compartí con la flia 👨‍👩‍👧" },
  { id: "see-you", text: "Nos vemos ahí 🎉" },
];

export const HOW_IT_WORKS_WHATSAPP_CHAT_SEQUENCE: WhatsappChatMessage[] = [
  {
    id: "sent-invitation",
    direction: "outgoing",
    text: HOW_IT_WORKS_WHATSAPP_MESSAGE,
  },
  ...HOW_IT_WORKS_WHATSAPP_REPLIES.map((reply) => ({
    ...reply,
    direction: "incoming" as const,
  })),
];

function WhatsAppInputPreview({
  compact = false,
  staticText,
  typedTextRef,
  typedCursorRef,
}: {
  compact?: boolean;
  staticText?: string;
  typedTextRef?: Ref<HTMLSpanElement>;
  typedCursorRef?: Ref<HTMLSpanElement>;
}) {
  const iconSize = compact ? 18 : 24;
  const inputTextSize = compact ? "text-xs" : "text-[0.9375rem]";
  const iconClassName = compact ? "h-8 w-8" : "h-10 w-10";

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-4"} w-full ${compact ? "max-w-[310px]" : "max-w-xl"}`}>
      <span
        aria-label="Agregar adjunto"
        role="img"
        className={`${iconClassName} flex shrink-0 items-center justify-center text-[#54656F]`}
      >
        <Plus size={iconSize} strokeWidth={2.15} aria-hidden="true" />
      </span>

      <div
        className={`flex min-w-0 flex-1 items-center ${compact ? "gap-2 px-3 py-2" : "gap-3 px-4 py-3"}`}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: compact ? "22px" : "28px",
          border: "1px solid rgba(17,27,33,0.16)",
          boxShadow: "0 4px 18px rgba(17,27,33,0.08), 0 1px 4px rgba(17,27,33,0.06)",
        }}
      >
        <div className={`min-w-0 flex-1 truncate ${inputTextSize} leading-[1.4] text-[#111B21]`}>
          {typedTextRef ? <span ref={typedTextRef}></span> : staticText}
          <span
            ref={typedCursorRef}
            className={`${compact ? "h-4" : "h-5"} ml-0.5 inline-block w-[2px] align-[-3px] animate-pulse rounded-full bg-[#00A884]`}
          />
        </div>

        <span
          aria-label="Insertar emoji"
          role="img"
          className="flex shrink-0 items-center justify-center text-[#54656F]"
        >
          <Smile size={iconSize} strokeWidth={2.1} aria-hidden="true" />
        </span>
      </div>

      <span
        aria-label="Grabar audio"
        role="img"
        className={`${iconClassName} flex shrink-0 items-center justify-center text-[#54656F]`}
      >
        <Mic size={iconSize} strokeWidth={2.15} aria-hidden="true" />
      </span>
    </div>
  );
}

export default function HowItWorksClient({
  steps,
  sectionTitle,
  subtitle,
  templateImages = [],
  demoVideoUrl,
}: {
  steps: Step[];
  sectionTitle: string;
  subtitle: string;
  templateImages?: string[];
  demoVideoUrl?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
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
  const chatMessageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const whatsappInputRef = useRef<HTMLDivElement>(null);
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const typedCursorRef = useRef<HTMLSpanElement>(null);

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

        // Estado inicial del input de WhatsApp
        gsap.set(whatsappInputRef.current, { y: 60, autoAlpha: 0, scale: 0.95 });
        gsap.set(typedCursorRef.current, { autoAlpha: 1 });
        gsap.set(lottieContainerRef.current, { scale: 1, rotation: 0, opacity: 1, filter: "blur(0px)" });
        if (typedTextRef.current) {
          typedTextRef.current.textContent = "";
        }

        // Estado inicial del chat: todos los mensajes esperan arriba del input.
        chatMessageRefs.current.forEach((el, i) => {
          if (!el) return;

          const direction = HOW_IT_WORKS_WHATSAPP_CHAT_SEQUENCE[i]?.direction;

          gsap.set(el, {
            autoAlpha: 0,
            x: direction === "outgoing" ? 28 : -28,
            y: 18,
            scale: 0.95
          });
        });

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
        const scrollLength = (n - 1) * window.innerHeight * 5.5;
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

          // Secuencia de animación del paso 3: Input → Typewriter → Burbujas
          if (i + 1 === 2) {
            const typedMessage = { chars: 0 };
            const typewriterDuration = HOW_IT_WORKS_WHATSAPP_MESSAGE.length * 0.08; // 80ms por letra

            // 1. El Lottie desaparece con efecto dramático (rotate + scale + blur)
            stepTl.to(lottieContainerRef.current, {
              scale: 0.3,
              rotation: -8,
              opacity: 0,
              filter: "blur(8px)",
              duration: 1.0,
              ease: "power3.inOut"
            });

            // 2. El input de WhatsApp aparece con efecto "pop" dramático
            stepTl.fromTo(whatsappInputRef.current,
              {
                y: 80,
                autoAlpha: 0,
                scale: 0.85,
                filter: "blur(4px)"
              },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "elastic.out(1, 0.6)"
              },
              "<0.4"
            );

            // 3. Typewriter controlado por GSAP. No usamos setTimeout porque rompe el scrub.
            stepTl.to(typedMessage, {
              chars: HOW_IT_WORKS_WHATSAPP_MESSAGE.length,
              duration: typewriterDuration,
              ease: "none",
              onStart: () => {
                typedMessage.chars = 0;
                if (typedTextRef.current) {
                  typedTextRef.current.textContent = "";
                }
              },
              onUpdate: () => {
                if (!typedTextRef.current) return;
                typedTextRef.current.textContent = HOW_IT_WORKS_WHATSAPP_MESSAGE.slice(
                  0,
                  Math.round(typedMessage.chars)
                );
              },
              onReverseComplete: () => {
                if (typedTextRef.current) {
                  typedTextRef.current.textContent = "";
                }
              },
            }, "+=0.3");

            // 4. Cuando termina de escribir, se envía: desaparece el input.
            stepTl.to(typedCursorRef.current, {
              autoAlpha: 0,
              duration: 0.15,
              ease: "power1.out",
            });
            stepTl.to(whatsappInputRef.current, {
              y: 90,
              autoAlpha: 0,
              scale: 0.92,
              duration: 0.45,
              ease: "power2.in"
            }, "<0.05");

            // 5. A partir de ahí aparecen arriba como conversación de WhatsApp.
            chatMessageRefs.current.forEach((bubble, bi) => {
              stepTl.to(bubble, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.42,
                ease: "back.out(1.5)"
              }, bi === 0 ? "<0.18" : "+=0.16");
            });
          }

          stepTl.to({}, { duration: 1.5 });
        }

        // Oscurecer al final del timeline, cuando TemplatesSection entra
        stepTl.to(overlayRef.current, { opacity: 1, duration: 1.5, ease: "none" });

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
        className="lg:hidden px-6 py-12 md:py-20"
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
                  {i === 1 && demoVideoUrl && (
                    <div className="flex justify-center">
                      <div className="relative w-full max-w-[200px] overflow-hidden" style={{ borderRadius: 12, boxShadow: "0 8px 24px rgba(32,0,65,0.15)" }}>
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto"
                          style={{ display: "block" }}
                        >
                          <source src={demoVideoUrl} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="flex justify-center relative px-4">
                      {/* Lottie central - midground - se desvanece elegantemente */}
                      <motion.div
                        className="w-full max-w-[220px] relative"
                        style={{ zIndex: 5 }}
                        initial={{ scale: 1, opacity: 1, rotate: 0, filter: "blur(0px)" }}
                        whileInView={{ scale: 0.3, opacity: 0, rotate: -8, filter: "blur(8px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.05, ease: [0.45, 0, 0.55, 1] }}
                      >
                        <Lottie animationData={messageAnimation} loop autoplay />
                      </motion.div>

                      {/* Input de WhatsApp - mobile - aparece y luego se oculta */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center px-4"
                        initial={{ opacity: 0, y: 60, scale: 0.85 }}
                        whileInView={{
                          opacity: [0, 1, 1, 0],
                          y: [60, 0, 0, 42],
                          scale: [0.85, 1, 1, 0.94],
                        }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5,
                          duration: 1.05,
                          times: [0, 0.28, 0.72, 1],
                        }}
                        style={{ zIndex: 15, pointerEvents: "none" }}
                      >
                        <WhatsAppInputPreview compact staticText={HOW_IT_WORKS_WHATSAPP_MESSAGE} />
                      </motion.div>

                      {/* Chat de WhatsApp - mobile: primero aparece el enviado, después respuestas */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ zIndex: 20 }}>
                        <div className="w-full space-y-2.5">
                          {HOW_IT_WORKS_WHATSAPP_CHAT_SEQUENCE.map((message, mi) => {
                            const isOutgoing = message.direction === "outgoing";

                            return (
                              <motion.div
                                key={message.id}
                                className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
                                initial={{ opacity: 0, x: isOutgoing ? 18 : -18, y: 14, scale: 0.96 }}
                                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.35 + mi * 0.2, duration: 0.4 }}
                              >
                                <div
                                  className="text-xs font-medium leading-[1.4]"
                                  style={{
                                    backgroundColor: isOutgoing ? "#25D366" : "#FFFFFF",
                                    padding: "8px 12px",
                                    borderRadius: isOutgoing ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
                                    maxWidth: isOutgoing ? "220px" : "180px",
                                    boxShadow: isOutgoing ? "0 2px 6px rgba(37,211,102,0.15)" : "0 2px 6px rgba(0,0,0,0.08)"
                                  }}
                                >
                                  <p className={isOutgoing ? "text-white" : "text-gray-900"}>{message.text}</p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
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
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", opacity: 0, zIndex: 40 }}
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
              {si === 1 && demoVideoUrl && (
                <div className="relative w-full max-w-xs mx-auto">
                  <div className="relative w-full overflow-hidden" style={{ borderRadius: 20, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto"
                      style={{ display: "block" }}
                    >
                      <source src={demoVideoUrl} type="video/mp4" />
                    </video>
                  </div>
                </div>
              )}
              {si === 2 && (
                <div className="flex items-center justify-center relative px-12">
                  {/* Lottie central - midground z-index */}
                  <div ref={lottieContainerRef} className="w-full max-w-[380px] relative" style={{ zIndex: 5 }}>
                    <Lottie animationData={messageAnimation} loop autoplay />
                  </div>

                  {/* Input de WhatsApp - aparece después del Lottie */}
                  <div
                    ref={whatsappInputRef}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ zIndex: 15 }}
                  >
                    <WhatsAppInputPreview
                      typedTextRef={typedTextRef}
                      typedCursorRef={typedCursorRef}
                    />
                  </div>

                  {/* Chat de WhatsApp - aparece arriba después de enviar */}
                  <div className="absolute inset-x-0 top-[10%] flex flex-col items-center px-16" style={{ zIndex: 20 }}>
                    <div className="w-full max-w-md space-y-3">
                      {HOW_IT_WORKS_WHATSAPP_CHAT_SEQUENCE.map((message, mi) => {
                        const isOutgoing = message.direction === "outgoing";

                        return (
                          <div
                            key={message.id}
                            ref={(el) => { chatMessageRefs.current[mi] = el; }}
                            className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className="text-[0.9375rem] font-medium leading-[1.4]"
                              style={{
                                backgroundColor: isOutgoing ? "#25D366" : "#FFFFFF",
                                padding: "10px 14px",
                                borderRadius: isOutgoing ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                                maxWidth: isOutgoing ? "280px" : "240px",
                                boxShadow: isOutgoing ? "0 2px 8px rgba(37,211,102,0.15)" : "0 2px 8px rgba(0,0,0,0.08)"
                              }}
                            >
                              <p className={isOutgoing ? "text-white" : "text-gray-900"}>{message.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
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
