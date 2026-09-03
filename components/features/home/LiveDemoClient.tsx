"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import LiveDemoTour, { type TourBeat } from "./LiveDemoTour";
import { analytics } from "@/utils/analytics";
import {
  Check,
  Music,
  Users,
  ListMusic,
  Clock,
  LayoutDashboard,
  LayoutGrid,
  Palette,
  FileSpreadsheet,
} from "lucide-react";

export type ActionId = "rsvp" | "song";

export interface LiveDemoAction {
  id: ActionId;
  label: string;
  helper: string;
}

export interface LiveDemoDashboard {
  eventName: string;
  eventDate: string;
  statusLabel: string;
  confirmedLabel: string;
  pendingLabel: string;
  tablesLabel: string;
  songsLabel: string;
  activityTitle: string;
  emptyActivity: string;
  guestName: string;
  events: Record<ActionId, string>;
}

interface Props {
  eyebrow: string;
  title: string;
  subtitle: string;
  guestLabel: string;
  ownerLabel: string;
  autoHint: string;
  actions: LiveDemoAction[];
  dashboard: LiveDemoDashboard;
}

interface ActivityEntry {
  key: number;
  actionId: ActionId;
  time: string;
}

type BeatCopy = Omit<TourBeat, "id">;

const INITIAL = { confirmed: 47, pending: 13, songs: 24 };
const MAX_ACTIVITY = 5;

const ACTION_ICONS: Record<ActionId, typeof Check> = {
  rsvp: Check,
  song: Music,
};

const INK = "var(--bento-ink)";
const ACCENT = "#FFA459";

type ViewId = "summary" | "tables" | "templates" | "invitados" | "playlist";

interface TableData {
  number: number;
  guests: number;
  assignedInitials: string[];
}

interface GuestData {
  name: string;
  initial: string;
  confirmed: boolean;
}

interface UnassignedGuest {
  name: string;
  initial: string;
}

const INITIAL_TABLES: TableData[] = [
  { number: 1, guests: 6, assignedInitials: [] },
  { number: 2, guests: 8, assignedInitials: [] },
];

const INITIAL_UNASSIGNED: UnassignedGuest[] = [
  { name: "Florencia Sandez", initial: "F" },
  { name: "Martín Álvarez", initial: "M" },
  { name: "Gabriel Torres", initial: "G" },
];

const INITIAL_GUESTS: GuestData[] = [
  { name: "Florencia Sandez", initial: "F", confirmed: true },
  { name: "Martín Álvarez", initial: "M", confirmed: true },
  { name: "Carolina Herrera", initial: "C", confirmed: false },
  { name: "Gabriel Torres", initial: "G", confirmed: true },
];

const TEMPLATE_PREVIEW_BASE =
  "https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/templates-preview";
const TEMPLATE_DATA = [
  { id: "aquarela", name: "Aquarela", file: "Aquarella.webp", active: true },
  { id: "woodland", name: "Woodland", file: "woodland.webp" },
  { id: "noir", name: "Noir", file: "Noir.webp" },
  { id: "sakura", name: "Sakura", file: "sakura.webp" },
];

const SONG_DATA = [
  { title: "Tántsi", artist: "Miyagi", status: "approved" as const },
  { title: "Perfect", artist: "Ed Sheeran", status: "approved" as const },
  { title: "Vivir mi vida", artist: "Marc Anthony", status: "pending" as const },
];

const VIEW_BEATS: Record<ViewId, BeatCopy> = {
  summary: {
    target: "activity-feed",
    title: "Todo en un lugar",
    body: "Cada movimiento del evento, en vivo.",
  },
  invitados: {
    target: "guest-list",
    title: "Invitados",
    body: "Quién viene y quién falta. Sin planillas.",
  },
  tables: {
    target: "tables-grid",
    title: "Mesas",
    body: "Armás el salón arrastrando invitados.",
  },
  templates: {
    target: "template-aquarela",
    title: "Diseño",
    body: "+20 plantillas reales, elegís y listo.",
  },
  playlist: {
    target: "song-2",
    title: "Playlist",
    body: "Proponen ellos, aprobás vos.",
  },
};

const ACTION_BEATS: Record<ActionId, BeatCopy> = {
  rsvp: {
    target: "metric-confirmed",
    title: "+1 confirmado",
    body: "Tu invitado tocó \"Confirmo asistencia\" a la izquierda — el contador se mueve solo.",
    tone: "highlight",
  },
  song: {
    target: "metric-songs",
    title: "Canción sugerida",
    body: "Tu invitado la sugirió a la izquierda — vos solo la aprobás.",
    tone: "highlight",
  },
};

type AutoStep = { beat: BeatCopy } & (
  | { type: "view"; view: ViewId }
  | { type: "content" }
  | { type: "export" }
  | { type: "table"; action: "add" }
  | {
      type: "assign";
      guestName: string;
      guestInitial: string;
      tableNumber: number;
    }
  | { type: "guest"; action: "confirm"; name: string; view: ViewId }
  | { type: "action"; action: ActionId; view: ViewId }
);

const AUTO_CYCLE: AutoStep[] = [
  {
    type: "view",
    view: "templates",
    beat: {
      target: "template-aquarela",
      title: "Elegís el diseño",
      body: "+20 plantillas reales, no maquetas.",
    },
  },
  {
    type: "content",
    beat: {
      target: "content-form",
      title: "Subís tu contenido",
      body: "Fotos, texto y fecha. La invitación se arma sola.",
    },
  },
  {
    type: "view",
    view: "invitados",
    beat: {
      target: "guest-list",
      title: "Generás los links",
      body: "Un link general para todos — o uno por invitado, según tu plan.",
    },
  },
  { type: "action", action: "rsvp", view: "summary", beat: ACTION_BEATS.rsvp },
  {
    type: "guest",
    action: "confirm",
    name: "Carolina Herrera",
    view: "invitados",
    beat: {
      target: "guest-Carolina",
      title: "Confirma solo",
      body: "Confirma en tiempo real, ahí nomás.",
      tone: "highlight",
    },
  },
  { type: "action", action: "song", view: "summary", beat: ACTION_BEATS.song },
  {
    type: "view",
    view: "playlist",
    beat: {
      target: "song-2",
      title: "Sugiere una canción",
      body: "Vos decidís si suena.",
    },
  },
  {
    type: "view",
    view: "tables",
    beat: {
      target: "tables-grid",
      title: "Armás las mesas",
      body: "Dos mesas armadas. Vamos a sumar una más.",
      tone: "highlight",
    },
  },
  {
    type: "table",
    action: "add",
    beat: {
      target: "table-3",
      title: "Mesa 3 lista",
      body: "Sumás mesas con un click, sin límite.",
      tone: "highlight",
    },
  },
  {
    type: "assign",
    guestName: "Florencia Sandez",
    guestInitial: "F",
    tableNumber: 1,
    beat: {
      target: "table-1",
      title: "Florencia ya tiene mesa",
      body: "Arrastrás cada invitado a su lugar.",
      tone: "highlight",
    },
  },
  {
    type: "assign",
    guestName: "Martín Álvarez",
    guestInitial: "M",
    tableNumber: 3,
    beat: {
      target: "table-3",
      title: "Martín ya tiene mesa",
      body: "Repetís el arrastre las veces que necesites.",
      tone: "highlight",
    },
  },
  {
    type: "export",
    beat: {
      target: "export-excel",
      title: "Exportás todo a Excel",
      body: "La lista completa de invitados, en un click.",
      tone: "highlight",
    },
  },
  {
    type: "view",
    view: "summary",
    beat: {
      target: "activity-feed",
      title: "Todo en un lugar",
      body: "Cada movimiento del evento, en vivo.",
    },
  },
];
const AUTO_STEP_MS = 3400;
const AUTO_INITIAL_DELAY_MS = 2200;

