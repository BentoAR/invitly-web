import { ReactQueryProvider } from "@/components/shared/ReactQueryProvider";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";

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
    <html lang={locale}>
      <body className="antialiased">
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <Toaster />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
