"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

function parseValue(raw: string) {
  const match = raw.match(/^(\D*?)(-?[\d.]+)(.*)$/);
  if (!match) return { prefix: raw, number: 0, suffix: "", decimals: 0 };
  const number = parseFloat(match[2]);
  const decimals = match[2].includes(".")
    ? match[2].split(".")[1].length
    : 0;
  return { prefix: match[1], number, suffix: match[3], decimals };
}

export function CountUp({ value, duration = 1.6, className }: CountUpProps) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || parsed.number === 0) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * parsed.number);
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(parsed.number);
    };
    requestAnimationFrame(tick);
  }, [inView, parsed.number, duration]);

  if (parsed.number === 0) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const formatted =
    parsed.decimals > 0
      ? display.toFixed(parsed.decimals)
      : Math.floor(display).toString();

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  );
}
