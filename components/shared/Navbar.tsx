"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Container } from "@/components/shared/Container";

const APP_URL = "https://app.bento.com.ar";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const navLinks = [
    { name: t("inicio"), id: "inicio" },
    { name: t("invitaciones"), id: "invitaciones" },
    { name: t("precios"), id: "precios" },
    { name: t("contacto"), id: "contacto" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/20 ${
        hasScrolled ? "shadow-md bg-background/95 backdrop-blur-md" : ""
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2 group">
            <Sparkles className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
            <span className="text-xl font-semibold">{t("brand")}</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm font-medium transition-colors hover:text-primary relative text-foreground"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <a href={`${APP_URL}/login`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                {t("login")}
              </Button>
            </a>
            <a href={`${APP_URL}/register`} target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                {t("cta")}
              </Button>
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8 ml-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      className="text-lg font-medium transition-colors hover:text-primary text-left text-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  <div className="flex flex-col gap-3 pt-4 border-t border-border">
                    <a href={`${APP_URL}/login`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">
                        {t("login")}
                      </Button>
                    </a>
                    <a href={`${APP_URL}/register`} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">
                        {t("cta")}
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </motion.nav>
  );
};
