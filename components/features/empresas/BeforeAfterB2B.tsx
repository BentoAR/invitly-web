import { getTranslations } from "next-intl/server";
import { Check, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll, StaggerItem } from "@/components/features/empresas/RevealOnScroll";
import { DotGrid } from "@/components/features/empresas/BackgroundPatterns";

export default async function BeforeAfterB2B() {
  const t = await getTranslations("BeforeAfterB2B");
  const sinItems = t.raw("sinItems") as string[];
  const conItems = t.raw("conItems") as string[];

  return (
    <section className="relative bg-neutral-950 py-16 md:py-20 overflow-hidden">
      <DotGrid className="opacity-40" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,164,89,0.04) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <RevealOnScroll className="text-center max-w-2xl mx-auto mb-12">
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#FFA459]/10 text-[#FFA459] border border-[#FFA459]/20">
            Antes vs después
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm md:text-base text-neutral-400">
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch max-w-5xl mx-auto">
          <StaggerItem
            index={0}
            className="group p-6 md:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700 transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-800/60">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-neutral-500" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-300">
                  {t("sinTitle")}
                </h3>
                <p className="text-xs text-neutral-500">
                  {t("sinSubtitle")}
                </p>
              </div>
            </div>
            <ul className="space-y-3.5">
              {sinItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-neutral-400"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-800/60 flex items-center justify-center mt-0.5">
                    <X
                      className="w-3 h-3 text-neutral-500"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <div className="flex items-center justify-center md:flex-col">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFA459]/10 border border-[#FFA459]/30 flex items-center justify-center backdrop-blur-sm">
              <ArrowRight className="w-5 h-5 text-[#FFA459] -rotate-90 md:rotate-0 transition-transform" />
            </div>
          </div>

          <StaggerItem
            index={1}
            className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#FFA459]/10 to-neutral-900/60 border border-[#FFA459]/30 transition-all duration-500 overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(255,164,89,0.15), transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#FFA459]/20">
                <div className="w-10 h-10 rounded-xl bg-[#FFA459]/15 border border-[#FFA459]/30 flex items-center justify-center flex-shrink-0">
                  <Check
                    className="w-5 h-5 text-[#FFA459]"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {t("conTitle")}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {t("conSubtitle")}
                  </p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {conItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-neutral-200"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FFA459]/15 flex items-center justify-center mt-0.5">
                      <Check
                        className="w-3 h-3 text-[#FFA459]"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </div>
      </Container>
    </section>
  );
}
