import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Providers } from "../components/Providers";
import "./globals.css";

export function generateMetadata(_: unknown, state: unknown): Metadata {
  const url = Object.getOwnPropertySymbols(state)
    // @ts-expect-error -- safe
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- safe
    .map((item) => state[item])
    // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unsafe-call, no-prototype-builtins, @typescript-eslint/no-unsafe-member-access -- safe
    .find((state) => state?.hasOwnProperty("url"))?.url?.pathname as string;

  return {
    title: "OG Studio - Free Open Graph images editor",
    description:
      "Create static or dynamic OG (Open Graph) images with an intuitive, Figma-like visual editor. Browse ready-to-use templates, and export your images to SVG/PNG or to a dynamic URL.",
    openGraph: {
      siteName: "OG Studio",
      images:
        "https://github.com/QuiiBz/ogstudio/blob/main/assets/builder.jpeg?raw=true",
      type: "website",
      url: `https://ogstudio.app${url}`,
    },
  };
}

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
