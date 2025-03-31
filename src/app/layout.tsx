import { Playfair_Display, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";

import { DynamicMetadataTitle } from "@/components/DynamicTitle";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata = {
  title: "Jaqueline & Arodi",
  description: "Descripción del sitio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      style={{
        overflowX: "hidden",
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
      }}
    >
      <head>
        <title>Jaqueline & Arodi</title>
        <meta name="description" content="Descripción del sitio" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 36 36%22><text y=%2232%22 font-size=%2232%22>💍</text></svg>"
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${geistMono.variable} ${geistSans.variable} antialiased bg-gray-200`}
      >
        <DynamicMetadataTitle />{" "}
        {/* Component to dynamically update the title */}
        {children}
      </body>
    </html>
  );
}
