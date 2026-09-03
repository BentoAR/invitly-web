"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analytics } from "@/utils/analytics";

interface Props {
  primaryLabel: string;
  secondaryLabel: string;
  primaryHref: string;
  primaryExternal: boolean;
  ctaMode: string;
  demoHref: string;
}

/**
 * Acciones del hero.
 *
 * Es un componente cliente sólo para poder trackear los clicks: sin esto no hay
 * forma de saber cuánta gente llega al CTA principal, que es exactamente el dato
 * que faltaba para decidir si la home vende o no.
 */
export default function HeroActions({
  primaryLabel,
  secondaryLabel,
  primaryHref,
  primaryExternal,
  ctaMode,
  demoHref,
}: Props) {
  return (
    <div
      data-hero="cta"
      className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
    >
      <Link
        href={primaryHref}
        onClick={() => analytics.heroCtaClicked(ctaMode)}
        {...(primaryExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <Button
          size="lg"
          className="shadow-elegant group w-full sm:w-auto"
          aria-label={primaryLabel}
        >
          {primaryLabel}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </Link>

      <Link
        href={demoHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => analytics.heroDemoClicked()}
      >
        <Button
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
          aria-label={secondaryLabel}
        >
          {secondaryLabel}
          <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </Link>
    </div>
  );
}
