import { Cormorant_Garamond, Manrope, Oswald } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "ITZ FIZZ — Sparkling Citrus",
  description:
    "A scroll-driven hero for ITZ FIZZ, a fictional sparkling citrus beverage.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${oswald.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-fizz-void text-fizz-cream">
        {children}
      </body>
    </html>
  );
}
