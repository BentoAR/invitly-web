"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { HeroB2BCta } from "@/components/features/empresas/HeroB2BCta";
import {
  DotGrid,
  FloatingOrbs,
  MeshGradient,
} from "@/components/features/empresas/BackgroundPatterns";
import { mockupEvents, chartHeights } from "@/components/features/empresas/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroB2B() {
  const t = useTranslations("HeroB2B");
  const mockup = t.raw("mockup") as {
    salon: string;
    events: string;
    thisMonth: string;
    satisfaction: string;
    listTitle: string;
    statusActive: string;
    statusWarning: string;
    statusFull: string;
  };

  const valueProps = [
    t("value1Title"),
    t("value2Title"),
    t("value3Title"),
  ];

  const events = mockupEvents.map((evt) => ({
    name: evt.name,
    date: evt.date,
    count: evt.count,
    status: evt.color === "amber" ? mockup.statusWarning : mockup.statusActive,
    color: evt.color,
  }));

  return (
    <section id="inicio" className="relative overflow-hidden bg-neutral-950 pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32">
      <FloatingOrbs />
      <MeshGradient className="opacity-80" />
      <DotGrid className="opacity-60" />

      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 25%, rgba(255,164,89,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 75%, rgba(180,90,30,0.12), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grain opacity-30" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 md:mb-6 text-xs font-semibold tracking-wider uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFA459] animate-pulse" />
              {t("badge")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="font-display font-normal text-white mb-5 md:mb-6 leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="text-base md:text-xl text-neutral-300 mb-6 md:mb-8 leading-relaxed max-w-xl"
            >
              {t("subtitle")}
            </motion.p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-2.5 mb-7 md:mb-8">
              {valueProps.map((vp, idx) => (
                <motion.div
                  key={vp}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.08, ease: EASE }}
                  className="flex items-center gap-2 text-sm md:text-base text-neutral-200"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-[#FFA459] flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <span>{vp}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="flex flex-col sm:flex-row gap-3 mb-5 md:mb-6"
            >
              <HeroB2BCta label={t("ctaPrimary")} />
              <a
                href="#precios"
                className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-semibold text-base border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                {t("ctaSecondary")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
              className="text-xs md:text-sm text-neutral-500"
            >
              {t("trustLine")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="relative lg:pl-4 max-w-lg mx-auto lg:max-w-none w-full"
          >
            <div
              className="absolute -inset-8 opacity-50 blur-3xl -z-10"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,164,89,0.25), transparent 60%)",
              }}
              aria-hidden="true"
            />

            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/80 shadow-2xl shadow-black/40 backdrop-blur-sm">
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,164,89,0.15) 0%, transparent 40%, transparent 60%, rgba(124,58,237,0.1) 100%)",
                }}
                aria-hidden="true"
              />

              <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800 relative">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <div className="w-2 h-2 rounded-full bg-green-500/70" />
                </div>
                <div className="px-3 py-1 rounded-md bg-neutral-800 text-[10px] text-neutral-400 font-mono">
                  app.bento.com.ar/salones
                </div>
                <div className="w-12" />
              </div>

              <div className="flex relative">
                <aside className="hidden md:flex w-14 flex-col items-center gap-4 py-5 bg-neutral-950 border-r border-neutral-800">
                  <div className="w-8 h-8 rounded-lg bg-[#FFA459] flex items-center justify-center text-white font-bold text-sm">
                    B
                  </div>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-lg bg-neutral-800/60 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                    />
                  ))}
                </aside>

                <div className="flex-1 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                        {mockup.salon}
                      </p>
                      <p className="text-white font-semibold text-sm">Resumen</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-md bg-[#FFA459] text-white text-xs font-semibold hover:bg-[#FF8A3D] transition-colors cursor-pointer">
                      + Nuevo evento
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-neutral-800/60 border border-neutral-800 p-3 hover:border-[#FFA459]/30 transition-colors">
                      <p className="text-2xl font-bold text-white">12</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        {mockup.events}
                      </p>
                    </div>
                    <div className="rounded-lg bg-neutral-800/60 border border-neutral-800 p-3 hover:border-[#FFA459]/30 transition-colors">
                      <p className="text-2xl font-bold text-white">47</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        {mockup.thisMonth}
                      </p>
                    </div>
                    <div className="rounded-lg bg-neutral-800/60 border border-neutral-800 p-3 hover:border-[#FFA459]/30 transition-colors">
                      <p className="text-2xl font-bold text-[#FFA459]">98%</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        {mockup.satisfaction}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400 mb-2 font-medium">
                      {mockup.listTitle}
                    </p>
                    <div className="space-y-1.5">
                      {events.map((evt, i) => (
                        <motion.div
                          key={evt.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.7 + i * 0.12,
                            ease: EASE,
                          }}
                          className="flex items-center justify-between p-2.5 rounded-md bg-neutral-800/40 border border-neutral-800 hover:border-neutral-700 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-white font-medium truncate">
                              {evt.name}
                            </p>
                            <p className="text-[10px] text-neutral-500">
                              {evt.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p
                              className={`text-xs font-mono ${
                                evt.color === "amber"
                                  ? "text-[#FFA459]"
                                  : "text-neutral-300"
                              }`}
                            >
                              {evt.count}
                            </p>
                            <span
                              className={`px-1.5 py-0.5 text-[9px] font-semibold rounded ${
                                evt.color === "amber"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              }`}
                            >
                              {evt.status}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-neutral-900 border border-neutral-800 p-3 shadow-xl -rotate-3 hidden md:block"
              style={{
                animation: "float-medium 3.2s ease-in-out infinite 0.5s",
              }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-6 h-6 rounded bg-[#FFA459]/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#FFA459]" />
                </div>
                <p className="text-[10px] text-neutral-400 font-medium">
                  Confirmaciones
                </p>
              </div>
              <div className="flex items-end gap-1 h-12">
                {chartHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.0 + i * 0.08,
                      ease: EASE,
                    }}
                    style={{ height: `${h}%`, transformOrigin: "bottom" }}
                    className={`flex-1 rounded-t ${
                      h >= 70 ? "bg-[#FFA459]" : "bg-neutral-800"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
