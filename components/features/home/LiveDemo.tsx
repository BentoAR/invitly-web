export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import LiveDemoClient from "./LiveDemoClient";
import type { LiveDemoAction, LiveDemoDashboard } from "./LiveDemoClient";

export default async function LiveDemo() {
  const t = await getTranslations("LiveDemo");

  return (
    <LiveDemoClient
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      guestLabel={t("guestLabel")}
      ownerLabel={t("ownerLabel")}
      autoHint={t("autoHint")}
      actions={t.raw("actions") as LiveDemoAction[]}
      dashboard={t.raw("dashboard") as LiveDemoDashboard}
    />
  );
}
