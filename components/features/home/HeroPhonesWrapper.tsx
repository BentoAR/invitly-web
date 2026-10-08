"use client";

import dynamic from "next/dynamic";

const HeroPhonesClient = dynamic(
  () => import("@/components/features/home/HeroPhonesClient"),
  { ssr: false }
);

type Props = {
  webmSrc: string;
  movSrc: string;
  poster: string;
  ariaLabel: string;
};

export default function HeroPhonesWrapper(props: Props) {
  return <HeroPhonesClient {...props} />;
}
