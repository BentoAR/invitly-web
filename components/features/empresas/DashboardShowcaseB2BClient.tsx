"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  LayoutGrid,
  TrendingUp,
  Sparkles,
  Tag,
  Headphones,
  FileText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { StaggerItem } from "@/components/features/empresas/RevealOnScroll";
import { mockupEvents } from "@/components/features/empresas/data";

const ICON_MAP = {
  multiEvent: LayoutGrid,
  analytics: TrendingUp,
  templates: Sparkles,
  tracking: Tag,
  support: Headphones,
  reports: FileText,
} as const;

type FeatureKey = keyof typeof ICON_MAP;

const animatedBars = new WeakSet<Element>();
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function BarReveal({
  height,
  delay,
  duration = 0.6,
  className,
}: {
  height: string;
  delay: number;
  duration?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemount, setIsRemount] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (animatedBars.has(el)) {
      setIsRemount(true);
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animatedBars.add(el);
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        height,
        transformOrigin: "bottom",
        transform: isVisible ? "scaleY(1)" : "scaleY(0)",
        transition: isRemount
          ? "none"
          : `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    />
  );
}

export default function DashboardShowcaseB2BClient() {
  const t = useTranslations("DashboardShowcaseB2B");
  const features = t.raw("features") as Record<
    FeatureKey,
    { title: string; description: string }
  >;

  const featureList: Array<{
    key: FeatureKey;
    icon: typeof LayoutGrid;
    title: string;
    description: string;
  }> = (Object.keys(ICON_MAP) as FeatureKey[]).map((key) => ({
    key,
    icon: ICON_MAP[key],
    title: features[key].title,
    description: features[key].description,
  }));

  const events = mockupEvents.map((evt) => ({
    name: evt.name,
    date: evt.date,
    count: evt.count,
    color: evt.color,
    delay: 0.3,
  }));

  return (
    <div className="grid lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-7">
        <div className="relative group">
          <div
            className="absolute -inset-8 opacity-50 blur-3xl -z-10"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,164,89,0.25), transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/80 shadow-2xl shadow-black/40 group-hover:border-[#FFA459]/30 transition-colors duration-500">
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,164,89,0.12) 0%, transparent 50%, rgba(124,58,237,0.08) 100%)",
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
                app.bento.com.ar/analytics
              </div>
              <div className="w-12" />
            </div>

            <div className="p-5 space-y-4 relative">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-neutral-800/40 border border-neutral-800 p-3 hover:border-[#FFA459]/30 transition-colors">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                    Slots usados
                  </p>
                  <p className="text-2xl font-bold text-white">12/15</p>
                  <div className="mt-2 h-1 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FFA459] to-[#FF8A3D]"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
                <div className="rounded-lg bg-neutral-800/40 border border-neutral-800 p-3 hover:border-[#FFA459]/30 transition-colors">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                    Confirmaciones
                  </p>
                  <p className="text-2xl font-bold text-white">94%</p>
                  <div className="mt-2 flex items-end gap-0.5 h-4">
                    {[40, 55, 65, 95, 100].map((h, i) => (
                      <BarReveal
                        key={i}
                        height={`${h}%`}
                        delay={0.5 + i * 0.08}
                        className={`flex-1 rounded-t ${
                          i >= 3 ? "bg-[#FFA459]" : "bg-neutral-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-neutral-800/40 border border-neutral-800 p-3 hover:border-[#FFA459]/30 transition-colors">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                    Templates top
                  </p>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-[10px] text-neutral-400 mt-2">
                    Flowers · Autumn · Phantom
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">
                  Eventos publicados este mes
                </p>
                <div className="space-y-1.5">
                  {events.map((evt, i) => (
                    <StaggerItem
                      key={evt.name}
                      index={i}
                      staggerDelay={0.1}
                      y={10}
                      duration={0.4}
                      amount={0.05}
                      className="flex items-center justify-between p-2.5 rounded-md bg-neutral-800/40 border border-neutral-800 hover:border-neutral-700 transition-colors"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFA459] flex-shrink-0" />
                        <p className="text-xs text-white font-medium truncate">
                          {evt.name}
                        </p>
                      </div>
                      <p
                        className={`text-xs font-mono ${
                          evt.color === "amber"
                            ? "text-[#FFA459]"
                            : "text-neutral-300"
                        }`}
                      >
                        {evt.count}
                      </p>
                    </StaggerItem>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">
                  Crecimiento mensual
                </p>
                <div className="flex items-end gap-1.5 h-16 pt-2">
                  {[35, 50, 45, 60, 75, 80, 95].map((h, i) => (
                    <BarReveal
                      key={i}
                      height={`${h}%`}
                      delay={0.5 + i * 0.06}
                      duration={0.7}
                      className="flex-1 rounded-t bg-gradient-to-t from-[#FFA459]/30 to-[#FFA459]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="grid grid-cols-3 gap-x-3 gap-y-7">
          {featureList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <StaggerItem
                key={feature.key}
                index={idx}
                staggerDelay={0.08}
                className="group text-center"
              >
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 rounded-full bg-[#FFA459]/0 group-hover:bg-[#FFA459]/10 blur-md transition-all duration-500" />
                  <div className="relative w-16 h-16 rounded-full bg-[#FFA459]/10 border border-[#FFA459]/25 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 group-hover:border-[#FFA459]/50 group-hover:bg-[#FFA459]/15 transition-all duration-300">
                    <Icon
                      className="w-7 h-7 text-[#FFA459]"
                      strokeWidth={2}
                    />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white mb-1 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </StaggerItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}
