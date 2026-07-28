import { cn } from "@/utils/shadcn";

interface PatternProps {
  className?: string;
}

export function DotGrid({ className }: PatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dot-grid-b2b"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
          <radialGradient id="dot-grid-mask" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dot-grid-fade">
            <rect width="100%" height="100%" fill="url(#dot-grid-mask)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-grid-b2b)"
          mask="url(#dot-grid-fade)"
          className="text-neutral-700"
        />
      </svg>
    </div>
  );
}

export function GridLines({ className }: PatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-lines-b2b"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <mask id="grid-lines-fade">
            <rect width="100%" height="100%" fill="url(#grid-mask)" />
          </mask>
          <radialGradient id="grid-mask" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-lines-b2b)"
          mask="url(#grid-lines-fade)"
          className="text-neutral-800"
        />
      </svg>
    </div>
  );
}

export function DiagonalLines({ className }: PatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="diagonal-b2b"
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="14"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#diagonal-b2b)"
          className="text-neutral-800/40"
        />
      </svg>
    </div>
  );
}

export function MeshGradient({ className }: PatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <defs>
          <radialGradient id="mesh-1" cx="20%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#FFA459" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FFA459" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mesh-2" cx="80%" cy="70%" r="40%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mesh-3" cx="50%" cy="100%" r="50%">
            <stop offset="0%" stopColor="#FFA459" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFA459" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#mesh-1)" />
        <rect width="1200" height="800" fill="url(#mesh-2)" />
        <rect width="1200" height="800" fill="url(#mesh-3)" />
      </svg>
    </div>
  );
}

export function FloatingOrbs({ className }: PatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full blur-3xl opacity-30 animate-orb-drift"
        style={{
          background:
            "radial-gradient(circle, rgba(255,164,89,0.4), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-[15%] w-96 h-96 rounded-full blur-3xl opacity-25 animate-orb-drift"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)",
          animationDelay: "-4s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 animate-orb-drift"
        style={{
          background:
            "radial-gradient(circle, rgba(255,164,89,0.3), transparent 70%)",
          animationDelay: "-8s",
        }}
      />
    </div>
  );
}

export function TopFade({ className }: PatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-950 to-transparent", className)}
      aria-hidden="true"
    />
  );
}

export function BottomFade({ className }: PatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent", className)}
      aria-hidden="true"
    />
  );
}
