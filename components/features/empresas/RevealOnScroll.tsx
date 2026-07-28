"use client";

import { useRef, useState, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";

// Module-level WeakSet: persiste entre re-mounts de React Strict Mode.
// El DOM node se preserva entre unmount/remount, así que podemos detectar
// si un elemento ya animó y saltarnos la animación en el segundo mount
// sin flash visible (gracias a useLayoutEffect que corre antes del paint).
const animatedElements = new WeakSet<Element>();

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.6,
  amount = 0.2,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemount, setIsRemount] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (animatedElements.has(el)) {
      setIsRemount(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animatedElements.add(el);
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: amount }
    );

    observer.observe(el);
  }, [amount]);

  const transition = isRemount
    ? "none"
    : `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
        transition,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  staggerDelay?: number;
  y?: number;
  duration?: number;
  amount?: number;
}

export function StaggerItem({
  children,
  className,
  index = 0,
  staggerDelay = 0.08,
  y = 20,
  duration = 0.5,
  amount = 0.15,
}: StaggerItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemount, setIsRemount] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (animatedElements.has(el)) {
      setIsRemount(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animatedElements.add(el);
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: amount }
    );

    observer.observe(el);
  }, [amount]);

  const delay = isRemount ? 0 : index * staggerDelay;
  const transition = isRemount
    ? "none"
    : `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
        transition,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
