"use client";

import dynamic from "next/dynamic";

const HeroPhonesClient = dynamic(
  () => import("@/components/features/home/HeroPhonesClient"),
  { ssr: false }
);

type Props = {
  frontImage: string;
  lateralImage: string;
  imageAlt: string;
};

export default function HeroPhonesWrapper(props: Props) {
  return <HeroPhonesClient {...props} />;
}
