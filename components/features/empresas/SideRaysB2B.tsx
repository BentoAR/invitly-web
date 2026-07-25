"use client";

import { SideRays } from "@/components/features/empresas/SideRays";

export function SideRaysB2B() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <SideRays
        origin="top-right"
        rayColor1="#FFA459"
        rayColor2="#FF8A3D"
        speed={1.5}
        intensity={1.1}
        spread={2.5}
        falloff={2.2}
        opacity={0.6}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: "scale(-1, -1)" }}
      >
        <SideRays
          origin="top-right"
          rayColor1="#FFA459"
          rayColor2="#FF8A3D"
          speed={1.5}
          intensity={1.1}
          spread={2.5}
          falloff={2.2}
          opacity={0.6}
        />
      </div>
    </div>
  );
}

export default SideRaysB2B;
