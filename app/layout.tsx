import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";
import "./coffeelovers.css";
import "./coffeelovers-next.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CoffeeLovers — Do grão à xícara",
  description:
    "Encontre a proporção de café e água para o seu método, conheça os grãos e prepare uma xícara do seu jeito.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body>
        <div id="coffee-next">
          <div className="cl-app">
            <SiteHeader />
            <main className="cl-content">{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
