import { ReactQueryProvider } from "@/components/shared/ReactQueryProvider";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
});

export const metadata = {
  title: "Bento",
  description:
    "Crea invitaciones digitales personalizadas para cualquier evento. Elige tu categoría y sorprende a tus invitados con diseños exclusivos.",
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        <GoogleAnalytics />
        <MicrosoftClarity />
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <Toaster />
            <Navbar />
            <SmoothScroll>
              <main>{children}</main>
            </SmoothScroll>
            <Footer />
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
