import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import clsx from "clsx";
import LayoutContact from "@/components/LayoutContact";
import LayoutFooter from "@/components/LayoutFooter";
import Navigation from "@/components/Navigation";
import { SITE_URL } from "@/lib/metadata";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const montserrat = Montserrat({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "apple-mobile-web-app-title": "www.salsera-cubana.be",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={clsx(bebasNeue.variable, montserrat.variable)}>
      <body className="font-sans flex flex-col min-h-svh bg-background text-foreground">
        <Navigation />
        {children}
        <LayoutContact />
        <LayoutFooter />
      </body>
    </html>
  );
}
