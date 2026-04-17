"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Container } from "@/components/shared/Container";

const APP_URL = "https://app.bento.com.ar";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const navLinks = [
    { name: t("inicio"), id: "inicio", href: "/" },
    { name: t("invitaciones"), id: "invitaciones", href: "/#invitaciones" },
    { name: t("empresas"), id: "empresas", href: "/empresas" },
    { name: t("precios"), id: "precios", href: "/#precios" },
    { name: t("contacto"), id: "contacto", href: "/#contacto" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Memoizar el handler para evitar recrearlo en cada render
    const handleScrollChange = (latest: number) => {
      setHasScrolled(latest > 50);
      // Ocultar navbar después de la primera sección (aprox 100vh)
      setIsHidden(latest > window.innerHeight * 0.8);
    };

    const unsubscribe = scrollY.on("change", handleScrollChange);
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/20 ${
        hasScrolled ? "shadow-md bg-background/95 backdrop-blur-md" : ""
      }`}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2 group">
            <Image 
              src="https://d14sb9d2krfjkl.cloudfront.net/media/Frame+14+(1).svg"
              alt="Bento Logo"
              width={120}
              height={32}
              className="transition-transform group-hover:scale-105"
              priority
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname?.includes(`/${link.id}`) || (link.id === "inicio" && pathname === "/");
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary relative ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              );
            })}
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
                  {navLinks.map((link) => {
                    const isActive = pathname?.includes(`/${link.id}`) || (link.id === "inicio" && pathname === "/");
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        className={`text-lg font-medium transition-colors hover:text-primary text-left ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </a>
                    );
                  })}
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
