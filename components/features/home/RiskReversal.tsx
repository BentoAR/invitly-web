export const dynamic = "force-static";

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  CreditCard,
  Check,
  CircleUserRound,
  LayoutDashboard,
  MessageCircle,
  Music,
  Palette,
  PencilLine,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/shared/Container";
import PreSaleWhatsappButton from "./PreSaleWhatsappButton";

interface RiskItem {
  title: string;
  description: string;
}

interface VisualCopy {
  dashboardTitle: string;
  dashboardSubtitle: string;
  colorsLabel: string;
  coverLabel: string;
  imageAlt: string;
  supportLabel: string;
  supportDetail: string;
}

const INK = "var(--bento-ink)";
const TEMPLATE_PREVIEW_BASE =
  "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/templates-preview";
const INVITATION_IMAGE = `${TEMPLATE_PREVIEW_BASE}/Autumn.webp`;
const DASHBOARD_TEMPLATE_IMAGES = [
  `${TEMPLATE_PREVIEW_BASE}/Aquarella.webp`,
  `${TEMPLATE_PREVIEW_BASE}/woodland.webp`,
  `${TEMPLATE_PREVIEW_BASE}/Noir.webp`,
] as const;
const ITEM_ICONS: LucideIcon[] = [RefreshCw, PencilLine, CreditCard];

/**
 * Bloque de confianza posterior al precio.
 *
 * No promete prueba ni devolución. La tranquilidad se construye con evidencia
 * real: cambiar el diseño sin perder datos, editar el mismo link y pagar una
 * sola vez. La composición muestra esas capacidades en una única escena, en
 * lugar de convertirlas en otra grilla de cards.
 */
