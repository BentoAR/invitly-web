import { Suspense, lazy } from "react";
import Hero from "@/components/features/home/Hero";
import SocialProofBanner from "@/components/features/home/SocialProofBanner";

const HowItWorksSection = lazy(() => import("@/components/features/home/HowItWorksSection"));
const TemplatesSection = lazy(() => import("@/components/features/home/TemplatesSection"));
const Features = lazy(() => import("@/components/features/home/Features"));
const Testimonials = lazy(() => import("@/components/features/home/Testimonials"));
const Pricing = lazy(() => import("@/components/features/home/Pricing"));
const B2BAwarenessBanner = lazy(() => import("@/components/features/home/B2BAwarenessBanner"));
const FAQ = lazy(() => import("@/components/features/home/FAQ"));
const CtaSplit = lazy(() => import("@/components/features/home/CtaSplit"));

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

export default async function Home() {
  return (
    <div className="min-h-screen">
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
    </div>
  );
}
