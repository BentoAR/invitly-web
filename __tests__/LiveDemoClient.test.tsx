import { act, render, screen, fireEvent, within } from "@testing-library/react";
import LiveDemoClient from "@/components/features/home/LiveDemoClient";
import type { LiveDemoAction, LiveDemoDashboard } from "@/components/features/home/LiveDemoClient";

const actions: LiveDemoAction[] = [
  { id: "rsvp", label: "Confirmo asistencia", helper: "El invitado confirma desde su celular" },
  { id: "song", label: "Sugerir una canción", helper: "Propone un tema para la playlist" },
];

const dashboard: LiveDemoDashboard = {
  eventName: "Dafne & Tomás",
  eventDate: "28 de noviembre",
  statusLabel: "Activo",
  confirmedLabel: "Confirmados",
  pendingLabel: "Pendientes",
  tablesLabel: "Mesas armadas",
  songsLabel: "Canciones sugeridas",
  activityTitle: "Actividad en vivo",
  emptyActivity: "Todavía no pasó nada.",
  guestName: "Julieta Ramos",
  events: {
    rsvp: "confirmó su asistencia",
    song: "sugirió una canción",
  },
};

const setup = () =>
  render(
    <LiveDemoClient
      eyebrow="Probalo acá mismo"
      title="Dos pantallas. Un solo link."
      subtitle="A la izquierda tu invitado, a la derecha vos."
      guestLabel="Lo que ve tu invitado"
      ownerLabel="Lo que ves vos"
      autoHint="Así se ve en vivo, todo el tiempo"
      actions={actions}
      dashboard={dashboard}
    />
  );

const tileValue = (label: string) => {
  const labelNode = screen.getByText(label);
  const tile = labelNode.parentElement?.parentElement as HTMLElement;
  return within(tile).getByText(/^\d+$/).textContent;
};

const INITIAL_DELAY_MS = 2200;
const STEP_MS = 3400;
const CYCLE_LENGTH = 13;
const advanceToStep = (n: number) =>
  act(() => {
    jest.advanceTimersByTime(INITIAL_DELAY_MS + n * STEP_MS);
  });

describe("LiveDemoClient — demo interactiva de la home", () => {
  it("arranca en Personalización (paso 1), sin invitar a tocar nada", () => {
    setup();

    expect(screen.getByRole("heading", { name: "Personalización" })).toBeInTheDocument();
    expect(screen.getByText("Así se ve en vivo, todo el tiempo")).toBeInTheDocument();
    expect(screen.queryByText(/reiniciar/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /confirmo asistencia/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /sugerir una canción/i })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/resumen/i));
    expect(screen.getByText(dashboard.emptyActivity)).toBeInTheDocument();
  });

  it("la navegación del panel (derecha) sigue siendo clickeable", () => {
    setup();

    fireEvent.click(screen.getByLabelText(/invitados/i));
    expect(screen.getByRole("heading", { name: "Invitados" })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/personalización/i));
    expect(screen.getByRole("heading", { name: "Personalización" })).toBeInTheDocument();
  });

  it("el auto-play mueve las métricas solo, sin ninguna acción manual", () => {
    jest.useFakeTimers();
    setup();

    advanceToStep(3);
    fireEvent.click(screen.getByLabelText(/resumen/i));

    expect(tileValue(dashboard.confirmedLabel)).toBe("48");
    expect(tileValue(dashboard.pendingLabel)).toBe("12");
    expect(screen.getByText(dashboard.events.rsvp)).toBeInTheDocument();

    jest.useRealTimers();
  });

  it("es un loop: al completar el guion, el estado vuelve al inicio", () => {
    jest.useFakeTimers();
    setup();

    advanceToStep(CYCLE_LENGTH + 0.5);
    fireEvent.click(screen.getByLabelText(/resumen/i));

    expect(tileValue(dashboard.confirmedLabel)).toBe("47");
    expect(tileValue(dashboard.pendingLabel)).toBe("13");
    expect(tileValue(dashboard.songsLabel)).toBe("24");

    jest.useRealTimers();
  });
});
