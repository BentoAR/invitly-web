import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  MessageCircle,
  Palette,
  Sparkles,
} from "lucide-react";
import { AgencyContactCta } from "@/components/features/agencias/AgencyContactCta";
import { DotGrid, MeshGradient } from "@/components/features/empresas/BackgroundPatterns";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/src/utils/metadata";

const title = "Invitaciones digitales para productoras y event planners";
const description = "Invitaciones digitales para productoras, organizadores de eventos y wedding planners. Adaptamos un diseño o creamos uno nuevo según lo que necesite cada cliente.";
const url = `${siteConfig.url}/es/invitaciones-digitales-para-organizadores`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
    languages: { es: url, "x-default": url },
  },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const benefits = [
  {
    icon: Palette,
    title: "El diseño que necesita cada evento",
    description:
      "Podemos partir de un diseño de Bento y adaptarlo a la identidad del evento, o crear una propuesta nueva cuando el proyecto lo pide. La solución se define con vos, no antes de conocer al cliente.",
  },
  {
    icon: Sparkles,
    title: "Opciones para pedidos especiales",
    description:
      "¿El cliente necesita sumar una sección, pedir información a los invitados o incluir un formulario particular? Nos contás para qué lo necesita y evaluamos cómo integrarlo en la invitación.",
  },
  {
    icon: ClipboardList,
    title: "Confirmaciones en un solo lugar",
    description:
      "Además de comunicar fecha, lugar y agenda, la invitación puede reunir las confirmaciones y respuestas de los invitados para que el cliente tenga la información ordenada.",
  },
  {
    icon: MessageCircle,
    title: "El soporte corre por nuestra cuenta",
    description:
      "Cuando la invitación está lista, le explicamos a tu cliente cómo usar Bento y respondemos sus dudas sobre la herramienta. Vos seguís llevando la relación comercial sin convertirte en soporte técnico.",
  },
];

const benefitPlacement = [
  "md:col-start-1 md:row-start-1 md:row-span-2",
  "md:col-start-2 md:row-start-1",
  "md:col-start-2 md:row-start-2",
  "md:col-start-1 md:row-start-3 md:col-span-2",
] as const;

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Nos compartís el brief",
    description: "Nos contás de qué se trata el evento, quién es el cliente, qué identidad tiene y si necesita algo especial. Puede ser una idea inicial; la terminamos de ordenar juntos.",
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "Te enviamos una propuesta",
    description: "Definimos el alcance y te pasamos un presupuesto para ese proyecto. Vos lo presentás a tu cliente dentro de tu propuesta y decidís cuánto cobrarle.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Producimos y acompañamos",
    description: "Preparamos la invitación, la revisamos con vos y hacemos los ajustes acordados. Después guiamos al cliente en el uso de Bento y atendemos sus consultas sobre la herramienta.",
  },
];

