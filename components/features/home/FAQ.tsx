"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "¿Los invitados necesitan descargarse algo?",
    answer: "No. El link se abre directamente en el navegador del celular — sin app, sin login, sin nada. Cualquier persona que reciba el link puede ver la invitación en el momento.",
  },
  {
    question: "¿Puedo editar la invitación después de enviarla?",
    answer: "Sí. Si cambió la fecha, el lugar, o querés agregar algo, lo editás desde tu panel y los que ya tienen el link ven la versión actualizada automáticamente. Sin reenviar nada.",
  },
  {
    question: "¿Cómo confirman mis invitados?",
    answer: "Con un toque. Abren el link, tocan 'Confirmo asistencia' y listo. Vos ves quién confirmó en tiempo real desde tu dashboard, sin tener que llamar ni preguntar a cada uno.",
  },
  {
    question: "¿Es complicado de configurar?",
    answer: "Para nada. La mayoría de nuestros usuarios tiene su invitación lista en menos de 10 minutos. Si podés escribir un mensaje de WhatsApp, podés crear tu invitación en Bento.",
  },
  {
    question: "¿Vale la pena si igual mando todo por WhatsApp?",
    answer: "Sí, la compartís por WhatsApp igual. La diferencia es que en lugar de una imagen que se pierde en el scroll, mandás un link que se abre como una experiencia premium. Y sabés quién confirmó sin preguntarle a cada uno.",
  },
  {
    question: "¿Sirve para eventos corporativos?",
    answer: "Sí. Tenemos planes para empresas con funcionalidades específicas para eventos corporativos, lanzamientos y reuniones. Contactanos para armar algo a medida.",
  },
];

function FAQRow({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border/60">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-foreground">{item.question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#bc8129" }}>
            Preguntas frecuentes
          </p>
          <h2
            className="font-display font-normal leading-[1.08]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#200041", letterSpacing: "-0.03em" }}
          >
            ¿Tenés dudas?
          </h2>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <div key={i}>
              <FAQRow item={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
