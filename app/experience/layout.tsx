import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tu experiencia con Bento",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ExperienceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
