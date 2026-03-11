import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import CartDrawer from "@/components/layout/CartDrawer";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marmitaria Marchado Fit | Comida Saudável e Prática",
  description: "Marmitas fitness preparadas com ingredientes frescos e selecionados para quem busca saúde, praticidade e qualidade no dia a dia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${jakartaSans.variable} antialiased selection:bg-primary/20 selection:text-primary`}>
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
