"use client";
import { motion } from "framer-motion";
import { Phone, Mail, Instagram } from "lucide-react";
import { fadeInUp } from "@/utils/animations";
import { useTranslations } from "next-intl";

export default function ContactInfo() {
  const t = useTranslations("Contact");
  return (
    <motion.div variants={fadeInUp} className="space-y-6">
      <address
        className="bg-card rounded-2xl p-8 shadow-soft not-italic"
        aria-label={t("contactInfo")}
      >
        <h3 className="font-display text-2xl font-bold mb-6">
          {t("contactInfo")}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium">{t("phone")}</p>
              <p className="text-sm text-muted-foreground">
                <a
                  href="tel:+5491112345678"
                  aria-label={t("phone") + " +54 9 11 1234-5678"}
                >
                  +54 9 11 1234-5678
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium">{t("email")}</p>
              <p className="text-sm text-muted-foreground">
                <a
                  href="mailto:hola@Bento.com"
                  aria-label={t("email") + " hola@Bento.com"}
                >
                  hola@Bento.com
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Instagram className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium">{t("instagram")}</p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
                aria-label="Instagram Bento (abre en nueva pestaña)"
              >
                @Bento
              </a>
            </div>
          </div>
        </div>
      </address>
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
        <h4 className="font-semibold text-lg mb-2">{t("hoursTitle")}</h4>
        <p
          className="text-sm text-muted-foreground mb-4"
          style={{ whiteSpace: "pre-line" }}
        >
          {t("hours")}
        </p>
        <p className="text-xs text-muted-foreground">{t("responseTime")}</p>
      </div>
    </motion.div>
  );
}
