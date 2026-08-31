"use client";

import { ArrowLeft, Check, CircleAlert, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import api from "@/utils/api";

type Option = { value: string; label: string };
type Question = {
  id: string;
  type: string;
  label: string;
  help_text: string | null;
  required: boolean;
  config: Record<string, unknown>;
};
type Payload = {
  status: "ready" | "responded";
  event: { title: string };
  survey: {
    title: string;
    description: string | null;
    thankYouMessage: string | null;
    questions: Question[];
  };
};
const field =
  "min-h-14 rounded-xl border border-[#d9cec3] px-4 text-left text-base font-medium text-[#211d19] transition-colors hover:border-[#bc8129] aria-pressed:border-[#bc8129] aria-pressed:bg-[#fff0df] focus-visible:outline-3 focus-visible:outline-[#ffa459]/55 focus-visible:outline-offset-3";

function options(question: Question): Option[] {
  const raw = question.config.options ?? [];
  return Array.isArray(raw)
    ? raw.map((option) =>
        typeof option === "string"
          ? { value: option, label: option }
          : (option as Option),
      )
    : [];
}
function Input({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const list = options(question);
  if (["nps", "rating", "scale"].includes(question.type)) {
    const min = Number(
      question.config.min ?? (question.type === "nps" ? 0 : 1),
    );
    const max = Number(
      question.config.max ?? (question.type === "nps" ? 10 : 5),
    );
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(42px,1fr))] gap-2">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
          <button
            className={`${field} px-0 text-center`}
            key={n}
            type="button"
            aria-pressed={value === n}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
    );
  }
  if (["multi_choice", "multiple_choice"].includes(question.type))
    return (
      <div className="grid gap-2.5">
        {list.map((option) => {
          const selected = Array.isArray(value) && value.includes(option.value);
          return (
            <button
              className={`flex items-center gap-3 ${field}`}
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() =>
                onChange(
                  selected
                    ? (value as string[]).filter(
                        (item) => item !== option.value,
                      )
                    : [...(Array.isArray(value) ? value : []), option.value],
                )
              }
            >
              <span className="grid size-5 place-items-center rounded-full border border-[#b9aca0]">
                {selected && <Check size={15} />}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    );
  if (question.type === "boolean")
    list.push(
      { value: "true", label: String(question.config.true_label ?? "Sí") },
      { value: "false", label: String(question.config.false_label ?? "No") },
    );
  if (["single_choice", "boolean"].includes(question.type))
    return (
      <div className="grid gap-2.5">
        {list.map((option) => {
          const optionValue =
            question.type === "boolean"
              ? option.value === "true"
              : option.value;
          return (
            <button
              className={`flex items-center gap-3 ${field}`}
              key={option.value}
              type="button"
              aria-pressed={value === optionValue}
              onClick={() => onChange(optionValue)}
            >
              <span className="grid size-5 place-items-center rounded-full border border-[#b9aca0]">
                {value === optionValue && <Check size={15} />}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    );
  return (
    <textarea
      autoFocus
      className="w-full resize-y rounded-xl border border-[#cfc2b6] bg-[#fffdfb] p-4 text-base leading-6 text-[#211d19] placeholder:text-[#8a7e74] focus:outline-3 focus:outline-[#ffa459]/55 focus:outline-offset-3"
      rows={5}
      value={String(value ?? "")}
      placeholder={String(
        question.config.placeholder ?? "Escribí lo que quieras compartir",
      )}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default function ExperienceSurvey({ token }: { token: string }) {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [index, setIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    api
      .get<Payload>(`/surveys/public/experience/${encodeURIComponent(token)}`)
      .then(({ data }) => {
        setData(data);
        setDone(data.status === "responded");
      })
      .catch((e) =>
        setError(
          e.response?.status === 410
            ? "Este enlace venció o la encuesta ya no está disponible."
            : "No pudimos encontrar esta encuesta.",
        ),
      );
  }, [token]);
  const question = data?.survey.questions[index];
  const complete = useMemo(
    () =>
      !question?.required ||
      (Array.isArray(answers[question.id])
        ? answers[question.id].length > 0
        : answers[question.id] !== undefined && answers[question.id] !== ""),
    [answers, question],
  );
  const submit = async () => {
    if (!data) return;
    setSubmitting(true);
    try {
      await api.post(
        `/surveys/public/experience/${encodeURIComponent(token)}/responses`,
        {
          answers: Object.entries(answers).map(([question_id, value]) => ({
            question_id,
            value,
          })),
        },
      );
      setDone(true);
    } catch {
      setError("No pudimos enviar tu respuesta. Intentá nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };
  if (error)
    return (
      <State
        icon={<CircleAlert />}
        title="Algo no salió como esperábamos"
        detail={error}
      />
    );
  if (!data)
    return (
      <State
        icon={<LoaderCircle className="animate-spin" />}
        title="Estamos preparando tu encuesta"
        detail="Un momento, por favor."
      />
    );
  if (done)
    return (
      <State
        icon={<Check />}
        title="Gracias por compartir tu experiencia"
        detail={
          data.survey.thankYouMessage ||
          "Tus respuestas nos ayudan a mejorar cada celebración."
        }
      />
    );
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-[#f6f3ef] text-[#211d19] isolate sm:px-6">
      <div className="pointer-events-none absolute -left-[14%] -top-[22%] -z-10 aspect-square w-[min(44vw,620px)] rounded-full bg-[#ffd6b0]" />
      <div className="pointer-events-none absolute -bottom-[20%] -right-[10%] -z-10 aspect-square w-[min(32vw,440px)] rounded-full bg-[#f6be82]" />
      <div className="flex min-h-svh w-full max-w-[620px] flex-col bg-[#fffaf5] px-6 py-7 sm:min-h-[min(680px,calc(100svh-48px))] sm:rounded-2xl sm:border sm:border-[#211d19]/13 sm:px-13 sm:py-13 sm:shadow-[0_20px_50px_rgba(64,44,27,.11)]">
        <header className="flex items-baseline justify-between gap-5">
          <Image
            src="https://d14sb9d2krfjkl.cloudfront.net/media/Frame+14+(1).svg"
            alt="Bento"
            width={81}
            height={32}
            priority
          />
          <p className="max-w-[150px] text-right text-[13px] text-[#665c53] sm:max-w-[230px]">
            {data.event.title}
          </p>
        </header>
        <div className="mt-9 h-0.75 overflow-hidden rounded-full bg-[#eee6dd]">
          <i
            className="block h-full rounded-full bg-[#ffa459] transition-[width] duration-400"
            style={{
              width: `${((index + 1) / data.survey.questions.length) * 100}%`,
            }}
          />
        </div>
        <section
          className="flex flex-1 flex-col justify-center animate-in fade-in slide-in-from-bottom-2 duration-300"
          key={question?.id}
        >
          <p className="mb-4 text-[13px] text-[#8a7e74] tabular-nums">
            {index + 1} / {data.survey.questions.length}
          </p>
          <h1 className="font-display text-balance text-[clamp(31px,6vw,45px)] leading-[1.09] font-bold tracking-[-.035em]">
            {question?.label}
          </h1>
          {question?.help_text && (
            <p className="mb-7 mt-3.5 text-base leading-relaxed text-[#665c53]">
              {question.help_text}
            </p>
          )}
          {question && (
            <Input
              question={question}
              value={answers[question.id]}
              onChange={(value) =>
                setAnswers((previous) => ({
                  ...previous,
                  [question.id]: value,
                }))
              }
            />
          )}
        </section>
        <footer className="flex items-center justify-between pt-6">
          {index > 0 ? (
            <button
              className="flex items-center gap-1.5 py-2.5 text-[15px] font-medium text-[#665c53]"
              type="button"
              onClick={() => setIndex(index - 1)}
            >
              <ArrowLeft size={17} /> Atrás
            </button>
          ) : (
            <span />
          )}
          {index === data.survey.questions.length - 1 ? (
            <button
              className="min-h-[52px] rounded-xl bg-[#ffa459] px-[22px] text-[15px] font-bold text-[#211d19] hover:bg-[#f29443] disabled:opacity-40"
              type="button"
              disabled={!complete || submitting}
              onClick={submit}
            >
              {submitting ? "Enviando…" : "Enviar respuesta"}
            </button>
          ) : (
            <button
              className="min-h-[52px] rounded-xl bg-[#ffa459] px-[22px] text-[15px] font-bold text-[#211d19] hover:bg-[#f29443] disabled:opacity-40"
              type="button"
              disabled={!complete}
              onClick={() => setIndex(index + 1)}
            >
              Continuar
            </button>
          )}
        </footer>
      </div>
    </main>
  );
}

function State({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <main className="grid min-h-svh place-items-center bg-[#f6f3ef] px-6 text-center text-[#211d19]">
      <section className="max-w-117.5">
        <span className="mx-auto mb-6 grid size-12 place-items-center rounded-full bg-[#ffe2c2]">
          {icon}
        </span>
        <h1 className="font-display text-[clamp(31px,6vw,45px)] font-bold tracking-[-.035em]">
          {title}
        </h1>
        <p className="mt-3.5 text-base leading-relaxed text-[#665c53]">
          {detail}
        </p>
        <b className="font-display text-[26px] tracking-[-.04em]">bento</b>
      </section>
    </main>
  );
}
