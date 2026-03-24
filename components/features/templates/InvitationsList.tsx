"use client";
import { Template } from "@/utils/types";
import Image from "next/image";
import { InvitationsListSkeleton } from "@/components/shared/skeletons/InvitationsListSkeleton";
import { useTemplates } from "@/hooks/useTemplates";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ErrorState } from "@/components/shared/states/ErrorState";
import { EmptyState } from "@/components/shared/states/EmptyState";
import { openWhatsApp } from "@/utils/openWhatsapp";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function InvitationsList() {
  const t = useTranslations("Templates");
  const selectedCategories = useCategoriesStore((s) => s.selectedCategories);
  const { data: invitations = [], isLoading, error, refetch } = useTemplates(selectedCategories);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!invitations.length) return;
    const wrapper = wrapperRef.current;
    const strip = stripRef.current;
    if (!wrapper || !strip) return;
    if (window.innerWidth < 768) return;

    let ctx: gsap.Context;

    // rAF garantiza que el layout esté painted y scrollWidth sea correcto
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const cards = Array.from(strip.querySelectorAll<HTMLElement>(".carousel-card"));
        const CARD_W = cards[0]?.offsetWidth ?? 400;
        const GAP = 40; // gap-10
        const totalScroll = strip.scrollWidth - window.innerWidth;
        if (totalScroll <= 0) return;

        // Strip horizontal scrolleado por GSAP scrub
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            start: "top top",
            end: `+=${totalScroll}`,
            scrub: 1.2,
            anticipatePin: 1,
            onUpdate: () => {
              const currentX = gsap.getProperty(strip, "x") as number;
              imageRefs.current.forEach((img, i) => {
                if (!img) return;
                const cardCenter = i * (CARD_W + GAP) + currentX + CARD_W / 2;
                const distFromCenter = cardCenter - window.innerWidth / 2;
                gsap.set(img, { x: -(distFromCenter * 0.06), force3D: true });
              });
            },
          },
        });
        tl.to(strip, { x: -totalScroll, ease: "none" });

        // Efecto "tren": cada card entra desde más lejos y se pega a la siguiente
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { x: 220 },
            {
              x: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: "left right",
                end: "left 35%",
                scrub: 0.4,
              },
            }
          );
        });
      }, wrapper);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [invitations.length]);

  if (isLoading) return <InvitationsListSkeleton />;
  if (error) return <ErrorState message={t("error")} onRetry={() => refetch()} retryLabel={t("retry")} />;
  if (invitations.length === 0) return <EmptyState message={t("noResults")} />;

  return (
    <>
      {/* Desktop: GSAP horizontal carousel */}
      <div
        ref={wrapperRef}
        className="hidden md:block relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Header fijo dentro del pin — split data bar */}
        <div
          className="absolute z-20 pointer-events-none flex items-end justify-between"
          style={{ top: "clamp(2rem, 5vh, 3.5rem)", left: "12vw", right: "12vw" }}
        >
          <h2
            className="font-display font-normal leading-none"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 4rem)",
              color: "#200041",
              letterSpacing: "-0.03em",
            }}
          >
            Invitaciones
          </h2>
          <div className="flex items-center gap-6 pb-1">
            <span
              className="font-mono uppercase"
              style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "#bc8129" }}
            >
              +15 plantillas
            </span>
            <span style={{ color: "rgba(32,0,65,0.2)", fontSize: "0.6rem" }}>·</span>
            <span
              className="font-mono uppercase"
              style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(32,0,65,0.4)" }}
            >
              Scroll para explorar →
            </span>
          </div>
        </div>

        <div
          ref={stripRef}
          className="absolute top-0 left-0 h-full flex items-center gap-10"
          style={{ paddingLeft: "12vw", paddingRight: "20vw", willChange: "transform" }}
        >
          {invitations.slice(0, 6).map((invitation: Template, index: number) => (
            <div
              key={invitation.id}
              className="carousel-card group relative shrink-0 overflow-hidden rounded-2xl cursor-pointer"
              style={{
                width: "clamp(340px, 42vw, 560px)",
                height: "clamp(500px, 82vh, 720px)",
                boxShadow: "0 20px 60px rgba(32,0,65,0.18)",
              }}
            >
              {/* Image parallax container */}
              <div
                ref={(el) => { imageRefs.current[index] = el; }}
                className="absolute inset-0"
                style={{ transform: "scale(1.14)", willChange: "transform" }}
              >
                {invitation.preview_url && (
                  <Image
                    src={invitation.preview_url}
                    alt={invitation.display_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 40vw, 30vw"
                    unoptimized
                  />
                )}
              </div>

              {/* Gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
                }}
              />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <p
                  className="font-mono uppercase mb-1.5"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {invitation.category?.display_name}
                </p>
                <h3
                  className="font-display font-normal text-white leading-tight"
                  style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)", letterSpacing: "-0.01em" }}
                >
                  {invitation.display_name}
                </h3>
              </div>

              {/* Hover CTA */}
              <div
                className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.25)" }}
              >
                <a
                  href="https://invitation-front-chi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="sm">
                    {t("viewDemo")}
                  </Button>
                </a>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() =>
                    openWhatsApp(t("getMessage", { name: invitation.display_name }))
                  }
                >
                  {t("get")}
                </Button>
              </div>
            </div>
          ))}

          {/* Card CTA — Explorar más */}
          <div
            className="carousel-card shrink-0 rounded-2xl flex flex-col items-center justify-center gap-6 cursor-pointer group"
            style={{
              width: "clamp(340px, 42vw, 560px)",
              height: "clamp(500px, 82vh, 720px)",
              backgroundColor: "#ffffff",
              boxShadow: "0 20px 60px rgba(32,0,65,0.18)",
            }}
          >
            <p
              className="font-mono uppercase text-center"
              style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(32,0,65,0.35)" }}
            >
              ¿No encontraste lo que buscás?
            </p>
            <h3
              className="font-display font-normal text-center leading-tight"
              style={{
                fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
                letterSpacing: "-0.02em",
                color: "#200041",
              }}
            >
              Ver todas las
              <br />
              <em style={{ color: "#bc8129" }}>plantillas.</em>
            </h3>
            <Button
              variant="outline"
              onClick={() => openWhatsApp(t("getMessage", { name: "una invitación" }))}
              className="mt-2 transition-transform duration-300 group-hover:scale-105"
            >
              Explorar catálogo
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: grid 2 columnas */}
      <div className="md:hidden grid grid-cols-2 gap-3 mt-4 px-4">
        {invitations.slice(0, 5).map((invitation: Template) => (
          <div
            key={invitation.id}
            className="group relative overflow-hidden rounded-xl cursor-pointer"
            style={{
              aspectRatio: "3/4",
              boxShadow: "0 8px 24px rgba(32,0,65,0.14)",
            }}
          >
            {invitation.preview_url && (
              <Image
                src={invitation.preview_url}
                alt={invitation.display_name}
                fill
                className="object-cover"
                sizes="50vw"
                unoptimized
              />
            )}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
              <p
                className="font-mono uppercase mb-0.5"
                style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}
              >
                {invitation.category?.display_name}
              </p>
              <h3
                className="font-display font-normal text-white leading-tight"
                style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}
              >
                {invitation.display_name}
              </h3>
            </div>
          </div>
        ))}

        {/* Card CTA mobile */}
        <div
          className="relative overflow-hidden rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer"
          style={{
            aspectRatio: "3/4",
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 24px rgba(32,0,65,0.14)",
          }}
          onClick={() => openWhatsApp(t("getMessage", { name: "una invitación" }))}
        >
          <p
            className="font-mono uppercase text-center px-4"
            style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(32,0,65,0.35)" }}
          >
            ¿No encontraste lo que buscás?
          </p>
          <h3
            className="font-display font-normal text-center leading-tight px-4"
            style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", color: "#200041" }}
          >
            Ver todas las
            <br />
            <em style={{ color: "#bc8129" }}>plantillas.</em>
          </h3>
          <Button variant="outline" size="sm" className="mt-1 pointer-events-none">
            Explorar
          </Button>
        </div>
      </div>
    </>
  );
}
