import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Container } from "./Container";

export default async function Footer() {
  const t = await getTranslations("Footer");
  return (
    <footer className="border-t bg-secondary/30 mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a
              href="#inicio"
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
            <p className="text-sm text-muted-foreground max-w-md">
              {t("description")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("navigation")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("home")}
                </a>
              </li>
              <li>
                <a href="#invitaciones" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("invitations")}
                </a>
              </li>
              <li>
                <a href="#precios" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("pricing")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>{t("copyright")}</p>
          <p>{t("madeIn")}</p>
        </div>
      </Container>
    </footer>
  );
}
