import { Suspense, lazy } from "react";
import Hero from "@/components/features/home/Hero";
import SocialProofBanner from "@/components/features/home/SocialProofBanner";

const HowItWorksSection = lazy(() => import("@/components/features/home/HowItWorksSection"));
const TemplatesSection = lazy(() => import("@/components/features/home/TemplatesSection"));
const Features = lazy(() => import("@/components/features/home/Features"));
const Testimonials = lazy(() => import("@/components/features/home/Testimonials"));
const Pricing = lazy(() => import("@/components/features/home/Pricing"));
const FAQ = lazy(() => import("@/components/features/home/FAQ"));
const CtaSplit = lazy(() => import("@/components/features/home/CtaSplit"));

import { FeaturesSkeleton } from "@/components/shared/skeletons/FeaturesSkeleton";

export const revalidate = 3600;

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <SocialProofBanner />
      <Suspense fallback={<div className="h-screen bg-[#0a0a0f]" />}>
        <HowItWorksSection />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <TemplatesSection />
      </Suspense>
      <Suspense fallback={<FeaturesSkeleton />}>
        <Features />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<div className="py-16" />}>
        <CtaSplit />
      </Suspense>
    </div>
  );
}
