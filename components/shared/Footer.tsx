import { getTranslations } from "next-intl/server";
import { Instagram, Mail, Phone, Sparkles } from "lucide-react";
import { Container } from "./Container";

export default async function Footer() {
  const t = await getTranslations("Footer");
  return (
    <footer className="border-t bg-secondary/30 mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a
              href="#inicio"
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-semibold">
                Bento
              </span>
            </a>
            <p className="text-sm text-muted-foreground max-w-md">
              {t("description")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("navigation")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#inicio"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("home")}
                </a>
              </li>
              <li>
                <a
                  href="#invitaciones"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("invitations")}
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("contactTitle")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+54 9 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hola@Bento.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Instagram className="h-4 w-4" />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @Bento
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t text-center text-sm text-muted-foreground">
          <p>{t("copyright")}</p>
        </div>
      </Container>
    </footer>
  );
}