export default async function ProfesionalesDeEventosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "es") notFound();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden bg-neutral-950 pt-28 pb-20 md:pt-36 md:pb-28">
        <MeshGradient className="opacity-60" />
        <DotGrid className="opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_18%_35%,rgba(255,164,89,0.12),transparent_65%)]" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffa459]/20 bg-[#ffa459]/10 px-4 py-1.5 text-xs font-medium text-[#ffa459]">
              <span className="size-1.5 rounded-full bg-[#ffa459]" /> Tu proveedor digital para eventos
            </span>
            <h1 className="font-display text-[clamp(42px,5vw,72px)] leading-[1.05] font-normal tracking-tight text-white">
              Invitaciones digitales <span className="text-[#ffa459]">para organizadores de eventos.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-xl">
              Vos organizás el evento y llevás la relación con tu cliente. Nosotros nos sumamos como tu proveedor para crear la invitación digital que ese proyecto necesita, con diseño, funcionalidades y acompañamiento acordes al caso.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AgencyContactCta
                location="agencias_hero"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#ffa459] px-7 text-base font-semibold text-neutral-950 transition-colors hover:bg-[#ff8a3d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffa459]"
              >
                Contanos qué necesitás <ArrowRight size={18} />
              </AgencyContactCta>
              <a href="#como-trabajamos" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-7 text-base font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10">
                Cómo trabajamos <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-neutral-950 py-24 md:py-32" id="que-podemos-hacer">
        <DotGrid className="opacity-30" />
        <Container className="relative z-10">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full border border-[#ffa459]/20 bg-[#ffa459]/10 px-3 py-1 text-xs font-semibold tracking-widest text-[#ffa459] uppercase">Qué hacemos</span>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Diseño, confirmaciones y lo que el evento pida</h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-400 md:text-lg">No todos los eventos necesitan lo mismo. Vemos qué puede resolverse con Bento y qué conviene preparar especialmente para tu cliente.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-[1fr_1fr_auto] md:gap-5">
            {benefits.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className={`group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/40 p-6 transition-all duration-500 hover:border-[#ffa459]/30 md:p-7 ${benefitPlacement[index]}`}>
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-[#ffa459]/20 bg-[#ffa459]/10 transition-transform group-hover:rotate-3 group-hover:scale-110"><Icon size={24} className="text-[#ffa459]" /></div>
                <h3 className={`mb-3 font-bold tracking-tight ${index === 0 ? "text-2xl md:text-3xl" : index === 3 ? "text-xl" : "text-lg"}`}>{title}</h3>
                <p className={`leading-relaxed text-neutral-400 ${index === 0 ? "text-base" : "text-sm"}`}>{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-neutral-950 py-20 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full border border-[#ffa459]/20 bg-[#ffa459]/10 px-3 py-1 text-xs font-semibold tracking-widest text-[#ffa459] uppercase">Para tus clientes</span>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Eventos corporativos y celebraciones</h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-400 md:text-lg">Trabajamos con productoras, organizadores de eventos y planners. Podés sumarnos para lanzamientos, convenciones, eventos internos, bodas y otras celebraciones. Una invitación puede ser el primer contacto con el evento y, al mismo tiempo, el lugar donde el invitado encuentra todo lo que necesita para asistir.</p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-neutral-950 py-24 md:py-32" id="como-trabajamos">
        <Container className="relative z-10">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full border border-[#ffa459]/20 bg-[#ffa459]/10 px-3 py-1 text-xs font-semibold tracking-widest text-[#ffa459] uppercase">Cómo trabajamos</span>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">De la idea a la invitación, sin complicarte el trabajo</h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-400 md:text-lg">Nos integrás a tu proyecto como proveedor. Hablás directamente con nosotros, definimos juntos el alcance y revisás el trabajo antes de presentarlo a tu cliente.</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
            {steps.map(({ icon: Icon, number, title, description }) => (
              <div key={number} className="text-center">
                <div className="relative mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#ffa459] text-neutral-950 shadow-lg shadow-[#ffa459]/20">
                  <Icon size={27} strokeWidth={2.3} />
                  <span className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full border-2 border-[#ffa459] bg-neutral-950 text-xs font-bold text-[#ffa459]">{number}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold">{title}</h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-neutral-400">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-neutral-900/60 py-24 md:py-32">
        <Container>
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="mb-4 inline-block rounded-full border border-[#ffa459]/20 bg-[#ffa459]/10 px-3 py-1 text-xs font-semibold tracking-widest text-[#ffa459] uppercase">El acuerdo comercial</span>
              <h2 className="font-display text-4xl leading-[1.1] md:text-5xl">Tu precio final lo definís vos.</h2>
            </div>
            <div>
              <p className="text-base leading-relaxed text-neutral-300 md:text-lg">Cada proyecto se cotiza según lo que necesita. Te enviamos una propuesta con el alcance y el costo de nuestro trabajo para que puedas incluirlo en el presupuesto que le presentes a tu cliente.</p>
              <p className="mt-4 text-base leading-relaxed text-neutral-300 md:text-lg">Vos definís tu precio final y cómo lo integrás a tus servicios. Nosotros nos ocupamos de producir la invitación y de acompañar a quien vaya a usar Bento.</p>
              <AgencyContactCta location="agencias_comercial" className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[#ffa459] px-6 font-semibold text-neutral-950 transition-colors hover:bg-[#ff8a3d]">Hablemos de un evento <ArrowUpRight size={17} /></AgencyContactCta>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-neutral-950 py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center"><span className="mb-4 inline-block rounded-full border border-[#ffa459]/20 bg-[#ffa459]/10 px-3 py-1 text-xs font-semibold tracking-widest text-[#ffa459] uppercase">Preguntas frecuentes</span><h2 className="text-3xl font-bold tracking-tight md:text-5xl">Lo importante, sin vueltas</h2></div>
            {[
              { question: "¿Usan diseños existentes o hacen uno nuevo?", answer: "Las dos cosas. Podemos adaptar un diseño de Bento o crear uno específico si el evento lo necesita." },
              { question: "¿Qué necesitan para pasarme un presupuesto?", answer: "Contanos el tipo de evento, la cantidad aproximada de invitados, la identidad visual y qué debería hacer la invitación. Si todavía no tenés todo cerrado, podemos empezar por una conversación y terminar de definir el alcance juntos." },
              { question: "¿Puedo pedir una sección o un formulario especial?", answer: "Sí. Puede ser para pedir un dato a los invitados o sumar contenido propio del evento. Nos contás el objetivo y te decimos cómo podríamos resolverlo y si cambia el presupuesto." },
              { question: "¿Quién habla con mi cliente?", answer: "Vos llevás la propuesta y la relación comercial. Cuando hace falta explicar el uso de Bento o resolver dudas técnicas, podemos hablar directamente con la empresa para sacarte ese trabajo de encima." },
              { question: "¿Tengo que dar soporte a la empresa?", answer: "No. Nosotros le explicamos cómo usar Bento y respondemos las dudas sobre la herramienta. Vos seguís a cargo de la relación comercial." },
            ].map(({ question, answer }) => (
              <details key={question} className="group border-b border-neutral-800 py-5 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold text-white marker:hidden md:text-lg">{question}<span className="text-2xl font-normal leading-none text-[#ffa459] group-open:rotate-45">+</span></summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-neutral-950 py-24 md:py-32">
        <MeshGradient className="opacity-60" />
        <Container className="relative z-10 text-center">
          <span className="mb-5 inline-block rounded-full border border-[#ffa459]/20 bg-[#ffa459]/10 px-3 py-1 text-xs font-semibold tracking-widest text-[#ffa459] uppercase">Trabajemos juntos</span>
          <h2 className="font-display mx-auto max-w-4xl text-4xl leading-[1.1] md:text-6xl">Contanos qué necesita tu cliente</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">Mandanos el brief o contanos la idea, aunque todavía falten detalles. Te ayudamos a definir qué puede incluir la invitación y te preparamos una propuesta para ese cliente.</p>
          <AgencyContactCta location="agencias_final" className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-[#ffa459] px-7 font-semibold text-neutral-950 transition-colors hover:bg-[#ff8a3d]">Hablemos del evento <ArrowRight size={18} /></AgencyContactCta>
        </Container>
      </section>
    </main>
  );
}
