export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import HowItWorksClient from "./HowItWorksClient";

export default async function HowItWorksSection() {
  const t = await getTranslations("HowItWorks");
  const steps = t.raw("steps") as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  const templateImages = [
    "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/templates-preview/countdown-resplandor.webp",
    "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/templates-preview/galery-campestre.webp",
    "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/templates-preview/gifts-campestre.webp",
    "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/templates-preview/gifts-sakura.webp",
    "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/templates-preview/hero-campestre.webp",
    "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/templates-preview/hero-flowers.webp",
  ];

  return (
    <HowItWorksClient
      steps={steps}
      sectionTitle={t("title")}
      subtitle={t("badge")}
      templateImages={templateImages}
    />
  );
}
