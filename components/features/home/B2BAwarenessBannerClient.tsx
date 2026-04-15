"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ContactForm from "@/components/features/contact/ContactForm";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface B2BAwarenessBannerClientProps {
  badge: string;
  title: string;
  subtitle: string;
  benefits: Benefit[];
  cta: {
    primary: string;
    secondary: string;
  };
  trustLine: string;
}

export default function B2BAwarenessBannerClient({
  badge,
  title,
  subtitle,
  benefits,
  cta,
  trustLine,
}: B2BAwarenessBannerClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="py-12 md:py-20 bg-gradient-to-br from-secondary/20 to-secondary/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-10">
            <p className="font-mono text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#bc8129" }}>
              {badge}
            </p>
            <h2
              className="font-display font-normal leading-[1.08] mb-4 max-w-3xl mx-auto"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#200041", letterSpacing: "-0.03em" }}
            >
              {title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">{subtitle}</p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex flex-col items-start gap-3 p-6 rounded-xl border border-border/60 bg-background/80 backdrop-blur-sm"
              >
                <span className="text-3xl" aria-hidden="true">
                  {benefit.icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold mb-1 text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/empresas">
              <Button size="lg" className="group">
                {cta.primary}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="group" onClick={() => setIsContactOpen(true)}>
              <MessageCircle className="mr-2 h-4 w-4" />
              {cta.secondary}
            </Button>
          </div>

          {/* Trust Line */}
          <p className="text-center text-sm text-muted-foreground">{trustLine}</p>
        </div>
      </section>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl" style={{ color: "#200041" }}>
              Contactanos
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <ContactForm />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
