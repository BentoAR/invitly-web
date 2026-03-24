"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Palette,
  Smartphone,
  Users,
  Bell,
  Camera,
  Music,
  LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ICONS: LucideIcon[] = [Palette, Smartphone, Users, Bell, Camera, Music];

type Feature = { title: string; description: string };

export default function FeaturesScrollSequence({
  features,
  sectionTitle,
}: {
  features: Feature[];
  sectionTitle: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const n = features.length;
    const section = sectionRef.current;
    if (!section || n === 0) return;

    const ctx = gsap.context(() => {
      textRefs.current.forEach((el, i) =>
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 48 })
      );
      cardRefs.current.forEach((el, i) =>
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 })
      );
      dotRefs.current.forEach((el, i) =>
        gsap.set(el, { scale: i === 0 ? 1 : 0.6, opacity: i === 0 ? 1 : 0.25 })
      );
      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const scrollLength = (n - 1) * window.innerHeight;

      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        end: `+=${scrollLength}`,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: 1.6,
        },
      });

      for (let i = 0; i < n - 1; i++) {
        tl.to(textRefs.current[i], {
          y: -48,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        tl.to(
          cardRefs.current[i],
          { y: -24, autoAlpha: 0, duration: 0.28, ease: "power2.in" },
          "<"
        );
        tl.to(dotRefs.current[i], { scale: 0.6, opacity: 0.25, duration: 0.2 }, "<");
        tl.to(dotRefs.current[i + 1], { scale: 1, opacity: 1, duration: 0.2 }, "<");
        tl.to(
          progressRef.current,
          { scaleX: (i + 1) / (n - 1), duration: 0.4, ease: "none" },
          "<"
        );

        tl.fromTo(
          textRefs.current[i + 1],
          { y: 48, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" }
        );
        tl.fromTo(
          cardRefs.current[i + 1],
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" },
          "<"
        );

        tl.to({}, { duration: 0.55 });
      }
    }, section);

    return () => ctx.revert();
  }, [features.length]);

  return (
    <section
      id="caracteristicas"
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: "#0e0c1a" }}
      aria-label={sectionTitle}
    >
      {/* Ambient glow — top left */}
      <div
        className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(32,0,65,0.9) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Ambient glow — bottom right */}
      <div
        className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(188,129,41,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-[82rem] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 lg:gap-0 items-center h-full">

        {/* Left — text panels */}
        <div className="relative h-full flex items-center pr-0 lg:pr-20">
          {features.map((feature, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className="absolute left-0"
              >
                {/* Counter */}
                <div
                  className="font-mono text-xs tracking-[0.35em] uppercase mb-8 flex items-center gap-3"
                  style={{ color: "#bc8129" }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className="flex-1 h-px max-w-[40px]"
                    style={{ background: "rgba(188,129,41,0.4)" }}
                  />
                  <span style={{ color: "rgba(255,252,247,0.3)" }}>
                    {String(features.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-normal leading-[1.1] mb-8"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    color: "#fffcf7",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="leading-relaxed max-w-sm"
                  style={{
                    fontSize: "1.0625rem",
                    color: "rgba(255,252,247,0.55)",
                    lineHeight: "1.75",
                  }}
                >
                  {feature.description}
                </p>

                {/* Icon badge */}
                <div className="mt-10 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(255,252,247,0.05)",
                      border: "1px solid rgba(255,252,247,0.08)",
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "rgba(255,252,247,0.4)" }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span
                    className="text-xs tracking-widest uppercase font-medium"
                    style={{ color: "rgba(255,252,247,0.25)" }}
                  >
                    {feature.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div
          className="hidden lg:block self-stretch my-16"
          style={{ background: "rgba(255,252,247,0.06)" }}
          aria-hidden="true"
        />

        {/* Right — decorative cards */}
        <div className="hidden lg:flex relative h-full items-center justify-center pl-20">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute w-full max-w-sm"
            >
              <div
                className="relative rounded-2xl overflow-hidden p-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,252,247,0.04) 0%, rgba(255,252,247,0.01) 100%)",
                  border: "1px solid rgba(255,252,247,0.07)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Large background number */}
                <div
                  className="absolute -bottom-4 -right-2 font-display font-normal leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(8rem, 18vw, 14rem)",
                    color: "rgba(255,252,247,0.035)",
                    letterSpacing: "-0.04em",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Card content */}
                <div className="relative z-10">
                  <div
                    className="text-xs tracking-[0.25em] uppercase font-mono mb-6"
                    style={{ color: "#bc8129" }}
                  >
                    Bento
                  </div>
                  <div
                    className="font-display font-normal leading-tight mb-4"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      color: "#fffcf7",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </div>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: "rgba(255,252,247,0.4)",
                      lineHeight: "1.7",
                    }}
                  >
                    {feature.description}
                  </p>

                  {/* Gold separator */}
                  <div
                    className="mt-8 h-px w-12"
                    style={{ background: "rgba(188,129,41,0.5)" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical progress dots — right edge */}
      <div
        className="absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10"
        aria-hidden="true"
      >
        {features.map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            className="block w-1 h-1 rounded-full"
            style={{ background: "#bc8129" }}
          />
        ))}
      </div>

      {/* Progress bar — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "rgba(255,252,247,0.06)" }}
        aria-hidden="true"
      >
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{ background: "#bc8129" }}
        />
      </div>
    </section>
  );
}
