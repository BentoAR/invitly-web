"use client";

import type { ReactNode } from "react";
import { analytics } from "@/utils/analytics";

const number = "541157572713";
const message = "Hola, organizo eventos y quiero conversar sobre una invitación digital para un cliente.";

export function AgencyContactCta({
  children,
  className,
  location,
}: {
  children: ReactNode;
  className: string;
  location: string;
}) {
  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => analytics.whatsappClicked(location)}
    >
      {children}
    </a>
  );
}
