import React from "react";

jest.mock("lottie-react", () => ({ __esModule: true, default: () => null }));
jest.mock("framer-motion", () => {
  interface MotionProps {
    children?: React.ReactNode;
    initial?: unknown;
    whileInView?: unknown;
    viewport?: unknown;
    transition?: unknown;
    variants?: unknown;
    [key: string]: unknown;
  }

  const MotionDiv = React.forwardRef<HTMLDivElement, MotionProps>(
    ({ children, initial: _i, whileInView: _w, viewport: _vp, transition: _t, variants: _v, ...props }, ref) => (
      <div ref={ref} {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
    )
  );
  MotionDiv.displayName = "MotionDiv";

  const MotionLi = React.forwardRef<HTMLLIElement, MotionProps>(
    ({ children, initial: _i, whileInView: _w, viewport: _vp, transition: _t, variants: _v, ...props }, ref) => (
      <li ref={ref} {...(props as React.HTMLAttributes<HTMLLIElement>)}>{children}</li>
    )
  );
  MotionLi.displayName = "MotionLi";

  return {
    motion: {
      div: MotionDiv,
      li: MotionLi,
    },
  };
});

import { render, screen } from "@testing-library/react";
import HowItWorksClient, {
  HOW_IT_WORKS_WHATSAPP_MESSAGE,
  HOW_IT_WORKS_WHATSAPP_REPLIES,
  HOW_IT_WORKS_WHATSAPP_CHAT_SEQUENCE,
} from "@/components/features/home/HowItWorksClient";

describe("HowItWorksClient WhatsApp chat sequence", () => {
  it("envía primero el texto tipeado y después muestra respuestas entrantes", () => {
    expect(HOW_IT_WORKS_WHATSAPP_CHAT_SEQUENCE[0]).toEqual({
      id: "sent-invitation",
      direction: "outgoing",
      text: HOW_IT_WORKS_WHATSAPP_MESSAGE,
    });

    expect(HOW_IT_WORKS_WHATSAPP_CHAT_SEQUENCE.slice(1)).toEqual(
      HOW_IT_WORKS_WHATSAPP_REPLIES.map((reply) => ({
        ...reply,
        direction: "incoming",
      }))
    );
  });
});


describe("HowItWorksClient WhatsApp input UI", () => {
  it("usa íconos estilo WhatsApp real en vez de emojis decorativos", () => {
    render(
      <HowItWorksClient
        steps={[
          { number: "01", title: "Elegí", description: "Elegí una plantilla" },
          { number: "02", title: "Personalizá", description: "Personalizá tu invitación" },
          { number: "03", title: "Compartí", description: "Mandá el link" },
        ]}
        sectionTitle="Tu invitación en 3 pasos"
        subtitle="Súper simple"
      />
    );

    expect(screen.getAllByLabelText("Agregar adjunto")).toHaveLength(2);
    expect(screen.getAllByLabelText("Insertar emoji")).toHaveLength(2);
    expect(screen.getAllByLabelText("Grabar audio")).toHaveLength(2);
    expect(screen.queryByText("😊")).not.toBeInTheDocument();
    expect(screen.queryByText("🎤")).not.toBeInTheDocument();
  });
});
