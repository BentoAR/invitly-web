"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analytics } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/openWhatsapp";

/**
 * Botón de consulta previa a la compra.
 *
 * En modelo pay-first este click es el proxy más directo de intención de compra
 * que tenemos antes del checkout. Por eso se trackea aparte del WhatsApp genérico.
 */
export default function PreSaleWhatsappButton({
  label,
  message,
}: {
  label: string;
  message: string;
}) {
  return (
    <Button
      type="button"
      size="lg"
      className="w-full rounded-full bg-[#FFA459] px-6 text-white hover:bg-[#FFA459]/90 sm:w-auto"
      onClick={() => {
        analytics.preSaleWhatsappClick();
        openWhatsApp(message);
      }}
      aria-label={label}
    >
      <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
