import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soumya Vatsa — Fashion Communication Portfolio",
  description:
    "Design-focused portfolio for Soumya Vatsa, Fashion Communication at NIFT Chennai.",
  metadataBase: new URL("https://soumya-portfolio.vercel.app"),
  openGraph: {
    title: "Soumya Vatsa — Fashion Communication Portfolio",
    description:
      "Explorations in graphic design, photography, trend analysis, visual merchandising, branding, and print/pattern.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
