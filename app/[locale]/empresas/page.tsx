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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "es"
      ? "Planes B2B para Salones y Wedding Planners | Bento Empresas"
      : "B2B Plans for Event Venues and Wedding Planners | Bento Business";

  const description =
    locale === "es"
      ? "Ofrecé invitaciones digitales premium a tus clientes. Más de 50 salones confían en Bento. Planes B2B desde $250k/mes para salones de eventos, wedding planners y organizadores profesionales en Argentina. Primer mes gratis, ROI inmediato, soporte prioritario."
      : "Offer premium digital invitations to your clients. Over 50 venues trust Bento. B2B plans from $250k/month for event venues, wedding planners and professional organizers in Argentina. First month free, immediate ROI, priority support.";

  const keywords =
    locale === "es"
      ? [
          "salones de eventos argentina",
          "wedding planner software",
          "invitaciones digitales b2b",
          "plataforma eventos corporativos",
          "software para wedding planners",
          "gestión de eventos b2b",
          "invitaciones premium para salones",
        ]
      : [
          "event venues argentina",
          "wedding planner software",
          "b2b digital invitations",
          "corporate event platform",
          "wedding planner software",
          "b2b event management",
          "premium invitations for venues",
        ];

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "https://d14sb9d2krfjkl.cloudfront.net/media/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
