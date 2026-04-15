import { Suspense } from "react";
import type { Metadata } from "next";
import HeroB2B from "@/components/features/empresas/HeroB2B";
import LogoWall from "@/components/features/empresas/LogoWall";
import ValuePropsB2B from "@/components/features/empresas/ValuePropsB2B";
import HowItWorksB2B from "@/components/features/empresas/HowItWorksB2B";
import PricingB2B from "@/components/features/empresas/PricingB2B";
import OtherChannels from "@/components/features/empresas/OtherChannels";
import TestimonialsB2B from "@/components/features/empresas/TestimonialsB2B";
import FAQB2B from "@/components/features/empresas/FAQB2B";
import FinalCTAB2B from "@/components/features/empresas/FinalCTAB2B";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Bento para Salones de Eventos y Wedding Planners | Planes B2B",
    description:
      "Ofrecé invitaciones digitales premium a tus clientes. Planes desde $250k/mes para salones, wedding planners y organizadores profesionales. Primer mes gratis.",
    keywords:
      "salones de eventos argentina, wedding planner software, invitaciones digitales b2b, plataforma eventos corporativos",
    openGraph: {
      title: "Bento para Salones y Empresas",
      description: "Recuperá la inversión con el primer cliente. Planes B2B desde $250k/mes.",
      type: "website",
    },
  };
}

export default async function EmpresasPage() {
  return (
    <div className="min-h-screen">
      {/* Hero B2B */}
      <HeroB2B />

      {/* Logo Wall */}
      <LogoWall />

      {/* Value Props */}
      <ValuePropsB2B />

      {/* How It Works */}
      <HowItWorksB2B />

      {/* Pricing */}
      <Suspense fallback={<div className="py-24" />}>
        <PricingB2B />
      </Suspense>

      {/* Other Channels */}
      <OtherChannels />

      {/* Testimonials */}
      <Suspense fallback={<div className="py-24" />}>
        <TestimonialsB2B />
      </Suspense>

      {/* FAQ */}
      <Suspense fallback={<div className="py-24" />}>
        <FAQB2B />
      </Suspense>

      {/* Final CTA */}
      <FinalCTAB2B />
    </div>
  );
}
