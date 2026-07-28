"use client";

import { useEffect, useRef, useState } from "react";
import DotField from "@/components/shared/DotField";

const BENTO_GRADIENT_FROM = "rgba(255, 164, 89, 0.45)";
const BENTO_GRADIENT_TO = "rgba(124, 58, 237, 0.25)";
const BENTO_GLOW = "#1a1410";

export function DotFieldB2B() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <DotField
        dotRadius={1.2}
        dotSpacing={16}
        cursorRadius={280}
        cursorForce={0.08}
        bulgeOnly={true}
        bulgeStrength={38}
        glowRadius={100}
        sparkle={false}
        waveAmplitude={0}
        gradientFrom={BENTO_GRADIENT_FROM}
        gradientTo={BENTO_GRADIENT_TO}
        glowColor={BENTO_GLOW}
        paused={!isVisible}
      />
    </div>
  );
}

export default DotFieldB2B;
