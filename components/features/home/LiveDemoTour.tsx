"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export interface TourBeat {
  id: string;
  target: string;
  title: string;
  body: string;
  tone?: "default" | "highlight";
}

interface Props {
  containerRef: RefObject<HTMLDivElement | null>;
  beat: TourBeat | null;
  stepMs?: number;
  timed?: boolean;
  step?: number;
  total?: number;
  onFootprintChange?: (height: number) => void;
}

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
  radius: number;
}

interface Size {
  w: number;
  h: number;
}

const FOCUS_PAD = 6;
const EDGE_PAD = 9;
const BELOW_GAP = 16;
const SETTLE_MS = 900;
const CARD_MAX_W = 240;
const CARD_MIN_W = 160;

const ACCENT = "#FFA459";
const INK = "#200041";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function sameBox(a: Box | null, b: Box | null) {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    Math.abs(a.top - b.top) < 0.5 &&
    Math.abs(a.left - b.left) < 0.5 &&
    Math.abs(a.width - b.width) < 0.5 &&
    Math.abs(a.height - b.height) < 0.5 &&
    a.radius === b.radius
  );
}

function cardX(box: Box, container: Size, cardWidth: number) {
  const centerX = box.left + box.width / 2;
  const maxX = Math.max(EDGE_PAD, container.w - EDGE_PAD - cardWidth);
  return clamp(centerX - cardWidth / 2, EDGE_PAD, maxX);
}

function connectorPath(
  box: Box,
  cardPos: { x: number; y: number },
  cardWidth: number,
  container: Size
) {
  const fromX = box.left + box.width / 2;
  const fromY = box.top + box.height;
  const toX = cardPos.x + cardWidth / 2;
  const toY = cardPos.y;

  const dx = toX - fromX;
  const bow = clamp(Math.abs(dx) * 0.3, 10, 34);
  const controlY = container.h + BELOW_GAP * 0.55;

  return {
    d: `M ${fromX} ${fromY} Q ${fromX + dx * 0.5} ${controlY + bow * 0.2} ${toX} ${toY}`,
    fromX,
    fromY,
  };
}

