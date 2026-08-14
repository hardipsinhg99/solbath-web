import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SelectionProvider } from "@/components/selection-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ThemeProvider } from "@/components/theme-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SolBath — Bathroom Accessories, Ceramic Tiles & Hardware",
    template: "%s | SolBath",
  },
  description:
    "Premium bathroom accessories, ceramic tiles and hardware. Browse the catalog, get inspired, and request a quote.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SelectionProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </SelectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
