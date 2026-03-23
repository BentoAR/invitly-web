import { Suspense, lazy } from "react";
import Hero from "@/components/features/home/Hero";

const TemplatesSection = lazy(
  () => import("@/components/features/home/TemplatesSection"),
);
const HowItWorksSection = lazy(
  () => import("@/components/features/home/HowItWorksSection"),
);
const Features = lazy(() => import("@/components/features/home/Features"));
const ContactSection = lazy(
  () => import("@/components/features/home/ContactSection"),
);

import { FeaturesSkeleton } from "@/components/shared/skeletons/FeaturesSkeleton";

export const revalidate = 3600;

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
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
        <ContactSection />
      </Suspense>
    </div>
  );
}
