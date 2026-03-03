import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Agents Platform - Orquestación de AI",
  description:
    "Plataforma para orquestar y gestionar agentes de inteligencia artificial",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}  `}
      >
        <QueryProvider>{children}</QueryProvider>
        {/* <Analytics /> */}
        <Toaster richColors />
      </body>
    </html>
  );
}