export default async function RiskReversal() {
  const t = await getTranslations("RiskReversal");
  const items = t.raw("items") as RiskItem[];
  const visual = t.raw("visual") as VisualCopy;

  return (
    <section
      id="sin-riesgo"
      aria-label={t("title")}
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Container>
        <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: "var(--bento-peach)" }}>
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col px-6 py-10 sm:px-10 md:py-14 lg:px-12 lg:py-14 xl:px-14">
              <h2
                className="max-w-xl font-display font-normal leading-[1.04]"
                style={{
                  fontSize: "clamp(2.3rem, 4.2vw, 3.8rem)",
                  color: INK,
                  letterSpacing: "-0.035em",
                }}
              >
                {t("title")}
              </h2>
              <p
                className="mt-5 max-w-[58ch] text-base leading-relaxed md:text-lg"
                style={{ color: "rgba(32, 0, 65, 0.66)" }}
              >
                {t("subtitle")}
              </p>

              <ul
                className="mt-9 border-y lg:mt-10"
                style={{ borderColor: "rgba(32, 0, 65, 0.13)" }}
              >
                {items.map((item, index) => {
                  const Icon = ITEM_ICONS[index] ?? RefreshCw;

                  return (
                    <li
                      key={item.title}
                      className="grid grid-cols-[2.5rem_1fr] gap-4 border-t py-4 first:border-t-0"
                      style={{ borderColor: "rgba(32, 0, 65, 0.13)" }}
                    >
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={{ backgroundColor: "rgba(255, 164, 89, 0.2)", color: INK }}
                      >
                        <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span>
                        <strong
                          className="block font-medium leading-snug"
                          style={{ color: INK, fontSize: "0.95rem" }}
                        >
                          {item.title}
                        </strong>
                        <span
                          className="mt-1 block text-sm leading-relaxed"
                          style={{ color: "rgba(32, 0, 65, 0.58)" }}
                        >
                          {item.description}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <PreSaleWhatsappButton label={t("cta")} message={t("whatsappMessage")} />
                <div className="mt-3 flex items-center gap-2.5">
                  <MessageCircle
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    style={{ color: INK }}
                  />
                  <p className="text-sm" style={{ color: "rgba(32, 0, 65, 0.62)" }}>
                    <strong className="font-medium" style={{ color: INK }}>
                      {visual.supportLabel}
                    </strong>
                    <span aria-hidden="true"> · </span>
                    {visual.supportDetail.toLocaleLowerCase()}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="relative min-h-[500px] overflow-hidden sm:min-h-[570px] lg:min-h-full"
              style={{ backgroundColor: "#FFA459" }}
              aria-label={visual.imageAlt}
            >
              <div
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full"
                style={{ backgroundColor: "rgba(255, 243, 231, 0.32)" }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-40 -left-28 h-80 w-80 rounded-full"
                style={{ backgroundColor: "rgba(255, 243, 231, 0.22)" }}
                aria-hidden="true"
              />

              <div
                className="absolute left-[7%] top-[10%] w-[76%] -rotate-[2deg] overflow-hidden rounded-2xl bg-white p-3 sm:p-4"
                style={{ boxShadow: "0 26px 58px rgba(71, 29, 0, 0.22)" }}
              >
                <div className="grid min-h-[15rem] grid-cols-[2.8rem_1fr] sm:min-h-[19rem] sm:grid-cols-[3.25rem_1fr]">
                  <aside
                    className="flex flex-col items-center gap-3 border-r pt-1"
                    style={{ borderColor: "rgba(32, 0, 65, 0.1)" }}
                    aria-hidden="true"
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold"
                      style={{ backgroundColor: "#FFA459", color: INK }}
                    >
                      B
                    </span>
                    <LayoutDashboard size={13} style={{ color: "rgba(32, 0, 65, 0.35)" }} />
                    <Palette size={13} style={{ color: INK }} />
                    <CircleUserRound size={13} style={{ color: "rgba(32, 0, 65, 0.35)" }} />
                    <Music size={13} style={{ color: "rgba(32, 0, 65, 0.35)" }} />
                  </aside>

                  <div className="min-w-0 pl-3 sm:pl-4">
                    <p
                      className="font-display font-normal leading-tight"
                      style={{ color: INK, fontSize: "clamp(0.9rem, 1.6vw, 1.25rem)" }}
                    >
                      {visual.dashboardTitle}
                    </p>
                    <p
                      className="mt-1 text-[0.55rem] sm:text-[0.65rem]"
                      style={{ color: "rgba(32, 0, 65, 0.48)" }}
                    >
                      {visual.dashboardSubtitle}
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-4 sm:gap-2">
                      {DASHBOARD_TEMPLATE_IMAGES.map((src, index) => (
                        <div
                          key={src}
                          className="relative overflow-hidden rounded-lg"
                          style={{
                            aspectRatio: "4 / 3",
                            border:
                              index === 0
                                ? "2px solid #FFA459"
                                : "1px solid rgba(32, 0, 65, 0.1)",
                          }}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 18vw, 10vw"
                          />
                          {index === 0 ? (
                            <span
                              className="absolute bottom-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full sm:h-4 sm:w-4"
                              style={{ backgroundColor: "#FFA459", color: INK }}
                            >
                              <Check size={8} strokeWidth={3} aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 sm:mt-4">
                      <span
                        className="text-[0.55rem] font-medium sm:text-[0.65rem]"
                        style={{ color: INK }}
                      >
                        {visual.colorsLabel}
                      </span>
                      <div className="mt-1.5 flex gap-1.5">
                        {["#FFF3E7", "#E8D6BE", "#D68E5A", "#5D3A22", "#D7D7D2"].map((color) => (
                          <span
                            key={color}
                            className="h-3 w-3 rounded-full sm:h-4 sm:w-4"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-4">
                      <span
                        className="text-[0.55rem] font-medium sm:text-[0.65rem]"
                        style={{ color: INK }}
                      >
                        {visual.coverLabel}
                      </span>
                      <div
                        className="relative mt-1.5 overflow-hidden rounded-md"
                        style={{ aspectRatio: "4 / 1", backgroundColor: "#F3E6D8" }}
                      >
                        <Image
                          src={INVITATION_IMAGE}
                          alt=""
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 45vw, 22vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <figure
                className="absolute right-[8%] top-[29%] z-10 w-[49%] rotate-[2.5deg] overflow-hidden rounded-2xl"
                style={{
                  aspectRatio: "1358 / 2150",
                  boxShadow: "0 32px 70px rgba(71, 29, 0, 0.3)",
                }}
              >
                <Image
                  src={INVITATION_IMAGE}
                  alt="Invitación de muestra de Bento"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 40vw, 24vw"
                />
              </figure>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
