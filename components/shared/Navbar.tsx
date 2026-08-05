"use client";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Container } from "@/components/shared/Container";
import { analytics } from "@/utils/analytics";

const APP_URL = "https://app.bento.com.ar";
const subscribeToHydration = () => () => {};

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();

  const isHome = pathname === `/${locale}` || pathname === "/";
  const isDarkPage = pathname.includes("/empresas");

  const navLinks = [
    { name: t("inicio"), id: "inicio", href: `/${locale}` },
    { name: t("invitaciones"), id: "templates", href: `/${locale}/templates` },
    { name: t("precios"), id: "pricing", href: `/${locale}/pricing` },
    { name: t("contacto"), id: "contact", href: `/${locale}/contact` },
    { name: t("empresas"), id: "empresas", href: `/${locale}/empresas` },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const isInteractive = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHasScrolled(y > 50);
      setIsHidden(y > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = isDarkPage
    ? `border-white/10 ${
        hasScrolled
          ? "bg-neutral-950/85 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-neutral-950/40 backdrop-blur-sm"
      }`
    : `border-border/20 ${
        hasScrolled ? "shadow-md bg-background/95 backdrop-blur-md" : ""
      }`;

  const linkBaseClass = isDarkPage
    ? "inline-flex min-h-11 min-w-11 items-center justify-center text-sm font-medium transition-colors relative text-white/70 hover:text-white"
    : "inline-flex min-h-11 min-w-11 items-center justify-center text-sm font-medium transition-colors hover:text-primary relative";
  const linkActiveClass = isDarkPage
    ? "text-[#FFA459]"
    : "text-primary";

  const loginButtonClass = isDarkPage
    ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
    : "";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${navClasses} ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ transitionProperty: "transform, background-color, box-shadow" }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href={`/${locale}`} className="flex min-h-11 items-center gap-2 group">
            <Image
              src="https://d14sb9d2krfjkl.cloudfront.net/media/Frame+14+(1).svg"
              alt="Bento Logo"
              width={81}
              height={32}
              className="h-8 w-[81px] transition-transform group-hover:scale-105"
              priority
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.id === "inicio" ? isHome : pathname === `/${locale}/${link.id}`;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`${linkBaseClass} ${
                    isActive ? linkActiveClass : ""
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        isDarkPage ? "bg-[#FFA459]" : "bg-primary"
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isInteractive ? (
              <LanguageToggle
                className={
                  isDarkPage
                    ? "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    : ""
                }
              />
            ) : (
              <span
                aria-hidden="true"
                className={`inline-flex h-11 w-24 items-center rounded-md border px-3 text-sm ${
                  isDarkPage ? "border-white/20 bg-white/5 text-white" : "border-input bg-background"
                }`}
              >
                {locale.toUpperCase()}
              </span>
            )}
            <a
              href={`${APP_URL}/login`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.loginClick()}
            >
              <Button
                variant="outline"
                size="sm"
                className={`min-h-11 ${loginButtonClass}`}
              >
                {t("login")}
              </Button>
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            {isInteractive ? (
              <LanguageToggle
                className={
                  isDarkPage
                    ? "bg-white/5 border-white/20 text-white"
                    : ""
                }
              />
            ) : (
              <span
                aria-hidden="true"
                className={`inline-flex h-11 w-24 items-center rounded-md border px-3 text-sm ${
                  isDarkPage ? "border-white/20 bg-white/5 text-white" : "border-input bg-background"
                }`}
              >
                {locale.toUpperCase()}
              </span>
            )}
            {isInteractive ? <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                  className={`size-11 ${isDarkPage ? "text-white hover:bg-white/10" : ""}`}
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={`w-[300px] sm:w-[400px] ${
                  isDarkPage
                    ? "bg-neutral-950 border-neutral-800 text-white"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-6 mt-8 ml-4">
                  {navLinks.map((link) => {
                    const isActive =
                      link.id === "inicio"
                        ? isHome
                        : pathname === `/${locale}/${link.id}`;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        className={`text-lg font-medium transition-colors hover:text-primary text-left ${
                          isActive
                            ? isDarkPage
                              ? "text-[#FFA459]"
                              : "text-primary"
                            : isDarkPage
                              ? "text-white/80"
                              : "text-foreground"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                  <div
                    className={`flex flex-col gap-3 pt-4 border-t ${
                      isDarkPage ? "border-neutral-800" : "border-border"
                    }`}
                  >
                    <a
                      href={`${APP_URL}/login`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.loginClick()}
                    >
                      <Button
                        variant="outline"
                        className={`min-h-11 w-full ${
                          isDarkPage
                            ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
                            : ""
                        }`}
                      >
                        {t("login")}
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet> : (
              <span
                aria-hidden="true"
                className={`inline-flex size-11 items-center justify-center rounded-lg ${
                  isDarkPage ? "text-white" : "text-foreground"
                }`}
              >
                <Menu className="h-5 w-5" />
              </span>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};
