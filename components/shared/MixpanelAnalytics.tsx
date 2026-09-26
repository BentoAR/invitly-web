"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initializeMixpanel, trackMixpanelPageView } from "@/utils/mixpanel";

export default function MixpanelAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    initializeMixpanel();
  }, []);

  useEffect(() => {
    trackMixpanelPageView(pathname);
  }, [pathname]);

  return null;
}
