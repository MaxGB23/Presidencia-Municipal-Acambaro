import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/app/providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL ||
      "https://https://presidencia-municipal-acambaro.vercel.app"
  ),
  title: {
    default: "Apoyos – Presidencia Municipal de Acámbaro",
    template: "%s | Apoyos",
  },
  description:
    "Sistema de apoyos de la Presidencia Municipal de Acámbaro. Accede a los beneficios y programas disponibles.",
  keywords: [
    "Acámbaro",
    "apoyos",
    "programas sociales",
    "presidencia municipal",
  ],
  applicationName: "Apoyos",
  authors: [{ name: "Presidencia Municipal de Acámbaro" }],
  creator: "Presidencia Municipal de Acámbaro",
  publisher: "Presidencia Municipal de Acámbaro",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://https://presidencia-municipal-acambaro.vercel.app",
    title: "Apoyos – Presidencia Municipal de Acámbaro",
    description:
      "Accede a los programas y apoyos sociales disponibles en la Presidencia Municipal de Acámbaro.",
    siteName: "Apoyos",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apoyos Acámbaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apoyos – Presidencia Municipal de Acámbaro",
    description:
      "Plataforma de programas y apoyos sociales de la Presidencia Municipal de Acámbaro.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://https://presidencia-municipal-acambaro.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
