"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Container } from "./Container";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const pathname = usePathname();
  const isDarkPage = pathname.includes("/empresas");

  const links = [
    { label: t("home"), href: `/${locale}` },
    { label: t("invitations"), href: `/${locale}/templates` },
    { label: t("pricing"), href: `/${locale}/pricing` },
    { label: t("contact"), href: `/${locale}/contact` },
  ];

  return (
    <footer
      className={`${isDarkPage ? "" : "mt-20"} border-t ${
        isDarkPage
          ? "bg-neutral-950 border-neutral-800/60"
          : "bg-secondary/30 border-border"
      }`}
    >
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a
              href={`/${locale}`}
              className="flex items-center mb-4 hover:opacity-80 transition-opacity"
            >
              <Image
                src="https://d14sb9d2krfjkl.cloudfront.net/media/Frame+14+(1).svg"
                alt="Bento Logo"
                width={100}
                height={32}
                className="h-8 w-auto"
              />
            </a>
            <p
              className={`text-sm max-w-md ${
                isDarkPage ? "text-neutral-400" : "text-muted-foreground"
              }`}
            >
              {t("description")}
            </p>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 ${
                isDarkPage ? "text-white" : ""
              }`}
            >
              {t("navigation")}
            </h4>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`transition-colors ${
                      isDarkPage
                        ? "text-neutral-400 hover:text-[#FFA459]"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-sm ${
            isDarkPage
              ? "border-neutral-800/60 text-neutral-500"
              : "border-border text-muted-foreground"
          }`}
        >
          <p>{t("copyright")}</p>
          <p>{t("madeIn")}</p>
        </div>
      </Container>
    </footer>
  );
}
