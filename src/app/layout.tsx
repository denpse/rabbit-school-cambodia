import type { Metadata, Viewport } from "next";
// import banner from '../../public/images/thumnailOpenGraph.png'
import Footer from "@/components/ui/footer";
import { NextIntlClientProvider } from "next-intl";

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/ui/header";

const bebasNeue = localFont({
  src: "../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
});

const arial = localFont({
  src: "../app/fonts/Arial.ttf",
  variable: "--font-arial",
});

const playfair = localFont({
  src: "../app/fonts/PlayfairDisplay-Italic.ttf",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Rabbit School Organization",
  description: `The Rabbit School is a Cambodian NGO that began in May 1997 as a pilot project to provide education
  to children with special needs at the Nutrition Centre— a government- run orphanage in Phnom Penh originally established for
  children aged 0-6 who had been abandoned or lost their families during the Khmer Rouge regime(1975-1979).In offering education
  to this extremely disadvantaged group, The Rabbit School laid the foundation for Cambodia's first formal educational programs for
  children with disabilities.`,
  openGraph: {
    title: "Rabbit School Organization",
    description: `The Rabbit School is a Cambodian NGO ...`,
    images: [
      {
        url: "/images/thumnailOpenGraph.png",
        width: 1200,
        height: 630,
        alt: "Rabbit School Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabbit School Organization",
    description: `The Rabbit School is a Cambodian NGO ...`,
    images: ["/images/thumnailOpenGraph.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure that the incoming `locale` is valid

  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${arial.variable} ${playfair.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
