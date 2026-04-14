export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import CtaSplitClient from "./CtaSplitClient";

export default async function CtaSplit() {
  const t = await getTranslations("CtaSplit");
  const left = t.raw("left") as {
    badge: string;
    title: string;
    description: string;
    cta: string;
    footer: string;
  };
  const right = t.raw("right") as {
    badge: string;
    title: string;
    description: string;
    cta: string;
    footer: string;
  };

  return (
    <CtaSplitClient left={left} right={right} contactDialogTitle={t("contactDialogTitle")} />
  );
}