const AQ = {
  bg: "#F7F4EA",
  card: "#FDFBF4",
  ink: "#5C5A2F",
  muted: "#6E6B42",
  line: "#DDD8C2",
  primary: "#6D6B39",
  lineSoft: "rgba(109, 107, 57, 0.16)",
  lineMid: "rgba(109, 107, 57, 0.28)",
  primarySoft: "rgba(109, 107, 57, 0.16)",
  doneBg: "rgba(34, 160, 90, 0.10)",
  doneBorder: "rgba(34, 160, 90, 0.30)",
  doneInk: "#1B7A47",
  doneIconBg: "rgba(34, 160, 90, 0.18)",
  fontSerif: "'Cormorant Garamond', Georgia, serif",
  fontScript: "'Parisienne', cursive",
};

const DB = {
  primary: "#FFA459",
  primary15: "rgba(255, 164, 89, 0.15)",
  primary10: "rgba(255, 164, 89, 0.10)",
  primarySoft: "rgba(255, 164, 89, 0.16)",
  destructive: "#B4574E",
  destructive15: "rgba(180, 87, 78, 0.15)",
  destructiveSoft: "rgba(180, 87, 78, 0.16)",
  ink: "var(--bento-ink)",
  inkSoft: "rgba(32, 0, 65, 0.55)",
  surface: "#FFFFFF",
  border: "rgba(32, 0, 65, 0.08)",
  borderSoft: "rgba(32, 0, 65, 0.06)",
  sidebarBg: "rgba(32, 0, 65, 0.025)",
  fontSerif: "'Playfair Display', Georgia, serif",
};

