"use client";

import { useLayoutEffect, useRef, type Ref } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import {
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  Grid2x2,
  Link2,
  List,
  Mic,
  Plus,
  Search,
  SendHorizonal,
  Smile,
  UserRound,
  UserRoundCheck,
  XCircle,
} from "lucide-react";
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

export const HOW_IT_WORKS_WHATSAPP_MESSAGE = "¡Quiero invitarte a mi boda! 💍 Confirmá acá: bento.com/miboda";

export const HOW_IT_WORKS_WHATSAPP_REPLIES: WhatsappReply[] = [
  { id: "loved-it", text: "¡Qué copado esto! 🥹" },
  { id: "confirmed", text: "Ya confirmé, gracias por invitarme 🙌" },
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

// Pausas: "¡Quiero invitarte" → "a mi boda! 💍 " → "Confirmá acá: bento.com/miboda"
const HOW_IT_WORKS_TYPE_SEGMENTS = [
  { chars: 17, duration: 0.55, pauseAfter: 0.2 },
  { chars: 31, duration: 0.60, pauseAfter: 0.25 },
  { chars: HOW_IT_WORKS_WHATSAPP_MESSAGE.length, duration: 0.95, pauseAfter: 0 },
];

const HOW_IT_WORKS_REPLY_DELAYS = [0.52, 0.38];

function WhatsAppInputPreview({
  compact = false,
  staticText,
  typedTextRef,
  typedCursorRef,
  sendButtonRef,
  micIconRef,
  sendIconRef,
}: {
  compact?: boolean;
  staticText?: string;
  typedTextRef?: Ref<HTMLSpanElement>;
  typedCursorRef?: Ref<HTMLSpanElement>;
  sendButtonRef?: Ref<HTMLSpanElement>;
  micIconRef?: Ref<HTMLSpanElement>;
  sendIconRef?: Ref<HTMLSpanElement>;
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
        <div className={`min-w-0 flex-1 ${inputTextSize} leading-[1.4] text-[#111B21]`} style={{ wordBreak: "break-word" }}>
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
        ref={sendButtonRef}
        className={`${iconClassName} flex shrink-0 items-center justify-center text-[#54656F]`}
        style={{ borderRadius: "999px", backgroundColor: "transparent" }}
      >
        <span ref={micIconRef} className="absolute flex items-center justify-center">
          <Mic size={iconSize} strokeWidth={2.15} aria-hidden="true" />
        </span>
        <span ref={sendIconRef} className="absolute flex items-center justify-center opacity-0">
          <SendHorizonal size={compact ? 16 : 20} strokeWidth={2.4} aria-hidden="true" />
        </span>
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
  whatsappMessage,
  whatsappReplies,
}: {
  steps: Step[];
  sectionTitle: string;
  subtitle: string;
  templateImages?: string[];
  demoVideoUrl?: string;
  whatsappMessage?: string;
  whatsappReplies?: string[];
}) {
  const message = whatsappMessage ?? HOW_IT_WORKS_WHATSAPP_MESSAGE;
  const replies: WhatsappReply[] = whatsappReplies
    ? whatsappReplies.map((text, i) => ({ id: `reply-${i}`, text }))
    : HOW_IT_WORKS_WHATSAPP_REPLIES;
  const chatSequence: WhatsappChatMessage[] = [
    { id: "sent-invitation", direction: "outgoing", text: message },
    ...replies.map((r) => ({ ...r, direction: "incoming" as const })),
  ];
  const typeSegments = [
    { chars: Math.floor(message.length * 0.27), duration: 0.55, pauseAfter: 0.2 },
    { chars: Math.floor(message.length * 0.50), duration: 0.60, pauseAfter: 0.25 },
    { chars: message.length, duration: 0.95, pauseAfter: 0 },
  ];
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
  const sendButtonRef = useRef<HTMLSpanElement>(null);
  const micIconRef = useRef<HTMLSpanElement>(null);
  const sendIconRef = useRef<HTMLSpanElement>(null);
  const sentSingleCheckRef = useRef<HTMLSpanElement>(null);
  const sentDoubleCheckRef = useRef<HTMLSpanElement>(null);
  const typingIndicatorRef = useRef<HTMLDivElement>(null);
  const typingDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chatStageRef = useRef<HTMLDivElement>(null);
  const dashboardStageRef = useRef<HTMLDivElement>(null);
  const rsvpBadgeRef = useRef<HTMLDivElement>(null);
  const dashboardCardRef = useRef<HTMLDivElement>(null);
  const confirmedCountRef = useRef<HTMLSpanElement>(null);
  const confirmedNextRef = useRef<HTMLSpanElement>(null);
  const pendingCountRef = useRef<HTMLSpanElement>(null);
  const plusOneBadgeRef = useRef<HTMLDivElement>(null);
  const dashboardBellRef = useRef<HTMLSpanElement>(null);
  const newGuestRowRef = useRef<HTMLDivElement>(null);

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
        gsap.set(lottieContainerRef.current, { x: 0, scale: 1, rotation: 0, opacity: 1, filter: "blur(0px)" });
        gsap.set(sendButtonRef.current, { backgroundColor: "transparent", color: "#54656F", scale: 1 });
        gsap.set(micIconRef.current, { autoAlpha: 1, scale: 1, rotation: 0 });
        gsap.set(sendIconRef.current, { autoAlpha: 0, scale: 0.7, rotation: -12 });
        gsap.set(sentSingleCheckRef.current, { autoAlpha: 1, x: 0 });
        gsap.set(sentDoubleCheckRef.current, { autoAlpha: 0, scale: 0.85 });
        gsap.set(typingIndicatorRef.current, { autoAlpha: 0, y: 12, scale: 0.94 });
        typingDotRefs.current.forEach((dot) => gsap.set(dot, { autoAlpha: 0.45, scale: 0.82 }));
        gsap.set(chatStageRef.current, { x: 0, scale: 1, autoAlpha: 1 });
        gsap.set(dashboardStageRef.current, { x: 120, autoAlpha: 0 });
        gsap.set(rsvpBadgeRef.current, { autoAlpha: 0, y: 22, scale: 0.92 });
        gsap.set(dashboardCardRef.current, { autoAlpha: 0, y: 26, scale: 0.94 });
        gsap.set(plusOneBadgeRef.current, { autoAlpha: 0, y: 10, scale: 0.8 });
        gsap.set(dashboardBellRef.current, { rotation: 0, scale: 1 });
        gsap.set(newGuestRowRef.current, { autoAlpha: 0, y: 18, scale: 0.96 });
        if (typedTextRef.current) {
          typedTextRef.current.textContent = "";
        }
        gsap.set(confirmedCountRef.current, { y: "0%" });
        gsap.set(confirmedNextRef.current, { y: "100%" });

        // Estado inicial del chat: todos los mensajes esperan arriba del input.
        chatMessageRefs.current.forEach((el, i) => {
          if (!el) return;

          const direction = chatSequence[i]?.direction;

          gsap.set(el, {
            autoAlpha: 0,
            x: direction === "outgoing" ? 16 : -28,
            y: direction === "outgoing" ? 96 : 18,
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
        const scrollLength = (n - 1) * window.innerHeight * 3.5;
        ScrollTrigger.create({
          trigger: section,
          pin: true,
          start: "top top",
          end: `+=${scrollLength}`,
          anticipatePin: 1,
          onLeave: () => {
            step3Triggered = false;
            resetStep3Animation();
          },
          onLeaveBack: () => {
            step3Triggered = false;
            resetStep3Animation();
          },
          onEnter: () => {
            step3Triggered = false;
            resetStep3Animation();
          },
          onEnterBack: () => {
            step3Triggered = false;
            resetStep3Animation();
          },
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

        const resetStep3Animation = () => {
          step3AutoTl.pause(0);
          if (typedTextRef.current) {
            typedTextRef.current.textContent = "";
          }
          gsap.set(lottieContainerRef.current, { x: 0, scale: 1, rotation: 0, opacity: 1, filter: "blur(0px)" });
          gsap.set(whatsappInputRef.current, { y: 60, autoAlpha: 0, scale: 0.95 });
          gsap.set(typedCursorRef.current, { autoAlpha: 1 });
          gsap.set(sendButtonRef.current, { backgroundColor: "transparent", color: "#54656F", scale: 1 });
          gsap.set(micIconRef.current, { autoAlpha: 1, scale: 1, rotation: 0 });
          gsap.set(sendIconRef.current, { autoAlpha: 0, scale: 0.7, rotation: -12 });
          gsap.set(sentSingleCheckRef.current, { autoAlpha: 1, x: 0 });
          gsap.set(sentDoubleCheckRef.current, { autoAlpha: 0, scale: 0.85 });
          gsap.set(typingIndicatorRef.current, { autoAlpha: 0, y: 12, scale: 0.94 });
          typingDotRefs.current.forEach((dot) => gsap.set(dot, { autoAlpha: 0.45, scale: 0.82 }));
          gsap.set(chatStageRef.current, { x: 0, scale: 1, autoAlpha: 1 });
          gsap.set(dashboardStageRef.current, { x: 120, autoAlpha: 0 });
          gsap.set(rsvpBadgeRef.current, { autoAlpha: 0, y: 22, scale: 0.92 });
          gsap.set(dashboardCardRef.current, { autoAlpha: 0, y: 26, scale: 0.94 });
          gsap.set(plusOneBadgeRef.current, { autoAlpha: 0, y: 10, scale: 0.8 });
          gsap.set(dashboardBellRef.current, { rotation: 0, scale: 1 });
          gsap.set(newGuestRowRef.current, { autoAlpha: 0, y: 18, scale: 0.96 });
          gsap.set(confirmedCountRef.current, { y: "0%" });
          gsap.set(confirmedNextRef.current, { y: "100%" });
          if (pendingCountRef.current) {
            pendingCountRef.current.textContent = "12";
          }
          chatMessageRefs.current.forEach((el, i) => {
            if (!el) return;
            const direction = chatSequence[i]?.direction;
            gsap.set(el, {
              autoAlpha: 0,
              x: direction === "outgoing" ? 16 : -28,
              y: direction === "outgoing" ? 96 : 18,
              scale: 0.95
            });
          });
        };

        const getPanelTranslateY = (panel: HTMLDivElement | null) => {
          if (!panel) return Number.POSITIVE_INFINITY;
          const value = gsap.getProperty(panel, "y");

          if (typeof value === "number") return value;

          if (typeof value === "string") {
            // Si es porcentaje, convertir a píxeles
            if (value.endsWith("%")) {
              const percentage = Number.parseFloat(value);
              const parentHeight = panel.parentElement?.offsetHeight || window.innerHeight;
              return (percentage / 100) * parentHeight;
            }
            // Si es "100px" u otro valor con unidades
            const parsed = Number.parseFloat(value);
            return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
          }

          return Number.POSITIVE_INFINITY;
        };

        // Timeline automático para el paso 3 (NO anclado al scroll) - se crea ANTES del timeline principal
        const step3AutoTl = gsap.timeline({ paused: true });
        const typedMessage = { chars: 0 };
        const typingDotsTl = gsap.timeline({ paused: true, repeat: -1 });

        typingDotRefs.current.forEach((dot, i) => {
          if (!dot) return;
          typingDotsTl.to(dot, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.18,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
          }, i * 0.12);
        });
        typingDotsTl.to({}, { duration: 0.26 });

        // 1. El Lottie desaparece con efecto dramático
        step3AutoTl.to(lottieContainerRef.current, {
          scale: 0.3,
          rotation: -8,
          opacity: 0,
          filter: "blur(8px)",
          duration: 2,
          ease: "expo.in"
        });

        // 2. El input de WhatsApp aparece con efecto "pop"
        step3AutoTl.fromTo(whatsappInputRef.current,
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
            duration: 0.5,
            ease: "elastic.out(1, 0.6)"
          },
          "-=0.2"
        );

        // 3. Typewriter escribe el mensaje
        typeSegments.forEach((segment, index) => {
          step3AutoTl.to(typedMessage, {
            chars: segment.chars,
            duration: segment.duration,
            ease: index === 1 ? "power1.inOut" : "none",
            onStart: () => {
              if (index === 0) {
                typedMessage.chars = 0;
                if (typedTextRef.current) {
                  typedTextRef.current.textContent = "";
                }
              }
            },
            onUpdate: () => {
              if (!typedTextRef.current) return;
              typedTextRef.current.textContent = message.slice(
                0,
                Math.round(typedMessage.chars)
              );
            }
          }, index === 0 ? "+=0.2" : `+=${typeSegments[index - 1]?.pauseAfter ?? 0}`);
        });

        // 4. Cursor desaparece y el input se envía
        step3AutoTl.to(typedCursorRef.current, {
          autoAlpha: 0,
          duration: 0.1,
          ease: "power1.out"
        }, "+=0.1");

        step3AutoTl.to(sendButtonRef.current, {
          backgroundColor: "#25D366",
          color: "#FFFFFF",
          duration: 0.18,
          ease: "power2.out"
        });

        step3AutoTl.to(micIconRef.current, {
          autoAlpha: 0,
          scale: 0.7,
          rotation: 10,
          duration: 0.14,
          ease: "power2.out"
        }, "<");

        step3AutoTl.to(sendIconRef.current, {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 0.16,
          ease: "back.out(1.8)"
        }, "<0.04");

        step3AutoTl.to(sendButtonRef.current, {
          scale: 0.88,
          duration: 0.08,
          ease: "power2.in"
        }, "+=0.08");

        step3AutoTl.to(sendButtonRef.current, {
          scale: 1,
          duration: 0.12,
          ease: "power2.out"
        });

        step3AutoTl.to(whatsappInputRef.current, {
          y: 90,
          autoAlpha: 0,
          scale: 0.92,
          duration: 0.32,
          ease: "power2.in"
        }, "<0.02");

        const [outgoingBubble, ...incomingBubbles] = chatMessageRefs.current;

        step3AutoTl.to(outgoingBubble, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: "power2.out"
        }, "<0.04");

        step3AutoTl.to(sentSingleCheckRef.current, {
          x: -2,
          autoAlpha: 0,
          duration: 0.18,
          ease: "power1.out"
        }, "+=0.18");

        step3AutoTl.to(sentDoubleCheckRef.current, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.22,
          ease: "back.out(1.8)"
        }, "<0.02");

        step3AutoTl.to(typingIndicatorRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.24,
          ease: "power2.out",
          onStart: () => {
            typingDotsTl.restart(true);
          }
        }, "+=0.26");

        step3AutoTl.to({}, { duration: 0.68 });

        step3AutoTl.to(typingIndicatorRef.current, {
          autoAlpha: 0,
          y: -6,
          scale: 0.98,
          duration: 0.18,
          ease: "power1.in",
          onComplete: () => {
            typingDotsTl.pause(0);
            typingDotRefs.current.forEach((dot) => gsap.set(dot, { autoAlpha: 0.45, scale: 0.82 }));
          }
        });

        incomingBubbles.forEach((bubble, bi) => {
          step3AutoTl.to(bubble, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.5)"
          }, `+=${HOW_IT_WORKS_REPLY_DELAYS[bi] ?? 0.26}`);
        });

        const dashboardCounts = { confirmed: 24 };

        step3AutoTl.to(chatStageRef.current, {
          x: -82,
          scale: 0.94,
          autoAlpha: 0,
          duration: 0.38,
          ease: "power2.in"
        }, "+=1.4");

        step3AutoTl.to(dashboardStageRef.current, {
          x: 0,
          autoAlpha: 1,
          duration: 0.44,
          ease: "power2.out"
        }, "<0.08");

        step3AutoTl.to(dashboardCardRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.34,
          ease: "power2.out"
        }, "<0.02");

        // 1. Suena la campana
        step3AutoTl.to(dashboardBellRef.current, {
          rotation: -18,
          duration: 0.08,
          ease: "power1.inOut"
        }, "+=0.5");

        step3AutoTl.to(dashboardBellRef.current, {
          rotation: 16,
          duration: 0.1,
          ease: "power1.inOut"
        });

        step3AutoTl.to(dashboardBellRef.current, {
          rotation: -10,
          scale: 1.08,
          duration: 0.08,
          ease: "power1.inOut"
        });

        step3AutoTl.to(dashboardBellRef.current, {
          rotation: 0,
          scale: 1,
          duration: 0.14,
          ease: "back.out(1.8)"
        });

        // 2. Se suma +1 al contador — slide up del 25, slide in del 26 desde abajo
        step3AutoTl.to(confirmedCountRef.current, {
          y: "-100%",
          duration: 0.35,
          ease: "power2.in"
        }, "+=0.4");
        step3AutoTl.fromTo(confirmedNextRef.current,
          { y: "100%" },
          { y: "0%", duration: 0.35, ease: "power2.out" },
          "<"
        );

        // 3. Aparece el nuevo guest
        step3AutoTl.to(newGuestRowRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.32,
          ease: "back.out(1.6)"
        }, "+=0.5");

        // 4. Dashboard sale a la derecha, Lottie vuelve desde la izquierda
        step3AutoTl.to(dashboardStageRef.current, {
          x: 160,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.in"
        }, "+=1.2");

        // set solo posiciona X — en este punto el lottie ya está en opacity:0 por la primera animación
        step3AutoTl.set(lottieContainerRef.current, { x: -120, scale: 0.85, rotation: 0, filter: "blur(6px)" });

        step3AutoTl.to(lottieContainerRef.current, {
          x: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out"
        }, "<0.1");

        // Timeline principal de transición entre steps
        const stepTl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top top", end: `+=${scrollLength}`, scrub: 1.6 },
        });
        let step3Triggered = false;

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

          // Paso 3: solo reservamos espacio en el timeline
          if (i + 1 === 2) {
            stepTl.to({}, { duration: 7.0 }); // Duración para la animación automática
          }

          stepTl.to({}, { duration: 1.5 });
        }

        // Oscurecer al final del timeline, cuando TemplatesSection entra
        stepTl.to(overlayRef.current, { opacity: 1, duration: 1.5, ease: "none" });

        // Monitor para activar/resetear la animación del paso 3
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${scrollLength}`,
          onUpdate: () => {
            const step3PanelY = getPanelTranslateY(rightPanelRefs.current[2]);

            if (step3PanelY <= 8 && !step3Triggered) {
              step3Triggered = true;
              step3AutoTl.restart();
            }

            if (step3PanelY > 24 && step3Triggered) {
              step3Triggered = false;
              resetStep3Animation();
            }
          }
        });

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
                    <div className="flex justify-center px-4">
                      <div className="w-full max-w-[280px]">
                        <Lottie animationData={messageAnimation} loop autoplay />
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
                  <div ref={lottieContainerRef} className="w-full max-w-[480px] relative" style={{ zIndex: 5 }}>
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
                      sendButtonRef={sendButtonRef}
                      micIconRef={micIconRef}
                      sendIconRef={sendIconRef}
                    />
                  </div>

                  {/* Chat de WhatsApp - aparece arriba después de enviar */}
                  <div className="absolute inset-0 flex items-center justify-center px-10" style={{ zIndex: 20 }}>
                    <div className="relative w-full max-w-[660px] min-h-[520px]">
                    <div ref={chatStageRef} className="w-full max-w-md space-y-3">
                      {chatSequence.map((msg, mi) => {
                        const isOutgoing = msg.direction === "outgoing";

                        return (
                          <div key={msg.id}>
                            <div
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
                                <p className={isOutgoing ? "text-white" : "text-gray-900"}>{msg.text}</p>
                                {isOutgoing && (
                                  <div className="mt-1 flex items-center justify-end gap-0.5 text-white/85">
                                    <span ref={sentSingleCheckRef} className="flex items-center justify-center">
                                      <Check size={13} strokeWidth={2.4} aria-hidden="true" />
                                    </span>
                                    <span ref={sentDoubleCheckRef} className="flex items-center justify-center text-[#D7F6FF] opacity-0">
                                      <CheckCheck size={13} strokeWidth={2.4} aria-hidden="true" />
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {isOutgoing && (
                              <div
                                ref={typingIndicatorRef}
                                className="mt-2 flex justify-start"
                              >
                                <div
                                  className="flex items-center gap-1.5"
                                  style={{
                                    backgroundColor: "rgba(255,255,255,0.94)",
                                    padding: "10px 14px",
                                    borderRadius: "12px 12px 12px 2px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                                  }}
                                >
                                  {[0, 1, 2].map((dotIndex) => (
                                    <span
                                      key={dotIndex}
                                      ref={(el) => { typingDotRefs.current[dotIndex] = el; }}
                                      className="block h-2 w-2 rounded-full"
                                      style={{ backgroundColor: "rgba(84,101,111,0.82)" }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div ref={dashboardStageRef} className="absolute left-1/2 top-1/2 w-[360px] -translate-x-1/2 -translate-y-1/2">
                      <div
                        ref={dashboardCardRef}
                        className="relative overflow-hidden rounded-[30px]"
                        style={{
                          background: "#f8f5f0",
                          border: "1px solid rgba(224,214,201,0.86)",
                          boxShadow: "0 18px 44px rgba(32,0,65,0.10)"
                        }}
                      >
                        <div
                          ref={plusOneBadgeRef}
                          className="absolute right-[108px] top-[160px] rounded-full px-2.5 py-1 text-[0.72rem] font-semibold"
                          style={{ backgroundColor: "#25D366", color: "#FFFFFF", boxShadow: "0 10px 24px rgba(37,211,102,0.24)" }}
                        >
                          +1
                        </div>

                        <div className="border-b px-5 py-4" style={{ borderColor: "rgba(32,0,65,0.06)" }}>
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-9 w-9 items-center justify-center rounded-xl"
                              style={{ border: "1px solid rgba(32,0,65,0.10)", color: "#200041" }}
                            >
                              <Grid2x2 size={18} strokeWidth={2.1} aria-hidden="true" />
                            </span>
                            <span
                              className="flex h-11 w-11 items-center justify-center rounded-full text-[1.1rem] font-semibold"
                              style={{ backgroundColor: "rgba(255,161,79,0.18)", color: "#ff9d4d" }}
                            >
                              D
                            </span>
                            <div
                              className="flex min-w-0 flex-1 items-center justify-between rounded-[18px] px-4 py-3"
                              style={{
                                backgroundColor: "#ffffff",
                                border: "1px solid rgba(32,0,65,0.10)",
                                boxShadow: "0 6px 16px rgba(32,0,65,0.08)"
                              }}
                            >
                              <span className="truncate text-[1.05rem] font-semibold" style={{ color: "#241d1a" }}>
                                Dafne · 28/11/26
                              </span>
                              <ChevronDown size={18} strokeWidth={2.2} style={{ color: "rgba(36,29,26,0.52)" }} aria-hidden="true" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[0.95rem] font-semibold" style={{ color: "rgba(36,29,26,0.70)" }}>
                                Activo
                              </span>
                              <span
                                className="flex h-11 w-[54px] items-center rounded-full px-1"
                                style={{ backgroundColor: "#ff9d4d" }}
                              >
                                <span className="ml-auto block h-9 w-9 rounded-full bg-white shadow-sm" />
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="px-5 py-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[2.15rem] font-semibold leading-none" style={{ color: "#241d1a" }}>
                                Invitados
                              </p>
                              <p className="mt-3 max-w-[150px] text-[1rem] leading-[1.45]" style={{ color: "rgba(36,29,26,0.62)" }}>
                                Gestiona la lista de invitados y RSVP
                              </p>
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                              <span
                                ref={dashboardBellRef}
                                className="flex h-10 w-10 items-center justify-center rounded-full"
                                style={{ backgroundColor: "rgba(255,255,255,0.88)", color: "#241d1a", border: "1px solid rgba(32,0,65,0.08)", transformOrigin: "top center" }}
                              >
                                <Bell size={17} strokeWidth={2.2} aria-hidden="true" />
                              </span>
                            </div>
                          </div>

                          <div className="mt-5 flex gap-2 overflow-hidden">
                            <div
                              className="min-w-0 flex-1 rounded-full px-4 py-3 text-[0.95rem] font-medium"
                              style={{ backgroundColor: "#f7f3ec", border: "1px solid rgba(32,0,65,0.08)", color: "rgba(36,29,26,0.55)" }}
                            >
                              Generar todos los links
                            </div>
                            <div
                              className="min-w-[128px] rounded-full px-4 py-3 text-[0.95rem] font-medium"
                              style={{ backgroundColor: "#f7f3ec", border: "1px solid rgba(32,0,65,0.08)", color: "rgba(36,29,26,0.55)" }}
                            >
                              Descargar Excel
                            </div>
                          </div>

                          <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-[22px] px-4 py-4" style={{ backgroundColor: "rgba(255,161,79,0.10)", border: "1px solid rgba(255,161,79,0.22)" }}>
                              <div className="flex items-center gap-3">
                                <span className="flex h-14 w-14 items-center justify-center rounded-[20px]" style={{ backgroundColor: "rgba(255,161,79,0.16)", color: "#ff9d4d" }}>
                                  <UserRoundCheck size={22} strokeWidth={2.1} aria-hidden="true" />
                                </span>
                                <div>
                                  <div className="relative overflow-hidden" style={{ height: "1.65rem" }}>
                                    <span ref={confirmedCountRef} className="absolute inset-x-0 top-0 text-[1.65rem] font-semibold leading-none" style={{ color: "#241d1a" }}>25</span>
                                    <span ref={confirmedNextRef} className="absolute inset-x-0 top-0 text-[1.65rem] font-semibold leading-none translate-y-full" style={{ color: "#241d1a" }}>26</span>
                                  </div>
                                  <p className="mt-1 text-[0.85rem] font-medium" style={{ color: "rgba(36,29,26,0.68)" }}>
                                    Confirmados
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-[22px] px-4 py-4" style={{ backgroundColor: "rgba(243,113,113,0.08)", border: "1px solid rgba(243,113,113,0.20)" }}>
                              <div className="flex items-center gap-3">
                                <span className="flex h-14 w-14 items-center justify-center rounded-[20px]" style={{ backgroundColor: "rgba(243,113,113,0.16)", color: "#ee5f5f" }}>
                                  <XCircle size={22} strokeWidth={2.1} aria-hidden="true" />
                                </span>
                                <div>
                                  <p className="text-[1.65rem] font-semibold leading-none" style={{ color: "#241d1a" }}>0</p>
                                  <p className="mt-1 text-[0.85rem] font-medium" style={{ color: "rgba(36,29,26,0.68)" }}>
                                    No asisten
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-[22px] px-4 py-4" style={{ backgroundColor: "rgba(255,210,120,0.12)", border: "1px solid rgba(238,171,55,0.20)" }}>
                              <div className="flex items-center gap-3">
                                <span className="flex h-14 w-14 items-center justify-center rounded-[20px]" style={{ backgroundColor: "rgba(255,210,120,0.18)", color: "#e48b16" }}>
                                  <Link2 size={22} strokeWidth={2.1} aria-hidden="true" />
                                </span>
                                <div>
                                  <p className="text-[1.65rem] font-semibold leading-none" style={{ color: "#241d1a" }}>30</p>
                                  <p className="mt-1 text-[0.85rem] font-medium" style={{ color: "rgba(36,29,26,0.68)" }}>
                                    Links generados
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-[22px] px-4 py-4" style={{ backgroundColor: "rgba(120,208,170,0.12)", border: "1px solid rgba(120,208,170,0.24)" }}>
                              <div className="flex items-center gap-3">
                                <span className="flex h-14 w-14 items-center justify-center rounded-[20px]" style={{ backgroundColor: "rgba(120,208,170,0.20)", color: "#0a9968" }}>
                                  <Check size={22} strokeWidth={2.3} aria-hidden="true" />
                                </span>
                                <div>
                                  <p className="text-[1.65rem] font-semibold leading-none" style={{ color: "#241d1a" }}>19</p>
                                  <p className="mt-1 text-[0.85rem] font-medium" style={{ color: "rgba(36,29,26,0.68)" }}>
                                    Links abiertos
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 flex items-center gap-2">
                            <div
                              className="flex min-w-0 flex-1 items-center gap-3 rounded-full px-4 py-3"
                              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(32,0,65,0.08)", boxShadow: "0 6px 16px rgba(32,0,65,0.06)" }}
                            >
                              <Search size={18} strokeWidth={2.1} style={{ color: "rgba(36,29,26,0.45)" }} aria-hidden="true" />
                              <span className="truncate text-[0.98rem]" style={{ color: "rgba(36,29,26,0.52)" }}>
                                Buscar por nombre o email...
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-1 rounded-full px-2 py-2"
                              style={{ backgroundColor: "#f7f3ec", border: "1px solid rgba(32,0,65,0.08)" }}
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#241d1a] shadow-sm">
                                <Grid2x2 size={16} strokeWidth={2.1} aria-hidden="true" />
                              </span>
                              <span className="flex h-9 w-9 items-center justify-center rounded-full text-[#241d1a]">
                                <List size={16} strokeWidth={2.1} aria-hidden="true" />
                              </span>
                            </div>
                          </div>

                          <div
                            ref={newGuestRowRef}
                            className="mt-5 rounded-[20px] px-4 py-4"
                            style={{ backgroundColor: "#ffffff", border: "1px solid rgba(32,0,65,0.08)", boxShadow: "0 6px 16px rgba(32,0,65,0.06)" }}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(37,211,102,0.12)", color: "#128C7E" }}>
                                  <UserRound size={20} strokeWidth={2.1} aria-hidden="true" />
                                </span>
                                <div>
                                  <p className="text-[0.98rem] font-semibold" style={{ color: "#241d1a" }}>
                                    Florencia Sandez
                                  </p>
                                  <p className="mt-0.5 text-[0.82rem]" style={{ color: "rgba(36,29,26,0.52)" }}>
                                    Confirmó desde WhatsApp
                                  </p>
                                </div>
                              </div>
                              <div className="rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(37,211,102,0.12)", color: "#128C7E" }}>
                                Nuevo
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
