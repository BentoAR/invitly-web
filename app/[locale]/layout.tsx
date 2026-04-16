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
import { siteConfig } from "@/src/utils/metadata";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description =
    locale === "es" ? siteConfig.description.es : siteConfig.description.en;
  const keywords =
    locale === "es" ? siteConfig.keywords.es : siteConfig.keywords.en;

  return {
    title: {
      default: "Bento",
      template: "%s | Bento",
    },
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Bento", url: siteConfig.url }],
    creator: "Bento",
    publisher: "Bento",
    metadataBase: new URL(siteConfig.url),
    icons: {
      icon: "https://d14sb9d2krfjkl.cloudfront.net/media/LogoFavicon.svg",
      apple: "https://d14sb9d2krfjkl.cloudfront.net/media/LogoFavicon.svg",
    },
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      url: siteConfig.url,
      siteName: "Bento",
      title: "Bento - Invitaciones Digitales Profesionales",
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: "Bento - Invitaciones Digitales",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bento - Invitaciones Digitales",
      description,
      images: [siteConfig.ogImage],
      creator: "@bentoinvitaciones",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
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
