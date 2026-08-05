"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { analytics } from "@/utils/analytics";

const APP_URL = "https://app.bento.com.ar";

interface PlanFeature {
  label: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  cta: string;
  featured: boolean;
  features: PlanFeature[];
}

interface PricingClientProps {
  title: string;
  subtitle: string;
  plans: Plan[];
  featuredBadge: string;
  footer: {
    line1: string;
    line2: string;
    line3: string;
    line3Link: string;
    priceNote: string;
  };
}

export default function PricingClient({
  title,
  subtitle,
  plans,
  featuredBadge,
  footer,
}: PricingClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftOverlayRef = useRef<HTMLDivElement>(null);
  const rightOverlayRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const ctaHref = `${APP_URL}/billing/upgrade?reason=purchase`;

  useLayoutEffect(() => {
    if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, filter: "blur(0px)" });
    if (cardsGridRef.current) gsap.set(cardsGridRef.current, { scale: 1 });
    if (leftOverlayRef.current) gsap.set(leftOverlayRef.current, { width: "0%" });
    if (rightOverlayRef.current) gsap.set(rightOverlayRef.current, { width: "0%" });
    if (leftTextRef.current) gsap.set(leftTextRef.current, { opacity: 0 });
    if (rightTextRef.current) gsap.set(rightTextRef.current, { opacity: 0 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="precios"
      className="relative flex items-center bg-background overflow-hidden py-16 lg:py-24"
    >
      <div
        className="lg:hidden absolute top-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)" }}
      />
      <div
        className="lg:hidden absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 100%)" }}
      />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-48 -left-48 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255,164,89,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(188,129,41,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(ellipse, rgba(255,164,89,0.15) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(188,129,41,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-24 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255,164,89,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -left-24 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255,164,89,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-2/3 -right-32 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(188,129,41,0.16) 0%, transparent 70%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(188,129,41,0.1) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 90%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={leftOverlayRef}
        className="hidden lg:flex absolute top-0 left-0 h-full items-center justify-end pr-12 pointer-events-none z-20"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          background: "linear-gradient(to right, rgba(255,255,255,0.3), transparent)",
        }}
        aria-hidden="true"
      >
        <div ref={leftTextRef}>
          <p
            className="font-display text-2xl font-normal leading-tight text-right"
            style={{
              color: "#200041",
              maxWidth: "280px",
              letterSpacing: "-0.02em",
              lineHeight: "1.3",
            }}
          >
            Planes que se adaptan<br />
            a tu visión
          </p>
        </div>
      </div>

      <div
        ref={rightOverlayRef}
        className="hidden lg:flex absolute top-0 right-0 h-full items-center justify-start pl-12 pointer-events-none z-20"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          background: "linear-gradient(to left, rgba(255,255,255,0.3), transparent)",
        }}
        aria-hidden="true"
      >
        <div ref={rightTextRef}>
          <p
            className="font-display text-2xl font-normal leading-tight"
            style={{
              color: "#200041",
              maxWidth: "280px",
              letterSpacing: "-0.02em",
              lineHeight: "1.3",
            }}
          >
            Desde bodas íntimas<br />
            hasta grandes fiestas
          </p>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-16 z-10 w-full">
        {/* El encabezado existía como `<div ref={headerRef} />` VACÍO: badge,
            title y subtitle llegaban por props y nunca se renderizaban. La
            sección de precios se mostraba sin ningún texto que la explicara. */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2
            className="font-display font-normal leading-[1.1] mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#200041",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div ref={cardsGridRef} className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-5 ${
                plan.featured
                  ? "border-primary shadow-lg bg-background"
                  : "border-border/60 bg-background/50"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {featuredBadge}
                  </span>
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-bold font-display">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.priceNote}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2 text-sm">
                    {f.included ? (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={f.included ? "text-foreground" : "text-muted-foreground/60"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={ctaHref}
                onClick={() => analytics.planCtaClick(plan.name)}
              >
                <Button className="min-h-11 w-full" variant={plan.featured ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground text-center">
          <span>{footer.line1}</span>
          <span className="hidden sm:block">·</span>
          <span>{footer.line2}</span>
          <span className="hidden sm:block">·</span>
          <span>
            {footer.line3}{" "}
            <a href="#contacto" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4 hover:no-underline">
              {footer.line3Link}
            </a>
          </span>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">{footer.priceNote}</p>
      </div>
    </section>
  );
}
