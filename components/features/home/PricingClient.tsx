"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  badge: string;
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
  badge,
  title,
  subtitle,
  plans,
  featuredBadge,
  footer,
}: PricingClientProps) {
  const getCtaHref = (planName: string, cta: string) => {
    if (cta === "Contactar") return "#contacto";
    if (planName === "Celebración") return `${APP_URL}/register?plan=pro`;
    return `${APP_URL}/register`;
  };

  return (
    <section id="precios" className="py-12 md:py-24 bg-secondary/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#bc8129" }}>
            {badge}
          </p>
          <h2
            className="font-display font-normal leading-[1.08] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#200041", letterSpacing: "-0.03em" }}
          >
            {title}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                plan.featured
                  ? "border-primary shadow-lg bg-background"
                  : "border-border/60 bg-background/50"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {featuredBadge}
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold font-display">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.priceNote}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
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
                href={getCtaHref(plan.name, plan.cta)}
                target={getCtaHref(plan.name, plan.cta).startsWith("http") ? "_blank" : undefined}
                rel={getCtaHref(plan.name, plan.cta).startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground text-center">
          <span>{footer.line1}</span>
          <span className="hidden sm:block">·</span>
          <span>{footer.line2}</span>
          <span className="hidden sm:block">·</span>
          <span>
            {footer.line3}{" "}
            <a href="#contacto" className="text-primary underline underline-offset-4 hover:no-underline">
              {footer.line3Link}
            </a>
          </span>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">{footer.priceNote}</p>
      </div>
    </section>
  );
}
