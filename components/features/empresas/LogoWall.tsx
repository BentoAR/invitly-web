import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";

export default async function LogoWall() {
  const t = await getTranslations("LogoWallB2B");
  const logos = t.raw("logos") as string[];

  return (
    <section className="relative bg-neutral-950 py-14 overflow-hidden">
      <p className="text-center text-xs font-semibold text-neutral-500 mb-10 uppercase tracking-[0.2em] relative z-10">
        {t("title")}
      </p>

      <Container>
        <div className="relative overflow-hidden" style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}>
          <div className="flex w-max gap-px animate-marquee-b2b">
            {[...logos, ...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-56 h-20 flex items-center justify-center px-6 border-r border-neutral-900/60 last:border-r-0 group cursor-pointer"
              >
                <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-neutral-400 group-hover:text-[#FFA459] transition-colors"
                  >
                    <path
                      d="M3 21V8L12 3L21 8V21H14V14H10V21H3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-neutral-400 group-hover:text-white whitespace-nowrap tracking-tight transition-colors">
                    {logo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
