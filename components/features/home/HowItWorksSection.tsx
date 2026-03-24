export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import HowItWorksClient from "./HowItWorksClient";
import phoneTopImage from "@/assets/imgi_28_1771333296-compressor-png-image.png";
import phoneBottomImage from "@/assets/imgi_30_1770851752-bottom-png-image.png";

const FRONT_PHONE = "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/ChatGPT+Image+23+mar+2026%2C+05_45_34+p.m.-Photoroom.png";
const LEFT_PHONE = "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media/ChatGPT+Image+23+mar+2026%2C+05_50_16+p.m.-Photoroom.png";

export default async function HowItWorksSection() {
  const t = await getTranslations("HowItWorks");
  const steps = t.raw("steps") as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  const phoneImages = [
    [FRONT_PHONE, LEFT_PHONE],
    [phoneBottomImage],
    [phoneTopImage],
  ];

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
      phoneImages={phoneImages}
      templateImages={templateImages}
    />
  );
}