export default function LiveDemoTour({
  containerRef,
  beat,
  stepMs = 1100,
  timed = false,
  step = 0,
  total = 0,
  onFootprintChange,
}: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<Box | null>(null);

  const [animated, setAnimated] = useState(false);
  const [box, setBox] = useState<Box | null>(null);
  const [container, setContainer] = useState<Size>({ w: 0, h: 0 });
  const [card, setCard] = useState<Size>({ w: CARD_MAX_W, h: 76 });

  const target = beat?.target ?? null;

  const measure = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;

    const containerRect = node.getBoundingClientRect();
    setContainer((prev) =>
      Math.abs(prev.w - containerRect.width) < 0.5 &&
      Math.abs(prev.h - containerRect.height) < 0.5
        ? prev
        : { w: containerRect.width, h: containerRect.height }
    );

    if (!target) return;

    const el = node.querySelector<HTMLElement>(`[data-tour="${target}"]`);
    if (!el) {
      boxRef.current = null;
      setBox(null);
      return;
    }

    const rect = el.getBoundingClientRect();
    const radius =
      parseFloat(window.getComputedStyle(el).borderTopLeftRadius) || 8;

    const next: Box = {
      top: rect.top - containerRect.top - FOCUS_PAD,
      left: rect.left - containerRect.left - FOCUS_PAD,
      width: rect.width + FOCUS_PAD * 2,
      height: rect.height + FOCUS_PAD * 2,
      radius: Math.round(radius + FOCUS_PAD),
    };

    if (sameBox(boxRef.current, next)) return;
    boxRef.current = next;
    setBox(next);
  }, [containerRef, target]);

  useIsoLayoutEffect(() => {
    if (!target) return;

    let frame = 0;
    let elapsed = 0;
    let last = 0;

    const tick = (now: number) => {
      if (last) elapsed += now - last;
      last = now;
      measure();
      if (elapsed < SETTLE_MS) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [beat?.id, target, measure]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(node);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef, measure]);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new ResizeObserver(() => {
      const rect = node.getBoundingClientRect();
      setCard((prev) =>
        Math.abs(prev.w - rect.width) < 0.5 && Math.abs(prev.h - rect.height) < 0.5
          ? prev
          : { w: rect.width, h: rect.height }
      );
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!box || animated) return;
    const frame = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, [box, animated]);

  useEffect(() => {
    onFootprintChange?.(box ? BELOW_GAP + card.h : 0);
  }, [box, card.h, onFootprintChange]);

  const visible = Boolean(beat && box && container.w > 0);
  const highlight = beat?.tone === "highlight";

  const cardWidth = clamp(container.w - EDGE_PAD * 2, CARD_MIN_W, CARD_MAX_W);

  const cardPos = box
    ? { x: cardX(box, container, cardWidth), y: container.h + BELOW_GAP }
    : null;
  const connector =
    box && cardPos ? connectorPath(box, cardPos, cardWidth, container) : null;

  const frameMotion = animated
    ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), width 900ms cubic-bezier(0.22, 1, 0.36, 1), height 900ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 500ms ease"
    : "none";
  const cardMotion = animated
    ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)"
    : "none";

  return (
    <div
      aria-hidden="true"
      className="ldt-root"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        overflow: "visible",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 500ms ease",
      }}
    >
      <style>{`
        @keyframes ldt-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 164, 89, 0.4); }
          50%      { box-shadow: 0 0 0 7px rgba(255, 164, 89, 0); }
        }
        @keyframes ldt-draw {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ldt-anchor {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50%      { transform: scale(1.5); opacity: 0.4; }
        }
        @keyframes ldt-copy-in {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ldt-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ldt-root .ldt-frame,
          .ldt-root .ldt-card { transition: none !important; }
          .ldt-root .ldt-ring,
          .ldt-root .ldt-anchor,
          .ldt-root .ldt-path,
          .ldt-root .ldt-copy,
          .ldt-root .ldt-progress { animation: none !important; }
          .ldt-root .ldt-path { stroke-dashoffset: 0 !important; }
          .ldt-root .ldt-progress { transform: scaleX(1); }
        }
      `}</style>

      {box ? (
        <div
          className="ldt-frame"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: box.width,
            height: box.height,
            borderRadius: box.radius,
            boxSizing: "border-box",
            border: `1.5px solid ${highlight ? "rgba(255, 150, 60, 0.95)" : "rgba(255, 164, 89, 0.8)"}`,
            boxShadow: highlight
              ? "0 0 0 3px rgba(255, 150, 60, 0.14), 0 0 22px 2px rgba(255, 150, 60, 0.22)"
              : "0 0 0 3px rgba(255, 164, 89, 0.10), 0 0 18px 2px rgba(255, 164, 89, 0.16)",
            transform: `translate3d(${box.left}px, ${box.top}px, 0)`,
            transition: frameMotion,
            willChange: "transform, width, height",
          }}
        >
          <span
            className="ldt-ring"
            style={{
              position: "absolute",
              inset: -1.5,
              borderRadius: "inherit",
              animation: "ldt-ring 2.6s ease-in-out infinite",
            }}
          />
        </div>
      ) : null}

      {connector && container.w > 0 ? (
        <svg
          width={container.w}
          height={container.h + BELOW_GAP + card.h}
          viewBox={`0 0 ${container.w} ${container.h + BELOW_GAP + card.h}`}
          style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
        >
          <path
            key={beat?.id}
            className="ldt-path"
            d={connector.d}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeOpacity={0.55}
            pathLength={1}
            strokeDasharray={1}
            style={{ animation: "ldt-draw 700ms cubic-bezier(0.22, 1, 0.36, 1) both" }}
          />
          <circle
            className="ldt-anchor"
            cx={connector.fromX}
            cy={connector.fromY}
            r={3.2}
            fill={ACCENT}
            style={{
              transformOrigin: `${connector.fromX}px ${connector.fromY}px`,
              animation: "ldt-anchor 2.3s ease-in-out infinite",
            }}
          />
        </svg>
      ) : null}

      <div
        ref={cardRef}
        className="ldt-card"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: cardWidth,
          transform: `translate3d(${cardPos?.x ?? 0}px, ${cardPos?.y ?? 0}px, 0)`,
          transition: cardMotion,
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 14,
            padding: "9px 12px 12px",
            background: highlight
              ? "linear-gradient(135deg, #FFBA80 0%, #FF9B45 100%)"
              : "linear-gradient(180deg, #FFFFFF 0%, #FFFBF6 100%)",
            border: `1px solid ${highlight ? "rgba(255, 150, 60, 0.6)" : "rgba(32, 0, 65, 0.08)"}`,
            boxShadow: highlight
              ? "0 18px 38px -16px rgba(255, 140, 66, 0.65), 0 2px 6px rgba(32, 0, 65, 0.06)"
              : "0 18px 38px -16px rgba(32, 0, 65, 0.34), 0 2px 6px rgba(32, 0, 65, 0.05)",
            transition: "background 500ms ease, border-color 500ms ease, box-shadow 500ms ease",
          }}
        >
          <div
            key={beat?.id}
            className="ldt-copy"
            style={{ animation: "ldt-copy-in 460ms cubic-bezier(0.22, 1, 0.36, 1) both" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  flexShrink: 0,
                  backgroundColor: highlight ? "#FFFFFF" : ACCENT,
                }}
              />
              <p
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontSize: 11.5,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.005em",
                  color: highlight ? "#FFFFFF" : INK,
                }}
              >
                {beat?.title}
              </p>
              {timed && total > 0 ? (
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 8.5,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    fontVariantNumeric: "tabular-nums",
                    color: highlight ? "rgba(255, 255, 255, 0.8)" : "rgba(32, 0, 65, 0.35)",
                  }}
                >
                  {step}/{total}
                </span>
              ) : null}
            </div>
            <p
              style={{
                fontSize: 10.5,
                lineHeight: 1.4,
                color: highlight ? "rgba(255, 255, 255, 0.92)" : "rgba(32, 0, 65, 0.6)",
              }}
            >
              {beat?.body}
            </p>
          </div>

          {timed ? (
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 2,
                backgroundColor: highlight
                  ? "rgba(255, 255, 255, 0.25)"
                  : "rgba(255, 164, 89, 0.18)",
              }}
            >
              <span
                key={beat?.id}
                className="ldt-progress"
                style={{
                  display: "block",
                  height: "100%",
                  transformOrigin: "left center",
                  backgroundColor: highlight ? "#FFFFFF" : ACCENT,
                  animation: `ldt-progress ${stepMs}ms linear both`,
                }}
              />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
