import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Splash } from '../components/Splash'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* OgSplash uses `useSearchParams()` so we need to wrap it in a Suspense to allow to statically render the page
        https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions */}
        <Suspense>
          <Splash>
            {children}
          </Splash>
        </Suspense>
        <Toaster closeButton richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
