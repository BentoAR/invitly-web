"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const APP_URL = "https://app.bento.com.ar";

const plans = [
  {
    name: "Básico", price: "Gratis", priceNote: "Para siempre",
    description: "Para probar Bento y ver cómo funciona",
    cta: "Empezar gratis", ctaHref: `${APP_URL}/register`, featured: false,
    features: [
      { label: "1 evento activo", included: true },
      { label: "Hasta 50 invitados", included: true },
      { label: "Templates básicas", included: true },
      { label: "RSVP automático", included: true },
      { label: "Playlist colaborativa", included: false },
      { label: "Sin branding de Bento", included: false },
      { label: "Estadísticas detalladas", included: false },
      { label: "Soporte prioritario", included: false },
    ],
  },
  {
    name: "Celebración", price: "Consultar", priceNote: "por evento",
    description: "Para eventos especiales que se merecen lo mejor",
    cta: "Elegir Celebración", ctaHref: `${APP_URL}/register?plan=pro`, featured: true,
    features: [
      { label: "Eventos ilimitados", included: true },
      { label: "Hasta 500 invitados", included: true },
      { label: "Todas las templates", included: true },
      { label: "RSVP automático", included: true },
      { label: "Playlist colaborativa", included: true },
      { label: "Sin branding de Bento", included: true },
      { label: "Estadísticas detalladas", included: true },
      { label: "Soporte prioritario", included: false },
    ],
  },
  {
    name: "Premium", price: "Consultar", priceNote: "por mes",
    description: "Para organizadores y planners profesionales",
    cta: "Contactar", ctaHref: "#contacto", featured: false,
    features: [
      { label: "Eventos ilimitados", included: true },
      { label: "Invitados ilimitados", included: true },
      { label: "Templates exclusivas", included: true },
      { label: "RSVP automático", included: true },
      { label: "Playlist colaborativa", included: true },
      { label: "Sin branding de Bento", included: true },
      { label: "Estadísticas detalladas", included: true },
      { label: "Soporte prioritario", included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="precios" className="py-24 bg-secondary/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#bc8129" }}>Precios</p>
          <h2 className="font-display font-normal leading-[1.08] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#200041", letterSpacing: "-0.03em" }}>
            Simple y transparente
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">Empezá gratis. Upgrades cuando los necesités.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${plan.featured ? "border-primary shadow-lg bg-background" : "border-border/60 bg-background/50"}`}>
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Más elegido</span>
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
                {plan.features.map((f, fi) => (
                  <li key={f.label} className="flex items-center gap-2 text-sm">
                    {f.included ? <Check className="h-4 w-4 text-primary shrink-0" /> : <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />}
                    <span className={f.included ? "text-foreground" : "text-muted-foreground/60"}>{f.label}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.ctaHref}
                target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
                rel={plan.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}>
                <Button className="w-full" variant={plan.featured ? "default" : "outline"}>{plan.cta}</Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground text-center">
          <span>Sin tarjeta de crédito para el plan gratuito</span>
          <span className="hidden sm:block">·</span>
          <span>Cancelás cuando querés</span>
          <span className="hidden sm:block">·</span>
          <span>¿Tenés un salón o sos organizador?{" "}
            <a href="#contacto" className="text-primary underline underline-offset-4 hover:no-underline">Hablemos</a>
          </span>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Menos que imprimir 20 tarjetas. Y sin gastar en sobre ni en correo.
        </p>
      </div>
    </section>
  );
}
