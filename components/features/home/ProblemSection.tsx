export const dynamic = "force-static";

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Check, Clock3, ImageIcon, MessageCircle, X } from "lucide-react";

import { Container } from "@/components/shared/Container";

interface Pain {
  headline: string;
  description: string;
}

const INK = "var(--bento-ink)";
const TEMPLATE_PREVIEW_BASE =
  "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/templates-preview";

const PHOTO_SOURCES = [
  `${TEMPLATE_PREVIEW_BASE}/Autumn.webp`,
  `${TEMPLATE_PREVIEW_BASE}/Aquarella.webp`,
  `${TEMPLATE_PREVIEW_BASE}/woodland.webp`,
] as const;

function MessageTrail({ message }: { message: string }) {
  return (
    <div
      className="relative flex min-h-44 flex-col justify-center overflow-hidden rounded-2xl px-5 py-5 sm:px-6"
      style={{ backgroundColor: "#FFA459" }}
      aria-hidden="true"
    >
      <span
        className="absolute -right-10 -top-12 h-36 w-36 rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
      />
      <div className="relative w-[88%] space-y-2.5">
        {[0.42, 0.7, 1].map((opacity, index) => (
          <div
            key={opacity}
            className="flex items-center gap-2.5 rounded-2xl rounded-bl-md bg-white px-4 py-3"
            style={{
              opacity,
              marginLeft: `${index * 6}%`,
              boxShadow: index === 2 ? "0 16px 35px rgba(92, 42, 0, 0.16)" : undefined,
            }}
          >
            <MessageCircle size={15} strokeWidth={1.8} style={{ color: INK }} />
            <span className="text-sm font-medium" style={{ color: INK }}>
              {message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeverEndingSheet() {
  return (
    <div
      className="relative min-h-44 overflow-hidden rounded-2xl border bg-white p-4"
      style={{
        borderColor: "rgba(32, 0, 65, 0.1)",
        boxShadow: "0 18px 50px rgba(32, 0, 65, 0.08)",
      }}
      aria-hidden="true"
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF8E7A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFD36D]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#8DD8AA]" />
      </div>
      <div className="grid grid-cols-[1.2fr_0.7fr_0.55fr] text-[0.62rem]">
        {Array.from({ length: 18 }).map((_, index) => {
          const row = Math.floor(index / 3);
          const column = index % 3;
          const status = row % 3;

          return (
            <span
              key={index}
              className="flex h-7 items-center border-b border-r px-2 last:border-r-0"
              style={{ borderColor: "rgba(32, 0, 65, 0.08)" }}
            >
              {column === 0 ? (
                <span
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${54 + ((row * 13) % 34)}%`,
                    backgroundColor: "rgba(32, 0, 65, 0.16)",
                  }}
                />
              ) : column === 1 ? (
                status === 0 ? (
                  <Check size={12} strokeWidth={2.2} className="text-[#45A56D]" />
                ) : status === 1 ? (
                  <Clock3 size={12} strokeWidth={2} className="text-[#E18B35]" />
                ) : (
                  <X size={12} strokeWidth={2.2} className="text-[#D7665C]" />
                )
              ) : (
                <span className="h-1.5 w-full rounded-full bg-[#F3E5D7]" />
              )}
            </span>
          );
        })}
      </div>
      <div
        className="absolute bottom-0 left-0 h-16 w-full"
        style={{ background: "linear-gradient(to bottom, transparent, white)" }}
      />
    </div>
  );
}

function PhotoPile() {
  const positions = [
    "left-[4%] top-[18%] -rotate-[8deg]",
    "left-[34%] top-[5%] rotate-[3deg]",
    "right-[2%] top-[22%] rotate-[9deg]",
  ];

  return (
    <div
      className="relative min-h-48 overflow-hidden rounded-2xl"
      style={{ backgroundColor: "#F2DFCD" }}
      aria-hidden="true"
    >
      {PHOTO_SOURCES.map((src, index) => (
        <div
          key={src}
          className={`absolute ${positions[index]} h-[78%] w-[37%] overflow-hidden rounded-xl border-[5px] border-white`}
          style={{ boxShadow: "0 18px 35px rgba(70, 35, 12, 0.18)" }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 24vw, 12vw"
          />
        </div>
      ))}
      <span
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium"
        style={{ color: INK, boxShadow: "0 10px 24px rgba(32, 0, 65, 0.12)" }}
      >
        <ImageIcon size={14} strokeWidth={1.8} />
        400+
      </span>
    </div>
  );
}

function LostInvitation() {
  return (
    <div
      className="relative min-h-48 overflow-hidden rounded-2xl px-5 py-5 sm:px-6"
      style={{ backgroundColor: "#F2DFCD" }}
      aria-hidden="true"
    >
      <div className="space-y-3 opacity-45">
        {["68%", "84%", "58%"].map((width, index) => (
          <div
            key={width}
            className={`h-9 rounded-2xl ${index === 1 ? "ml-auto" : ""}`}
            style={{ width, backgroundColor: index === 1 ? "#FFA459" : "#FFFFFF" }}
          />
        ))}
      </div>
      <div
        className="absolute bottom-[-36%] left-1/2 h-[88%] w-[42%] -translate-x-1/2 -rotate-[4deg] overflow-hidden rounded-xl border-[5px] border-white"
        style={{ boxShadow: "0 18px 42px rgba(32, 0, 65, 0.2)" }}
      >
        <Image
          src={`${TEMPLATE_PREVIEW_BASE}/Autumn.webp`}
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 28vw, 14vw"
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-20"
        style={{ background: "linear-gradient(to bottom, transparent, #F2DFCD)" }}
      />
    </div>
  );
}

function PainVisual({ index, message }: { index: number; message: string }) {
  if (index === 0) return <MessageTrail message={message} />;
  if (index === 1) return <NeverEndingSheet />;
  if (index === 2) return <PhotoPile />;
  return <LostInvitation />;
}

export default async function ProblemSection() {
  const t = await getTranslations("Problem");
  const pains = t.raw("pains") as Pain[];
  const repeatedMessage = pains[0]?.headline ?? "";

  return (
    <section
      id="el-problema"
      aria-label={t("title")}
      className="relative py-16 md:py-20"
      style={{ backgroundColor: "var(--bento-cream)" }}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2
              className="font-display font-normal leading-[1.04]"
              style={{
                fontSize: "clamp(2.45rem, 4.7vw, 4.15rem)",
                color: INK,
                letterSpacing: "-0.035em",
              }}
            >
              {t("title")}
            </h2>
            <p
              className="mt-5 max-w-md text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(32, 0, 65, 0.58)" }}
            >
              {t("subtitle")}
            </p>
            <div className="mt-8 hidden items-center gap-3 lg:flex" aria-hidden="true">
              <span className="h-px w-12" style={{ backgroundColor: "#FFA459" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#FFA459" }} />
            </div>
          </div>

          <div className="space-y-8 md:space-y-10">
            {pains.map((pain, index) => {
              const reverse = index % 2 === 1;

              return (
                <article
                  key={pain.headline}
                  className={`grid items-center gap-5 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-7 ${
                    index === 1 ? "md:ml-10" : index === 2 ? "md:mr-8" : ""
                  }`}
                >
                  <div className={reverse ? "md:order-2" : undefined}>
                    <PainVisual index={index} message={repeatedMessage} />
                  </div>
                  <div className={reverse ? "md:order-1" : undefined}>
                    <h3
                      className="font-display font-normal leading-[1.12]"
                      style={{
                        fontSize: "clamp(1.55rem, 2.8vw, 2.25rem)",
                        color: INK,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {pain.headline}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed md:text-base"
                      style={{ color: "rgba(32, 0, 65, 0.6)" }}
                    >
                      {pain.description}
                    </p>
                  </div>
                </article>
              );
            })}

            <div
              className="relative overflow-hidden rounded-2xl px-6 py-7 sm:px-8 sm:py-8"
              style={{ backgroundColor: "#FFA459" }}
            >
              <span
                className="absolute -right-12 -top-16 h-48 w-48 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                aria-hidden="true"
              />
              <p
                className="relative max-w-xl font-display font-normal leading-[1.08]"
                style={{
                  fontSize: "clamp(1.85rem, 3.5vw, 2.8rem)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                }}
              >
                {t("bridge")}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
