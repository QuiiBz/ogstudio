import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Splash } from "../components/Splash";
import { Providers } from "../components/Providers";
// import "@radix-ui/themes/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Splash>{children}</Splash>
        </Providers>
        <Toaster closeButton richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
