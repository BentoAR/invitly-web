import { Suspense } from "react";
import type { Metadata } from "next";
import HeroB2B from "@/components/features/empresas/HeroB2B";
import BeforeAfterB2B from "@/components/features/empresas/BeforeAfterB2B";
import LogoWall from "@/components/features/empresas/LogoWall";
import ValuePropsB2B from "@/components/features/empresas/ValuePropsB2B";
import HowItWorksB2B from "@/components/features/empresas/HowItWorksB2B";
import SalonControlB2B from "@/components/features/empresas/SalonControlB2B";
import DashboardShowcaseB2B from "@/components/features/empresas/DashboardShowcaseB2B";
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
      ? "Planes para Salones y Wedding Planners | Bento para Empresas"
      : "Plans for Event Venues and Wedding Planners | Bento for Business";

  const description =
    locale === "es"
      ? "Ofrecé invitaciones digitales premium a tus clientes. Planes a medida para salones de eventos, wedding planners y organizadores profesionales en Argentina. Plataforma completa con panel para planners, soporte en español."
      : "Offer premium digital invitations to your clients. Custom plans for event venues, wedding planners and professional organizers. Complete platform with planner panel, support in Spanish.";

  const keywords =
    locale === "es"
      ? [
          "salones de eventos argentina",
          "wedding planner software",
          "invitaciones digitales para empresas",
          "plataforma eventos corporativos",
          "software para wedding planners",
          "gestión de eventos profesionales",
          "invitaciones premium para salones",
        ]
      : [
          "event venues argentina",
          "wedding planner software",
          "business digital invitations",
          "corporate event platform",
          "wedding planner software",
          "professional event management",
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

const SectionSkeleton = () => <div className="bg-neutral-950 py-24 md:py-32" />;

export default async function EmpresasPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <HeroB2B />

      <Suspense fallback={<SectionSkeleton />}>
        <BeforeAfterB2B />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <LogoWall />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ValuePropsB2B />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HowItWorksB2B />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <SalonControlB2B />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <DashboardShowcaseB2B />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <PricingB2B />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <OtherChannels />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsB2B />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQB2B />
      </Suspense>

      <FinalCTAB2B />
    </div>
  );
}
