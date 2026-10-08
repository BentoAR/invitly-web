"use client";

import { useEffect, useRef } from "react";

type HeroLoopVideoProps = {
  webmSrc: string;
  movSrc: string;
  poster: string;
  ariaLabel: string;
};

const RETRY_EVENTS = ["touchstart", "pointerdown", "scroll", "keydown"] as const;

export default function HeroLoopVideo({ webmSrc, movSrc, poster, ariaLabel }: HeroLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const detach = () => {
      RETRY_EVENTS.forEach((event) => window.removeEventListener(event, retry));
    };

    const retry = () => {
      video
        .play()
        .then(detach)
        .catch(() => {});
    };

    video
      .play()
      .catch(() => {
        RETRY_EVENTS.forEach((event) =>
          window.addEventListener(event, retry, { passive: true })
        );
      });

    return detach;
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      width={1080}
      height={1080}
      className="w-full h-auto"
      aria-label={ariaLabel}
    >
      <source src={movSrc} type="video/quicktime" />
      <source src={webmSrc} type="video/webm" />
    </video>
  );
}
