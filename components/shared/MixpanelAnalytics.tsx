"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDeferredLoad } from "@/hooks/useDeferredLoad";
import { initializeMixpanel, trackMixpanelPageView } from "@/utils/mixpanel";

export default function MixpanelAnalytics() {
  const shouldLoad = useDeferredLoad();
  const pathname = usePathname();

  useEffect(() => {
    if (!shouldLoad) return;
    initializeMixpanel();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    trackMixpanelPageView(pathname);
  }, [shouldLoad, pathname]);

  return null;
}
