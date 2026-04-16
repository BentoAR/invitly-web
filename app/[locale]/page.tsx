import { Suspense, lazy } from "react";
import type { Metadata } from "next";
import Hero from "@/components/features/home/Hero";
import SocialProofBanner from "@/components/features/home/SocialProofBanner";
import StructuredData from "@/components/shared/StructuredData";
import { generatePageMetadata } from "@/src/utils/metadata";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getServiceSchema,
  getEventSchema,
} from "@/src/utils/structuredData";
import { getTranslations } from "next-intl/server";

const HowItWorksSection = lazy(() => import("@/components/features/home/HowItWorksSection"));
const TemplatesSection = lazy(() => import("@/components/features/home/TemplatesSection"));
const Features = lazy(() => import("@/components/features/home/Features"));
const Testimonials = lazy(() => import("@/components/features/home/Testimonials"));
const Pricing = lazy(() => import("@/components/features/home/Pricing"));
const B2BAwarenessBanner = lazy(() => import("@/components/features/home/B2BAwarenessBanner"));
const FAQ = lazy(() => import("@/components/features/home/FAQ"));
const CtaSplit = lazy(() => import("@/components/features/home/CtaSplit"));
const SEOContent = lazy(() => import("@/components/features/home/SEOContent"));

import { FeaturesSkeleton } from "@/components/shared/skeletons/FeaturesSkeleton";
import {
  HowItWorksSkeleton,
  TemplatesSectionSkeleton,
  TestimonialsSkeleton,
  PricingSkeleton,
  BannerSkeleton,
  FAQSkeleton,
  CtaSkeleton,
} from "@/components/shared/skeletons/HomeSectionSkeletons";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });

  const title =
    locale === "es"
      ? "Invitaciones Digitales Profesionales para Eventos"
      : "Professional Digital Event Invitations";

  const description =
    locale === "es"
      ? "Crea invitaciones digitales profesionales para bodas, cumpleaños, eventos corporativos y más. Más de 200 plantillas premium, RSVP automático, playlist colaborativa y gestión completa de invitados. La plataforma #1 de invitaciones digitales en Argentina con más de 10,000 eventos organizados."
      : "Create professional digital invitations for weddings, birthdays, corporate events and more. Over 200 premium templates, automatic RSVP, collaborative playlist and complete guest management. The #1 digital invitation platform in Argentina with over 10,000 events organized.";

  const keywords =
    locale === "es"
      ? [
          "invitaciones digitales argentina",
          "crear invitaciones online",
          "invitaciones para bodas",
          "invitaciones para cumpleaños",
          "rsvp automático",
          "plantillas de invitaciones",
          "alternativa a invitaciones impresas",
          "confirmación de asistencia online",
        ]
      : [
          "digital invitations argentina",
          "create online invitations",
          "wedding invitations",
          "birthday invitations",
          "automatic rsvp",
          "invitation templates",
          "alternative to printed invitations",
          "online rsvp",
        ];

  return generatePageMetadata({
    title,
    description,
    path: "",
    locale,
    keywords,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Generate structured data for SEO and AI discoverability
  const structuredData = [
    getOrganizationSchema(locale),
    getWebSiteSchema(locale),
    getServiceSchema(locale),
    getEventSchema(locale),
  ];

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />
      <Hero />
      <SocialProofBanner />
      <Suspense fallback={<HowItWorksSkeleton />}>
        <HowItWorksSection />
      </Suspense>
      <Suspense fallback={<TemplatesSectionSkeleton />}>
        <TemplatesSection />
      </Suspense>
      {/* Wrapper con fondo continuo para Features + Testimonials */}
      <div className="relative" style={{ backgroundColor: "#fff8f0" }}>
        {/* Nubes naranjas difuminadas sobre fondo claro */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 900px 500px at 20% 65%,
                rgba(255, 164, 89, 0.45) 0%,
                rgba(255, 180, 120, 0.35) 18%,
                rgba(255, 200, 150, 0.25) 35%,
                rgba(255, 220, 180, 0.15) 50%,
                transparent 68%),
              radial-gradient(ellipse 750px 420px at 80% 30%,
                rgba(255, 140, 70, 0.5) 0%,
                rgba(255, 164, 89, 0.38) 20%,
                rgba(255, 190, 130, 0.25) 40%,
                rgba(255, 210, 170, 0.12) 55%,
                transparent 70%),
              radial-gradient(ellipse 650px 380px at 45% 50%,
                rgba(255, 180, 100, 0.42) 0%,
                rgba(255, 200, 140, 0.3) 22%,
                rgba(255, 220, 180, 0.18) 45%,
                transparent 65%),
              radial-gradient(ellipse 550px 320px at 70% 75%,
                rgba(255, 150, 80, 0.48) 0%,
                rgba(255, 175, 110, 0.32) 20%,
                rgba(255, 200, 150, 0.2) 42%,
                transparent 62%),
              radial-gradient(ellipse 800px 450px at 10% 25%,
                rgba(255, 164, 89, 0.4) 0%,
                rgba(255, 185, 125, 0.28) 22%,
                rgba(255, 210, 165, 0.15) 45%,
                transparent 68%)`,
          }}
        />
        <Suspense fallback={<FeaturesSkeleton />}>
          <Features />
        </Suspense>
        <Suspense fallback={<TestimonialsSkeleton />}>
          <Testimonials />
        </Suspense>
      </div>
      <Suspense fallback={<PricingSkeleton />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<BannerSkeleton />}>
        <B2BAwarenessBanner />
      </Suspense>
      <Suspense fallback={<FAQSkeleton />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<CtaSkeleton />}>
        <CtaSplit />
      </Suspense>
      <Suspense fallback={null}>
        <SEOContent />
      </Suspense>
    </div>
  );
}
