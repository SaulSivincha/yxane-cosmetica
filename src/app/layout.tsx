import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/providers/cart-provider";
import { SiteLayout } from "@/components/layout/SiteLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Yxane Cosmética Natural",
    template: "%s | Yxane",
  },
  description:
    "Catálogo de cosmética natural Yxane con jabones, aceites, sérums y mascarillas para una rutina pausada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <SiteLayout>{children}</SiteLayout>
        </CartProvider>
      </body>
    </html>
  );
}
