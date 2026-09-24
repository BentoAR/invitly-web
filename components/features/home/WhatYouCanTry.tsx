export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import { Eye, Image as ImageIcon, LayoutGrid, LockKeyhole, UsersRound } from "lucide-react";
import { Container } from "@/components/shared/Container";

type TrialItem = { title: string; description: string };

const icons = [Eye, UsersRound, LayoutGrid, ImageIcon];

/** Lo que el borrador permite hacer, separado de las funciones de un evento publicado. */
export default async function WhatYouCanTry() {
  const t = await getTranslations("WhatYouCanTry");
  const items = t.raw("items") as TrialItem[];

  return (
    <section id="probar-gratis" aria-labelledby="trial-heading" className="bg-white px-4 pb-20 pt-4 md:px-6 md:pb-28">
      <Container className="relative overflow-hidden rounded-[2rem] border border-[var(--bento-border)] bg-[var(--bento-cream)] px-6 py-12 sm:px-10 md:px-14 md:py-16 lg:px-20 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-60 h-[34rem] w-[34rem] rounded-full border-[5rem] border-[var(--bento-peach)] opacity-70"
        />
        <div className="relative grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--bento-orange-deep)]">{t("eyebrow")}</p>
            <h2 id="trial-heading" className="mt-5 max-w-lg font-display text-[clamp(2.35rem,4.5vw,4rem)] leading-[1.06] tracking-[-0.035em] text-[var(--bento-ink)]">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-[1.75] text-[var(--bento-ink)]/75 md:text-lg">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--bento-border)] bg-white/90 px-5 py-4 text-sm leading-relaxed text-[var(--bento-ink)]/80">
              <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[var(--bento-orange-deep)]" strokeWidth={1.7} aria-hidden="true" />
              <p>{t("publishNote")}</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[1.7rem] border border-[var(--bento-orange)] bg-[var(--bento-orange)] sm:-left-4 sm:-top-4" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.7rem] border border-[var(--bento-border)] bg-white shadow-[0_24px_64px_rgba(32,0,65,0.12)]">
              <div className="flex items-center justify-between border-b border-[var(--bento-border)] px-6 py-5 sm:px-8">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--bento-orange-deep)]">Bento</p>
                  <p className="mt-1 font-display text-xl text-[var(--bento-ink)]">{t("workspaceTitle")}</p>
                </div>
                <span className="rounded-full bg-[var(--bento-peach)] px-3 py-1.5 text-xs font-semibold text-[var(--bento-ink)]">{t("draftBadge")}</span>
              </div>

              <ul className="grid gap-0 px-6 py-2 sm:px-8">
                {items.map((item, index) => {
                  const Icon = icons[index] ?? Eye;
                  return (
                    <li key={item.title} className="flex items-start gap-4 border-b border-[var(--bento-border)] py-4 last:border-0">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bento-peach)] text-[var(--bento-orange-deep)]">
                        <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span>
                        <strong className="block text-sm font-semibold text-[var(--bento-ink)] sm:text-base">{item.title}</strong>
                        <span className="mt-0.5 block text-sm leading-relaxed text-[var(--bento-ink)]/65">{item.description}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-[var(--bento-border)] bg-[var(--bento-peach)] px-6 py-4 text-center text-sm font-medium text-[var(--bento-ink)] sm:px-8">
                {t("footer")}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
