"use client";

const testimonials = [
  {
    name: "Florencia Sandez", location: "Buenos Aires", eventType: "Casamiento", eventDate: "octubre 2025",
    quote: "No sabía bien cómo iba a quedar. Pero cuando mis amigas empezaron a escribirme preguntando cómo habíamos hecho la invitación, entendí que había valido la pena. La lista de confirmados la tuve en tiempo real, sin llamar a nadie.",
  },
  {
    name: "Valeria Méndez", location: "Córdoba", eventType: "XV años", eventDate: "marzo 2026",
    quote: "Mi hija quería algo especial y Bento lo superó. En 10 minutos teníamos la invitación lista y todos los invitados confirmaron solos. Nunca más vuelvo a hacer invitaciones de papel.",
  },
  {
    name: "Santiago Ríos", location: "Rosario", eventType: "Cumpleaños", eventDate: "enero 2026",
    quote: "Lo usé para los 50 de mi viejo y fue un éxito total. El link se lo mandé por WhatsApp y en dos días ya tenía 60 confirmaciones. Simple, rápido y quedó increíble.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#bc8129" }}>Testimonios</p>
          <h2 className="font-display font-normal leading-[1.08] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#200041", letterSpacing: "-0.03em" }}>
            Lo que dicen los que ya lo usaron
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Más de 10.000 eventos organizados en Argentina. Estos son algunos de los que confiaron en Bento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i}
              className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-secondary/10 p-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #bc8129, #200041)" }} aria-hidden="true">
                {t.name.charAt(0)}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/80 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex flex-col gap-1">
                <div className="flex gap-0.5" aria-label="5 estrellas">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span key={si} className="inline-block" aria-hidden="true">
                      <svg className="h-4 w-4 fill-primary text-primary" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold text-foreground mt-1">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.eventType} · {t.eventDate} · {t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