export default function LiveDemoClient({
  eyebrow,
  title,
  subtitle,
  guestLabel,
  ownerLabel,
  autoHint,
  actions,
  dashboard,
}: Props) {
  const [stats, setStats] = useState(INITIAL);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [rsvpDone, setRsvpDone] = useState(false);
  const [doneActions, setDoneActions] = useState<Set<ActionId>>(new Set());
  const [pulsed, setPulsed] = useState<ActionId | null>(null);
  const [currentView, setCurrentView] = useState<ViewId>("templates");
  const [tables, setTables] = useState<TableData[]>(INITIAL_TABLES);
  const [guests, setGuests] = useState<GuestData[]>(INITIAL_GUESTS);
  const [unassignedGuests, setUnassignedGuests] = useState<UnassignedGuest[]>(
    INITIAL_UNASSIGNED
  );
  const [justAddedTable, setJustAddedTable] = useState<number | null>(null);
  const [justConfirmedGuest, setJustConfirmedGuest] = useState<string | null>(null);
  const [justAssignedGuest, setJustAssignedGuest] = useState<string | null>(null);
  const [justAssignedTable, setJustAssignedTable] = useState<number | null>(null);
  const [justAssignedInitial, setJustAssignedInitial] = useState<string | null>(null);
  const [showContentForm, setShowContentForm] = useState(false);
  const [justExported, setJustExported] = useState(false);
  const keyRef = useRef(0);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [beat, setBeat] = useState<TourBeat | null>(null);
  const [beatStep, setBeatStep] = useState(0);
  const [tourFootprint, setTourFootprint] = useState(0);
  const beatSeq = useRef(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const pushBeat = useCallback((copy: BeatCopy, step = 0) => {
    beatSeq.current += 1;
    setBeat({ id: `beat-${beatSeq.current}`, ...copy });
    setBeatStep(step);
  }, []);

  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = "livedemo-aq-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Parisienne&display=swap";
    document.head.appendChild(link);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  const handleAction = useCallback(
    (id: ActionId, options?: { source: "user" | "auto" }) => {
      if (id === "rsvp" && rsvpDone) return;

      if (options?.source !== "auto") {
        analytics.demoActionClicked(id);
      }

      setDoneActions((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });

      setStats((prev) => {
        if (id === "rsvp") {
          return {
            ...prev,
            confirmed: prev.confirmed + 1,
            pending: Math.max(0, prev.pending - 1),
          };
        }
        return { ...prev, songs: prev.songs + 1 };
      });

      if (id === "rsvp") setRsvpDone(true);

      keyRef.current += 1;
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setActivity((prev) =>
        [{ key: keyRef.current, actionId: id, time }, ...prev].slice(0, MAX_ACTIVITY)
      );

      setPulsed(id);
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
      pulseTimer.current = setTimeout(() => setPulsed(null), 1800);
    },
    [rsvpDone]
  );

  const resetDemoState = useCallback(() => {
    setStats(INITIAL);
    setActivity([]);
    setRsvpDone(false);
    setDoneActions(new Set());
    setPulsed(null);
    setTables(INITIAL_TABLES);
    setGuests(INITIAL_GUESTS);
    setUnassignedGuests(INITIAL_UNASSIGNED);
    setJustAddedTable(null);
    setJustConfirmedGuest(null);
    setJustAssignedGuest(null);
    setJustAssignedTable(null);
    setJustAssignedInitial(null);
    setJustExported(false);
  }, []);

  const autoIndexRef = useRef(0);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hasEnteredView) return;

    const playStep = () => {
      let idx = autoIndexRef.current;
      if (idx >= AUTO_CYCLE.length) {
        resetDemoState();
        idx = 0;
      }
      const step = AUTO_CYCLE[idx];
      pushBeat(step.beat, idx + 1);
      setShowContentForm(step.type === "content");

      if (step.type === "view") {
        setCurrentView(step.view);
      } else if (step.type === "export") {
        setJustExported(true);
        setTimeout(() => setJustExported(false), 1400);
      } else if (step.type === "content") {
      } else if (step.type === "table") {
        setTables((prev) => {
          const nextNumber = prev.length + 1;
          setJustAddedTable(nextNumber);
          setTimeout(() => setJustAddedTable(null), 700);
          return [
            ...prev,
            {
              number: nextNumber,
              guests: 4 + prev.length * 2,
              assignedInitials: [],
            },
          ];
        });
      } else if (step.type === "assign") {
        setJustAssignedGuest(step.guestName);
        setJustAssignedTable(step.tableNumber);
        setJustAssignedInitial(step.guestInitial);
        setTimeout(() => {
          setUnassignedGuests((prev) =>
            prev.filter((g) => g.name !== step.guestName)
          );
          setTables((prev) =>
            prev.map((t) =>
              t.number === step.tableNumber
                ? {
                    ...t,
                    guests: t.guests + 1,
                    assignedInitials: [...t.assignedInitials, step.guestInitial],
                  }
                : t
            )
          );
          setJustAssignedGuest(null);
          setJustAssignedTable(null);
          setJustAssignedInitial(null);
        }, 650);
      } else if (step.type === "guest") {
        setCurrentView(step.view);
        setGuests((prev) =>
          prev.map((g) =>
            g.name === step.name ? { ...g, confirmed: true } : g
          )
        );
        setJustConfirmedGuest(step.name);
        setTimeout(() => setJustConfirmedGuest(null), 2600);
      } else {
        setCurrentView(step.view);
        handleAction(step.action, { source: "auto" });
      }

      autoIndexRef.current = idx + 1;
      autoTimerRef.current = setTimeout(playStep, AUTO_STEP_MS);
    };

    autoTimerRef.current = setTimeout(playStep, AUTO_INITIAL_DELAY_MS);

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [hasEnteredView, handleAction, pushBeat, resetDemoState]);

  const handleSidebarClick = useCallback(
    (view: ViewId) => {
      setCurrentView(view);
      setShowContentForm(false);
      pushBeat(VIEW_BEATS[view]);
    },
    [pushBeat]
  );

  const tiles = useMemo(
    () => [
      { id: "rsvp" as const, tour: "metric-confirmed", icon: Users, label: dashboard.confirmedLabel, value: stats.confirmed },
      { id: null, tour: "metric-pending", icon: Clock, label: dashboard.pendingLabel, value: stats.pending },
      { id: "tables" as const, tour: "metric-tables", icon: LayoutGrid, label: dashboard.tablesLabel, value: tables.length },
      { id: "song" as const, tour: "metric-songs", icon: ListMusic, label: dashboard.songsLabel, value: stats.songs },
    ],
    [dashboard, stats, tables.length]
  );

  return (
    <section
      ref={sectionRef}
      id="demo"
      aria-label={title}
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "#FFFBF6" }}
    >
      <Container>
        <style>{`
          @keyframes livedemo-blink {
            0%, 100% { opacity: 1; }
            50%      { opacity: 0.35; }
          }
          @keyframes livedemo-table-pop {
            0%   { transform: scale(0.6); opacity: 0; }
            60%  { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes livedemo-table-drop {
            0%   { box-shadow: 0 0 0 0 rgba(34, 160, 90, 0.55); border-color: rgba(34, 160, 90, 0.6); }
            60%  { box-shadow: 0 0 0 10px rgba(34, 160, 90, 0); border-color: rgba(34, 160, 90, 0.4); }
            100% { box-shadow: 0 0 0 14px rgba(34, 160, 90, 0); }
          }
          @keyframes livedemo-assign-appear {
            0%   { opacity: 0; transform: scale(0.3); }
            60%  { opacity: 1; transform: scale(1.2); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes livedemo-view-in {
            0%   { opacity: 0; transform: translateY(10px) scale(0.985); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes livedemo-shape-float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50%      { transform: translate(2px, -5px) rotate(7deg); }
          }
          @keyframes livedemo-shape-float-alt {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50%      { transform: translate(-3px, -4px) rotate(-9deg); }
          }
          @keyframes livedemo-shape-pulse {
            0%, 100% { opacity: 0.45; }
            50%      { opacity: 0.85; }
          }
          @keyframes livedemo-caret-blink {
            0%, 100% { opacity: 1; }
            50%      { opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="livedemo-blink"]             { animation: none !important; opacity: 1; }
            [style*="livedemo-table-pop"]         { animation: none !important; transform: none; opacity: 1; }
            [style*="livedemo-table-drop"]        { animation: none !important; box-shadow: none; }
            [style*="livedemo-assign-appear"]     { animation: none !important; transform: none; opacity: 1; }
            [style*="livedemo-view-in"]           { animation: none !important; transform: none; opacity: 1; }
            [style*="livedemo-shape-float"]       { animation: none !important; transform: none; }
            [style*="livedemo-shape-float-alt"]   { animation: none !important; transform: none; }
            [style*="livedemo-shape-pulse"]       { animation: none !important; opacity: 0.55; }
            [style*="livedemo-caret-blink"]       { animation: none !important; opacity: 0; }
          }
        `}</style>

        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <p
            className="text-xs md:text-sm font-medium uppercase mb-4"
            style={{ letterSpacing: "0.18em", color: "#9B5A00" }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-normal leading-[1.1] mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: INK, letterSpacing: "-0.02em" }}
          >
            {title}
          </h2>
          <p className="text-base md:text-lg" style={{ color: "rgba(32, 0, 65, 0.6)" }}>
            {subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start max-w-5xl mx-auto">
          <div>
            <p
              className="text-xs font-medium uppercase mb-3 text-center lg:text-left"
              style={{ letterSpacing: "0.14em", color: "rgba(32, 0, 65, 0.45)" }}
            >
              {guestLabel}
            </p>

            <div
              className="mx-auto w-full max-w-[340px] rounded-[2.25rem] p-3"
              style={{
                backgroundColor: "#2A2521",
                boxShadow: "0 24px 60px rgba(32, 0, 65, 0.20)",
              }}
            >
              <div
                className="rounded-[1.75rem] overflow-hidden relative"
                style={{ backgroundColor: AQ.bg }}
              >
                <style>{`
                  @keyframes aqPetalDrift {
                    0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
                    50%  { transform: translate3d(6px, -8px, 0) rotate(4deg); }
                    100% { transform: translate3d(0, 0, 0) rotate(0deg); }
                  }
                  .aq-drift { animation: aqPetalDrift 9s ease-in-out infinite; }
                  @media (prefers-reduced-motion: reduce) { .aq-drift { animation: none; } }
                `}</style>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  {(
                    [
                      { pos: "tl", cls: "top-0 left-0" },
                      { pos: "tr", cls: "top-0 right-0 -scale-x-100" },
                      { pos: "bl", cls: "bottom-0 left-0 -scale-y-100" },
                      { pos: "br", cls: "bottom-0 right-0 -scale-100" },
                    ] as const
                  ).map(({ pos, cls }) => (
                    <Image
                      key={pos}
                      src="https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media-templates/Aquarelle/CornerRose.webp"
                      alt=""
                      width={78}
                      height={78}
                      className={`absolute h-auto w-[78px] select-none opacity-95 mix-blend-multiply ${cls}`}
                    />
                  ))}
                </div>

                <Image
                  aria-hidden="true"
                  src="https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media-templates/Aquarelle/ButterflyPeach.webp"
                  alt=""
                  width={32}
                  height={32}
                  className="aq-drift pointer-events-none absolute select-none mix-blend-multiply"
                  style={{ top: "24%", left: "16%" }}
                />
                <Image
                  aria-hidden="true"
                  src="https://invitation-bucket-aws.s3.us-east-2.amazonaws.com/media-templates/Aquarelle/ButterflyLilac.webp"
                  alt=""
                  width={26}
                  height={26}
                  className="aq-drift pointer-events-none absolute select-none mix-blend-multiply -scale-x-100"
                  style={{ right: "14%", bottom: "24%" }}
                />

                <div className="relative px-6 pt-12 pb-7 text-center">
                  <p
                    className="text-[0.6rem] uppercase mb-3"
                    style={{ letterSpacing: "0.32em", color: AQ.muted }}
                  >
                    Nuestra boda
                  </p>
                  <p
                    className="text-[0.78rem] tracking-[0.3em] uppercase"
                    style={{ color: AQ.primary, fontWeight: 500 }}
                  >
                    {dashboard.eventDate} · 2026
                  </p>
                  <p
                    className="mt-3 leading-none"
                    style={{
                      fontFamily: AQ.fontScript,
                      color: AQ.primary,
                      fontSize: "1.85rem",
                    }}
                  >
                    {dashboard.eventName}
                  </p>
                </div>

                <div
                  className="relative flex items-center justify-center gap-2 px-6"
                  style={{ color: AQ.primary }}
                  aria-hidden="true"
                >
                  <span
                    className="h-px flex-1"
                    style={{ backgroundColor: "rgba(109, 107, 57, 0.30)" }}
                  />
                  <span
                    className="inline-block rotate-45"
                    style={{
                      width: 5,
                      height: 5,
                      border: "1px solid rgba(109, 107, 57, 0.40)",
                    }}
                  />
                  <span
                    className="h-px flex-1"
                    style={{ backgroundColor: "rgba(109, 107, 57, 0.30)" }}
                  />
                </div>

                <div className="relative px-4 pb-5 pt-1 space-y-2.5">
                  {actions.map((action) => {
                    const Icon = ACTION_ICONS[action.id];
                    const isCompleted = doneActions.has(action.id);
                    const isPulsing = pulsed === action.id;

                    return (
                      <div
                        key={action.id}
                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 motion-reduce:transition-none"
                        style={{
                          backgroundColor: AQ.card,
                          border: `1px solid ${isPulsing ? ACCENT : AQ.line}`,
                          color: AQ.ink,
                          transform: isPulsing ? "scale(1.03)" : "scale(1)",
                          boxShadow: isPulsing
                            ? `0 0 0 4px ${ACCENT}40, 0 10px 26px -10px ${ACCENT}80`
                            : isCompleted
                              ? `0 0 0 3px ${ACCENT}1A, 0 8px 20px -12px ${ACCENT}55`
                              : "0 1px 2px rgba(109,107,57,0.04), 0 8px 20px -12px rgba(109,107,57,0.18)",
                        }}
                      >
                        <span
                          className="shrink-0 flex items-center justify-center rounded-full transition-colors duration-200 motion-reduce:transition-none"
                          style={{
                            width: 30,
                            height: 30,
                            backgroundColor: isCompleted ? ACCENT : AQ.primarySoft,
                            color: isCompleted ? "#FFFFFF" : AQ.primary,
                          }}
                        >
                          {isCompleted ? (
                            <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                          ) : (
                            <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                          )}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span
                            className="block text-sm font-medium truncate"
                            style={{
                              fontFamily: AQ.fontSerif,
                              letterSpacing: "0.02em",
                              fontWeight: 500,
                            }}
                          >
                            {action.label}
                          </span>
                          <span
                            className="block text-[0.68rem] truncate"
                            style={{ color: AQ.muted }}
                          >
                            {action.helper}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div
                  className="flex justify-center pb-3 text-[0.55rem] uppercase"
                  style={{ letterSpacing: "0.32em", color: AQ.muted }}
                >
                  Desliza
                </div>
              </div>
            </div>

            <p
              className="mt-4 text-xs text-center lg:text-left"
              style={{ color: "rgba(32, 0, 65, 0.45)" }}
            >
              {autoHint}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-xs font-medium uppercase"
                style={{ letterSpacing: "0.14em", color: "rgba(32, 0, 65, 0.45)" }}
              >
                {ownerLabel}
              </p>
            </div>

            <div
              ref={panelRef}
              className="relative rounded-2xl"
              style={{
                backgroundColor: DB.surface,
                border: `1px solid ${DB.border}`,
                boxShadow: "0 12px 40px rgba(32, 0, 65, 0.07)",
              }}
            >
              <div className="rounded-2xl overflow-hidden flex">
              <aside
                className="shrink-0 flex flex-col items-center py-3 gap-0.5"
                style={{
                  width: 52,
                  backgroundColor: DB.sidebarBg,
                  borderRight: `1px solid ${DB.border}`,
                }}
              >
                <div
                  className="mb-2 size-7 rounded-lg flex items-center justify-center text-[0.8rem] font-semibold"
                  style={{ backgroundColor: DB.primary15, color: DB.primary }}
                  aria-hidden="true"
                >
                  B
                </div>
                <MiniNavIcon
                  icon={LayoutDashboard}
                  active={currentView === "summary"}
                  onClick={() => handleSidebarClick("summary")}
                  label="Resumen"
                  tour="nav-summary"
                />
                <MiniNavIcon
                  icon={Users}
                  active={currentView === "invitados"}
                  onClick={() => handleSidebarClick("invitados")}
                  label="Invitados"
                  tour="nav-invitados"
                />
                <MiniNavIcon
                  icon={LayoutGrid}
                  active={currentView === "tables"}
                  onClick={() => handleSidebarClick("tables")}
                  label="Mesas"
                  tour="nav-tables"
                />
                <MiniNavIcon
                  icon={Palette}
                  active={currentView === "templates"}
                  onClick={() => handleSidebarClick("templates")}
                  label="Personalización"
                  tour="nav-templates"
                />
                <MiniNavIcon
                  icon={Music}
                  active={currentView === "playlist"}
                  onClick={() => handleSidebarClick("playlist")}
                  label="Playlist"
                  tour="nav-playlist"
                />
              </aside>

              <div
                className="flex-1 min-w-0 overflow-hidden"
                style={{ height: "400px", overscrollBehavior: "none" }}
              >
                <div
                  className="flex items-center justify-between gap-3 px-4 py-3"
                  style={{ borderBottom: `1px solid ${DB.border}` }}
                >
                  <div className="min-w-0">
                    <p
                      className="truncate"
                      style={{
                        fontFamily: DB.fontSerif,
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: DB.ink,
                        lineHeight: 1.15,
                      }}
                    >
                      {dashboard.eventName}
                    </p>
                    <p
                      className="text-[0.7rem] truncate mt-0.5"
                      style={{ color: DB.inkSoft }}
                    >
                      {dashboard.eventDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-medium"
                      style={{ backgroundColor: "rgba(34, 160, 90, 0.12)", color: "#1B7A47" }}
                    >
                      <span
                        className="rounded-full"
                        style={{ width: 6, height: 6, backgroundColor: "#22A05A" }}
                        aria-hidden="true"
                      />
                      {dashboard.statusLabel}
                    </span>
                  </div>
                </div>

                <div
                  key={currentView}
                  style={{ animation: "livedemo-view-in 0.38s cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  {currentView === "summary" && (
                    <SummaryMain
                      tiles={tiles}
                      pulsed={pulsed}
                      activity={activity}
                      dashboard={dashboard}
                    />
                  )}
                  {currentView === "tables" && (
                    <TablesMain
                      tables={tables}
                      justAddedTable={justAddedTable}
                      unassignedGuests={unassignedGuests}
                      justAssignedGuest={justAssignedGuest}
                      justAssignedTable={justAssignedTable}
                      justAssignedInitial={justAssignedInitial}
                      justExported={justExported}
                    />
                  )}
                  {currentView === "templates" && (
                    <TemplatesMain showForm={showContentForm} runId={beat?.id ?? "static"} />
                  )}
                  {currentView === "invitados" && (
                    <InvitadosMain
                      guests={guests}
                      justConfirmedGuest={justConfirmedGuest}
                    />
                  )}
                   {currentView === "playlist" && <PlaylistMain />}
                  </div>
                </div>
              </div>

              <LiveDemoTour
                containerRef={panelRef}
                beat={beat}
                stepMs={AUTO_STEP_MS}
                timed
                step={beatStep}
                total={AUTO_CYCLE.length}
                onFootprintChange={setTourFootprint}
              />
            </div>
            <div aria-hidden="true" style={{ height: tourFootprint }} />
          </div>
        </div>
      </Container>
    </section>
  );
}

interface MiniNavIconProps {
  icon: typeof LayoutDashboard;
  active?: boolean;
  onClick?: () => void;
  label: string;
  tour?: string;
}

function MiniNavIcon({ icon: Icon, active = false, onClick, label, tour }: MiniNavIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      data-tour={tour}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-lg transition-colors hover:bg-(--aq-primary-10) focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        width: 44,
        height: 44,
        backgroundColor: active ? DB.primary15 : "transparent",
        color: active ? DB.primary : "rgba(32, 0, 65, 0.45)",
      }}
    >
      <Icon size={15} strokeWidth={active ? 2 : 1.6} />
    </button>
  );
}

interface SummaryMetricProps {
  icon: typeof LayoutDashboard;
  value: number;
  label: string;
  tone: "primary" | "destructive" | "neutral";
  isPulsing: boolean;
  tour?: string;
}

function SummaryMetric({ icon: Icon, value, label, tone, isPulsing, tour }: SummaryMetricProps) {
  const palette =
    tone === "primary"
      ? {
          border: `1px solid ${DB.primary15}`,
          bg: `linear-gradient(135deg, ${DB.primary15} 0%, ${DB.primary10} 100%)`,
          iconBg: DB.primary15,
          iconColor: DB.primary,
          labelColor: `${DB.primary}E6`,
          valueColor: DB.ink,
        }
      : tone === "destructive"
        ? {
            border: `1px solid ${DB.destructive15}`,
            bg: `linear-gradient(135deg, ${DB.destructive15} 0%, ${DB.destructiveSoft} 100%)`,
            iconBg: DB.destructiveSoft,
            iconColor: DB.destructive,
            labelColor: `${DB.destructive}E6`,
            valueColor: DB.ink,
          }
        : {
            border: `1px solid ${DB.border}`,
            bg: "linear-gradient(135deg, rgba(32, 0, 65, 0.04) 0%, rgba(32, 0, 65, 0.02) 100%)",
            iconBg: "rgba(32, 0, 65, 0.05)",
            iconColor: "rgba(32, 0, 65, 0.65)",
            labelColor: "rgba(32, 0, 65, 0.55)",
            valueColor: DB.ink,
          };

  return (
    <div
      data-tour={tour}
      className="rounded-2xl px-3.5 py-3 flex flex-col gap-2 transition-colors duration-500 motion-reduce:transition-none"
      style={{
        border: palette.border,
        background: isPulsing ? `${DB.primary10}` : palette.bg,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="flex items-center justify-center rounded-2xl"
          style={{
            width: 28,
            height: 28,
            backgroundColor: palette.iconBg,
            color: palette.iconColor,
          }}
        >
          <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span
          className="text-[0.55rem] font-semibold uppercase"
          style={{ letterSpacing: "0.3em", color: palette.labelColor }}
        >
          {label}
        </span>
      </div>
      <span
        className="text-2xl font-semibold tracking-tight transition-transform duration-300 motion-reduce:transition-none"
        style={{
          color: palette.valueColor,
          transform: isPulsing ? "scale(1.10)" : "scale(1)",
          transformOrigin: "left center",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}

interface SummaryMainProps {
  tiles: Array<{
    id: "rsvp" | "song" | "tables" | null;
    tour: string;
    icon: typeof Users;
    label: string;
    value: number;
  }>;
  pulsed: ActionId | null;
  activity: ActivityEntry[];
  dashboard: LiveDemoDashboard;
}

function SummaryMain({ tiles, pulsed, activity, dashboard }: SummaryMainProps) {
  return (
    <div className="relative" style={{ isolation: "isolate" }}>
      <ViewShapes variant="summary" />

      <div
        className="grid grid-cols-2 gap-2.5 p-2.5 pt-3.5"
        style={{ position: "relative", zIndex: 2 }}
      >
        {tiles.map((tile, i) => {
          const Icon = tile.icon;
          const isPulsing =
            pulsed !== null &&
            (tile.id === pulsed || (pulsed === "rsvp" && tile.id === null));
          const tone = i === 0 ? "primary" : i === 1 ? "destructive" : "neutral";

          return (
            <SummaryMetric
              key={i}
              icon={Icon}
              value={tile.value}
              label={tile.label}
              tone={tone}
              isPulsing={isPulsing}
              tour={tile.tour}
            />
          );
        })}
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 mb-2.5">
          <p
            className="text-[0.65rem] font-semibold uppercase"
            style={{ letterSpacing: "0.3em", color: "rgba(32, 0, 65, 0.45)" }}
          >
            {dashboard.activityTitle}
          </p>
          <span
            className="inline-flex items-center gap-1.5 text-[0.55rem] font-semibold uppercase"
            style={{
              letterSpacing: "0.26em",
              color: DB.primary,
            }}
            aria-label="Demo en reproducción automática"
          >
            <span
              className="rounded-full"
              style={{
                width: 6,
                height: 6,
                backgroundColor: DB.primary,
                animation: "livedemo-blink 1.4s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            En vivo
          </span>
        </div>

        <ul
          data-tour="activity-feed"
          aria-live="polite"
          aria-relevant="additions"
          className="space-y-1.5"
          style={{ minHeight: "6.5rem" }}
        >
          {activity.length === 0 ? (
            <li
              className="flex items-center justify-center text-xs text-center px-3"
              style={{ color: "rgba(32, 0, 65, 0.35)", minHeight: "6.5rem" }}
            >
              {dashboard.emptyActivity}
            </li>
          ) : (
            activity.map((entry) => {
              const Icon = ACTION_ICONS[entry.actionId];
              return (
                <li
                  key={entry.key}
                  className="bento-activity-row flex items-center gap-2.5 rounded-lg px-2.5 py-2"
                  style={{ backgroundColor: "rgba(32, 0, 65, 0.025)" }}
                >
                  <span
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: "rgba(255, 164, 89, 0.16)",
                      color: "#9B5A00",
                    }}
                  >
                    <Icon size={12} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <p
                    className="flex-1 min-w-0 text-xs truncate"
                    style={{ color: INK }}
                  >
                    <span className="font-medium">{dashboard.guestName}</span>{" "}
                    <span style={{ color: "rgba(32, 0, 65, 0.6)" }}>
                      {dashboard.events[entry.actionId]}
                    </span>
                  </p>
                  <span
                    className="shrink-0 text-[0.65rem] tabular-nums"
                    style={{ color: "rgba(32, 0, 65, 0.4)" }}
                  >
                    {entry.time}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

function TablesMain({
  tables,
  justAddedTable,
  unassignedGuests,
  justAssignedGuest,
  justAssignedTable,
  justAssignedInitial,
  justExported,
}: {
  tables: TableData[];
  justAddedTable: number | null;
  unassignedGuests: UnassignedGuest[];
  justAssignedGuest: string | null;
  justAssignedTable: number | null;
  justAssignedInitial: string | null;
  justExported: boolean;
}) {
  const dragContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={dragContainerRef} style={{ position: "relative" }}>
    <ViewShell
      title="Mesas"
      subtitle="Arrastrá invitados a cada mesa"
    >
      <ViewShapes variant="mesas" />

      <div
        data-tour="export-excel"
        className="inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase transition-colors duration-300 motion-reduce:transition-none"
        style={{
          position: "relative",
          zIndex: 2,
          letterSpacing: "0.08em",
          backgroundColor: justExported ? "rgba(34, 160, 90, 0.14)" : "rgba(32, 0, 65, 0.04)",
          color: justExported ? "#1B7A47" : "rgba(32, 0, 65, 0.55)",
          border: `1px solid ${justExported ? "rgba(34, 160, 90, 0.35)" : DB.border}`,
        }}
      >
        {justExported ? (
          <Check size={11} strokeWidth={2.6} aria-hidden="true" />
        ) : (
          <FileSpreadsheet size={11} strokeWidth={2} aria-hidden="true" />
        )}
        {justExported ? "Exportado a Excel" : "Exportar a Excel"}
      </div>

      <div
        data-tour="unassigned-sheet"
        className="flex items-center gap-1.5 flex-wrap min-h-[28px]"
        aria-label="Invitados sin asignar"
        style={{ position: "relative", zIndex: 2 }}
      >
        {unassignedGuests.length === 0 ? (
          <span
            className="text-[0.62rem] italic"
            style={{ color: DB.inkSoft }}
          >
            Todos asignados ✓
          </span>
        ) : (
          unassignedGuests.map((g) => {
            const isFading = justAssignedGuest === g.name;
            return (
              <span
                key={g.name}
                data-drag-chip={g.name}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isFading
                    ? "rgba(34, 160, 90, 0.18)"
                    : "rgba(32, 0, 65, 0.05)",
                  border: `1px solid ${
                    isFading
                      ? "rgba(34, 160, 90, 0.4)"
                      : "rgba(32, 0, 65, 0.10)"
                  }`,
                  opacity: isFading ? 0 : 1,
                  transform: isFading
                    ? "scale(0.7) translateX(-12px)"
                    : "scale(1) translateX(0)",
                }}
              >
                <span
                  className="size-3.5 rounded-full flex items-center justify-center text-[0.5rem] font-bold"
                  style={{
                    backgroundColor: `${DB.primary}26`,
                    color: DB.primary,
                  }}
                >
                  {g.initial}
                </span>
                <span
                  className="text-[0.6rem] font-medium"
                  style={{ color: DB.ink }}
                >
                  {g.name.split(" ")[0]}
                </span>
              </span>
            );
          })
        )}
      </div>

      <div
        data-tour="tables-grid"
        className="grid grid-cols-2 gap-2.5"
        style={{ position: "relative", zIndex: 2 }}
      >
        {tables.map((t) => {
          const isNew = justAddedTable === t.number;
          const isDropped = justAssignedTable === t.number;

          let animation = "none";
          if (isNew) {
            animation =
              "livedemo-table-pop 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
          } else if (isDropped) {
            animation = "livedemo-table-drop 0.7s ease-out";
          }

          return (
            <div
              key={t.number}
              data-tour={`table-${t.number}`}
              className="rounded-2xl p-3 flex flex-col items-center gap-1.5"
              style={{
                backgroundColor: "rgba(32, 0, 65, 0.03)",
                border: `1px solid ${DB.border}`,
                animation,
              }}
            >
              <div
                className="relative size-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: DB.primary10,
                  border: `1.5px dashed ${DB.primary}66`,
                }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: DB.primary, fontFamily: DB.fontSerif }}
                >
                  {t.number}
                </span>
                <span
                  className="absolute -top-1 -right-1 size-5 rounded-full text-[0.55rem] font-bold flex items-center justify-center"
                  style={{
                    backgroundColor: DB.primary,
                    color: "#FFFFFF",
                    border: "2px solid white",
                  }}
                >
                  {t.guests}
                </span>
              </div>
              <span
                className="text-[0.6rem] font-semibold uppercase"
                style={{ letterSpacing: "0.2em", color: DB.ink }}
              >
                Mesa {t.number}
              </span>
              {t.assignedInitials.length > 0 ? (
                <div className="flex -space-x-1 mt-0.5" aria-label="Asignados">
                  {t.assignedInitials.map((initial, i) => {
                    const isFresh =
                      justAssignedInitial === initial && isDropped;
                    return (
                      <span
                        key={`${initial}-${i}`}
                        className="size-4 rounded-full flex items-center justify-center text-[0.5rem] font-bold"
                        style={{
                          backgroundColor: `${DB.primary}1A`,
                          color: DB.primary,
                          border: "1.5px solid white",
                          animation: isFresh
                            ? "livedemo-assign-appear 0.45s cubic-bezier(0.16, 1, 0.3, 1)"
                            : "none",
                        }}
                      >
                        {initial}
                      </span>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </ViewShell>
    <DragGhost
      containerRef={dragContainerRef}
      guestName={justAssignedGuest}
      guestInitial={justAssignedInitial}
      tableNumber={justAssignedTable}
    />
    </div>
  );
}

function DragGhost({
  containerRef,
  guestName,
  guestInitial,
  tableNumber,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  guestName: string | null;
  guestInitial: string | null;
  tableNumber: number | null;
}) {
  const [from, setFrom] = useState<{ x: number; y: number } | null>(null);
  const [to, setTo] = useState<{ x: number; y: number } | null>(null);
  const [traveling, setTraveling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!guestName || tableNumber === null || !container) {
      const frame = requestAnimationFrame(() => {
        setFrom(null);
        setTraveling(false);
      });
      return () => cancelAnimationFrame(frame);
    }

    const containerRect = container.getBoundingClientRect();
    const chip = container.querySelector(`[data-drag-chip="${guestName}"]`);
    const table = container.querySelector(`[data-tour="table-${tableNumber}"]`);
    if (!chip || !table) return;

    const chipRect = chip.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();

    setFrom({
      x: chipRect.left - containerRect.left + chipRect.width / 2,
      y: chipRect.top - containerRect.top + chipRect.height / 2,
    });
    setTo({
      x: tableRect.left - containerRect.left + tableRect.width / 2,
      y: tableRect.top - containerRect.top + tableRect.height * 0.35,
    });
    setTraveling(false);

    const frame = requestAnimationFrame(() => setTraveling(true));
    return () => cancelAnimationFrame(frame);
  }, [containerRef, guestName, tableNumber]);

  if (!guestName || !from || !to) return null;

  const pos = traveling ? to : from;

  return (
    <span
      aria-hidden="true"
      className="motion-reduce:transition-none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 6,
        width: 20,
        height: 20,
        marginLeft: -10,
        marginTop: -10,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        fontWeight: 700,
        color: "#FFFFFF",
        backgroundColor: DB.primary,
        border: "2px solid #FFFFFF",
        boxShadow: "0 8px 18px -4px rgba(255, 164, 89, 0.7)",
        pointerEvents: "none",
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${traveling ? 1.2 : 1})`,
        transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {guestInitial}
    </span>
  );
}

function TemplatesMain({
  showForm,
  runId,
}: {
  showForm: boolean;
  runId: string;
}) {
  return (
    <ViewShell
      title={showForm ? "Contenido" : "Personalización"}
      subtitle={showForm ? "Subís fotos, texto y fecha" : "Cambiá de diseño cuando quieras"}
    >
      <ViewShapes variant="templates" />
      {showForm ? (
        <ContentFormPreview key={runId} />
      ) : (
        <div
          className="grid grid-cols-2 gap-2.5"
          style={{ position: "relative", zIndex: 2 }}
        >
          {TEMPLATE_DATA.map((t) => (
            <div
              key={t.id}
              data-tour={`template-${t.id}`}
              className="rounded-xl overflow-hidden relative"
              style={{
                border: t.active
                  ? `2px solid ${DB.primary}`
                  : `1px solid ${DB.border}`,
                boxShadow: t.active
                  ? `0 0 0 3px ${DB.primary}1A`
                  : "none",
              }}
            >
              <div className="aspect-[4/3] relative overflow-hidden" style={{ backgroundColor: "#F2EFE6" }}>
                <Image
                  src={`${TEMPLATE_PREVIEW_BASE}/${t.file}`}
                  alt={t.name}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
              <div
                className="px-2 py-1.5 flex items-center justify-between"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <span
                  className="text-[0.65rem] font-semibold"
                  style={{ color: DB.ink }}
                >
                  {t.name}
                </span>
                {t.active ? (
                  <span
                    className="size-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: DB.primary }}
                    aria-label="Diseño activo"
                  >
                    <Check
                      size={10}
                      strokeWidth={3.5}
                      style={{ color: "#FFFFFF" }}
                    />
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </ViewShell>
  );
}

const CONTENT_FIELDS_RAW = [
  { label: "Nombre del evento", value: "Sofia & Mateo" },
  { label: "Fecha", value: "28 de noviembre, 2026" },
  { label: "Mensaje para tus invitados", value: "Los esperamos para festejar este día tan especial junto a vos." },
];
const CONTENT_FIELDS = CONTENT_FIELDS_RAW.reduce<
  Array<{ label: string; value: string; start: number }>
>((acc, field) => {
  const start = acc.length === 0 ? 0 : acc[acc.length - 1].start + acc[acc.length - 1].value.length;
  return [...acc, { ...field, start }];
}, []);
const CONTENT_TOTAL_CHARS = CONTENT_FIELDS_RAW.reduce((sum, f) => sum + f.value.length, 0);
const CONTENT_TYPE_START_MS = 260;
const CONTENT_TYPE_CHAR_MS = 26;

function ContentFormPreview() {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const frame = requestAnimationFrame(() => setCharCount(CONTENT_TOTAL_CHARS));
      return () => cancelAnimationFrame(frame);
    }

    let timer: ReturnType<typeof setTimeout>;
    let count = 0;
    const tick = () => {
      count += 1;
      setCharCount(count);
      if (count < CONTENT_TOTAL_CHARS) {
        timer = setTimeout(tick, CONTENT_TYPE_CHAR_MS);
      }
    };
    timer = setTimeout(tick, CONTENT_TYPE_START_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-tour="content-form"
      className="flex flex-col gap-2.5"
      style={{ position: "relative", zIndex: 2 }}
    >
      {CONTENT_FIELDS.map((field) => {
        const revealed = Math.max(0, Math.min(field.value.length, charCount - field.start));
        const isTyping = revealed > 0 && revealed < field.value.length;

        return (
          <div key={field.label}>
            <p
              className="text-[0.6rem] font-semibold uppercase mb-1"
              style={{ letterSpacing: "0.14em", color: "rgba(32, 0, 65, 0.4)" }}
            >
              {field.label}
            </p>
            <div
              className="rounded-lg px-3 py-2 text-xs"
              style={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${DB.border}`,
                color: DB.ink,
                minHeight: "1.9rem",
              }}
            >
              {field.value.slice(0, revealed)}
              {isTyping ? (
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: 1.5,
                    height: "0.9em",
                    marginLeft: 1,
                    backgroundColor: DB.primary,
                    animation: "livedemo-caret-blink 0.9s step-end infinite",
                    verticalAlign: "text-bottom",
                  }}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InvitadosMain({
  guests,
  justConfirmedGuest,
}: {
  guests: GuestData[];
  justConfirmedGuest: string | null;
}) {
  return (
    <ViewShell
      title="Invitados"
      subtitle="92 invitados · 47 confirmados"
    >
      <ViewShapes variant="invitados" />
      <ul
        data-tour="guest-list"
        className="space-y-1.5"
        style={{ position: "relative", zIndex: 2 }}
      >
        {guests.map((g) => {
          const isJustConfirmed = justConfirmedGuest === g.name;
          return (
            <li
              key={g.name}
              data-tour={`guest-${g.name.split(" ")[0]}`}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors duration-500 motion-reduce:transition-none"
              style={{
                backgroundColor: isJustConfirmed
                  ? "rgba(34, 160, 90, 0.18)"
                  : "rgba(32, 0, 65, 0.03)",
                border: isJustConfirmed
                  ? "1px solid rgba(34, 160, 90, 0.35)"
                  : "1px solid transparent",
                transition: "background-color 0.6s ease, border-color 0.6s ease",
              }}
            >
              <span
                className="size-6 rounded-full flex items-center justify-center text-[0.6rem] font-semibold shrink-0"
                style={{
                  backgroundColor: `${DB.primary}1A`,
                  color: DB.primary,
                }}
              >
                {g.initial}
              </span>
              <span
                className="flex-1 min-w-0 text-[0.75rem] truncate"
                style={{ color: DB.ink }}
              >
                {g.name}
              </span>
              <span
                className="text-[0.55rem] font-semibold uppercase px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: g.confirmed
                    ? "rgba(34, 160, 90, 0.12)"
                    : "rgba(180, 87, 78, 0.10)",
                  color: g.confirmed ? "#1B7A47" : DB.destructive,
                  letterSpacing: "0.18em",
                }}
              >
                {g.confirmed ? "OK" : "···"}
              </span>
            </li>
          );
        })}
      </ul>
    </ViewShell>
  );
}

function PlaylistMain() {
  return (
    <ViewShell
      title="Playlist"
      subtitle="Tus invitados proponen, vos aprobás"
    >
      <ViewShapes variant="playlist" />
      <ul
        data-tour="song-list"
        className="space-y-1.5"
        style={{ position: "relative", zIndex: 2 }}
      >
        {SONG_DATA.map((s, i) => (
          <li
            key={s.title}
            data-tour={`song-${i}`}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg"
            style={{ backgroundColor: "rgba(32, 0, 65, 0.03)" }}
          >
            <span
              className="size-6 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${DB.primary}1A`,
                color: DB.primary,
              }}
            >
              <Music size={12} strokeWidth={2} />
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="text-[0.75rem] truncate"
                style={{ color: DB.ink, fontWeight: 500 }}
              >
                {s.title}
              </p>
              <p
                className="text-[0.62rem] truncate"
                style={{ color: DB.inkSoft }}
              >
                {s.artist}
              </p>
            </div>
            <span
              className="text-[0.55rem] font-semibold uppercase px-1.5 py-0.5 rounded"
              style={{
                backgroundColor:
                  s.status === "approved"
                    ? "rgba(34, 160, 90, 0.12)"
                    : "rgba(180, 87, 78, 0.10)",
                color:
                  s.status === "approved" ? "#1B7A47" : DB.destructive,
                letterSpacing: "0.18em",
              }}
            >
              {s.status === "approved" ? "OK" : "···"}
            </span>
          </li>
        ))}
      </ul>
    </ViewShell>
  );
}

interface ViewShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function ViewShell({ title, subtitle, children }: ViewShellProps) {
  return (
    <div
      className="px-4 py-3.5 flex flex-col gap-3 relative"
      style={{ isolation: "isolate" }}
    >
      <div style={{ position: "relative", zIndex: 2 }}>
        <h4
          className="text-sm font-semibold"
          style={{ color: DB.ink, fontFamily: DB.fontSerif, lineHeight: 1.2 }}
        >
          {title}
        </h4>
        <p className="text-[0.68rem] mt-0.5" style={{ color: DB.inkSoft }}>
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
}

interface ShapeProps {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

function Blob({ color = "#FFA459", size = 60, style }: ShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      style={{ position: "absolute", zIndex: 0, pointerEvents: "none", ...style }}
      aria-hidden="true"
    >
      <path
        d="M30 4 C 42 4, 56 16, 56 30 C 56 44, 42 56, 30 56 C 16 56, 4 44, 4 30 C 4 16, 16 4, 30 4 Z"
        fill={color}
        opacity="0.22"
      />
    </svg>
  );
}

function Sparkle({ color = "#FFA459", size = 14, style }: ShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={{ position: "absolute", zIndex: 0, pointerEvents: "none", ...style }}
      aria-hidden="true"
    >
      <path
        d="M10 0 L 11.6 8.4 L 20 10 L 11.6 11.6 L 10 20 L 8.4 11.6 L 0 10 L 8.4 8.4 Z"
        fill={color}
        opacity="0.7"
      />
    </svg>
  );
}

function Ring({ color = "#FFA459", size = 22, style }: ShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ position: "absolute", zIndex: 0, pointerEvents: "none", ...style }}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <circle cx="12" cy="12" r="3.5" fill={color} opacity="0.6" />
    </svg>
  );
}

function Squiggle({ color = "#FFA459", size = 28, style }: ShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      style={{ position: "absolute", zIndex: 0, pointerEvents: "none", ...style }}
      aria-hidden="true"
    >
      <path
        d="M 4 15 Q 9 5, 14 15 T 24 15"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

interface ViewShapesProps {
  variant: "mesas" | "templates" | "invitados" | "playlist" | "summary";
}

function ViewShapes({ variant }: ViewShapesProps) {
  switch (variant) {
    case "mesas":
      return (
        <>
          <Blob
            color="#FFA459"
            size={70}
            style={{ top: -8, right: -12, animation: "livedemo-shape-float 4.5s ease-in-out infinite" }}
          />
          <Sparkle
            color="#FFA459"
            size={12}
            style={{ bottom: 18, left: 16, animation: "livedemo-shape-pulse 2.6s ease-in-out infinite" }}
          />
          <Ring
            color="#FFA459"
            size={18}
            style={{ top: "55%", right: 8, animation: "livedemo-shape-float-alt 5s ease-in-out infinite 0.6s" }}
          />
        </>
      );
    case "templates":
      return (
        <>
          <Sparkle
            color="#D4AF37"
            size={16}
            style={{ bottom: 8, right: 24, animation: "livedemo-shape-pulse 3s ease-in-out infinite 0.4s" }}
          />
          <Blob
            color="#FDE68A"
            size={36}
            style={{ bottom: 30, left: 30, animation: "livedemo-shape-float 5s ease-in-out infinite 1s" }}
          />
        </>
      );
    case "invitados":
      return (
        <>
          <Ring
            color="#FFA459"
            size={20}
            style={{ top: 0, right: 12, animation: "livedemo-shape-float 4s ease-in-out infinite" }}
          />
          <Sparkle
            color="#6EE7B7"
            size={12}
            style={{ bottom: 24, left: 12, animation: "livedemo-shape-pulse 2.4s ease-in-out infinite 0.3s" }}
          />
          <Blob
            color="#FBCFE8"
            size={44}
            style={{ bottom: -10, right: -6, animation: "livedemo-shape-float-alt 5.5s ease-in-out infinite 0.9s" }}
          />
        </>
      );
    case "playlist":
      return (
        <>
          <Squiggle
            color="#FFA459"
            size={32}
            style={{ top: 6, right: 14, animation: "livedemo-shape-float 4s ease-in-out infinite" }}
          />
          <Sparkle
            color="#FFA459"
            size={12}
            style={{ bottom: 16, left: 20, animation: "livedemo-shape-pulse 2.8s ease-in-out infinite 0.5s" }}
          />
          <Ring
            color="#C4B5FD"
            size={16}
            style={{ top: "60%", right: 4, animation: "livedemo-shape-float-alt 5s ease-in-out infinite 1.2s" }}
          />
        </>
      );
    case "summary":
      return (
        <>
          <Sparkle
            color="#FFA459"
            size={14}
            style={{ bottom: 12, left: 22, animation: "livedemo-shape-pulse 2.5s ease-in-out infinite 0.4s" }}
          />
          <Ring
            color="#6EE7B7"
            size={18}
            style={{ top: "50%", right: 6, animation: "livedemo-shape-float-alt 5.2s ease-in-out infinite 0.8s" }}
          />
        </>
      );
  }
}
