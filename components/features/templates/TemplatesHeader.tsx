type TemplatesHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
  headingLevel?: "h1" | "h2";
  fullWidthDescription?: boolean;
};

export function TemplatesHeader({
  title,
  description,
  eyebrow = "Catálogo · 2026",
  headingLevel = "h1",
  fullWidthDescription = false,
}: TemplatesHeaderProps) {
  const Heading = headingLevel;

  return (
    <div className="mb-12 md:mb-16">
      <p
        className="font-mono uppercase mb-4"
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "#bc8129",
        }}
      >
        {eyebrow}
      </p>
      <Heading
        className="font-display font-normal leading-[1.1]"
        style={{
          fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
          color: "#200041",
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </Heading>
      <p
        className={`mt-4 text-base md:text-lg ${
          fullWidthDescription ? "" : "max-w-2xl"
        }`}
        style={{ color: "rgba(32,0,65,0.7)" }}
      >
        {description}
      </p>
      <div
        className="mt-8 h-px w-16"
        style={{ backgroundColor: "#bc8129", opacity: 0.6 }}
      />
    </div>
  );
}
