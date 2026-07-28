import { getTranslations } from "next-intl/server";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Handshake,
  Heart,
  PartyPopper,
} from "lucide-react";
import { Container } from "@/components/shared/Container";

const icons = [Building2, Heart, CalendarDays, BriefcaseBusiness, PartyPopper, Handshake];

export default async function LogoWall() {
  const t = await getTranslations("LogoWallB2B");
  const logos = t.raw("logos") as string[];

  return (
    <section className="relative bg-neutral-950 py-14 overflow-hidden">
      <p className="text-center text-xs font-semibold text-neutral-500 mb-10 uppercase tracking-[0.2em] relative z-10">
        {t("title")}
      </p>

      <Container>
        <div className="relative overflow-hidden" style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}>
          <div className="flex w-max gap-px animate-marquee-b2b">
            {[...logos, ...logos, ...logos].map((logo, idx) => {
              const Icon = icons[idx % logos.length] ?? Building2;

              return (
                <div
                  key={idx}
                  className="flex-shrink-0 w-56 h-20 flex items-center justify-center px-6 border-r border-neutral-900/60 last:border-r-0 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <Icon className="h-[22px] w-[22px] text-neutral-400 group-hover:text-[#FFA459] transition-colors" strokeWidth={1.6} />
                  <span className="text-sm font-semibold text-neutral-400 group-hover:text-white whitespace-nowrap tracking-tight transition-colors">
                    {logo}
                  </span>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
