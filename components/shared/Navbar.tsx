"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Container } from "@/components/shared/Container";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const navLinks = [
    { name: t("inicio"), id: "inicio" },
    { name: t("invitaciones"), id: "invitaciones" },
    { name: t("contacto"), id: "contacto" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 50);
      setIsHidden(latest > window.innerHeight * 0.85);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/20 ${
        hasScrolled ? "shadow-md bg-background/95 backdrop-blur-md" : ""
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2 group">
            <Sparkles className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
            <span className="font- text-xl font-semibold">{t("brand")}</span>
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

          <div className="md:flex items-center gap-3">
            <LanguageToggle />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </motion.nav>
  );
};
