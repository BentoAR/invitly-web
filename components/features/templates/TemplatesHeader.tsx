export function TemplatesHeader() {
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
        Catálogo · 2025
      </p>
      <h2
        className="font-display font-normal leading-[1.1]"
        style={{
          fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
          color: "#200041",
          letterSpacing: "-0.03em",
        }}
      >
        Invitaciones
        <br />
        <span style={{ color: "rgba(32,0,65,0.45)", fontStyle: "italic" }}>
          que enamoran.
        </span>
      </h2>
      <div
        className="mt-8 h-px w-16"
        style={{ backgroundColor: "#bc8129", opacity: 0.6 }}
      />
    </div>
  );
}
