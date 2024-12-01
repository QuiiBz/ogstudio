import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Providers } from "../components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "OG Studio",
  description:
    "Create static or dynamic OG (Open Graph) images with an intuitive, Figma-like visual editor. Browse ready-to-use templates, and export your images to SVG/PNG or to a dynamic URL.",
  openGraph: {
    siteName: "OG Studio",
    images:
      "https://github.com/QuiiBz/ogstudio/blob/main/assets/builder.jpeg?raw=true",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster closeButton richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
