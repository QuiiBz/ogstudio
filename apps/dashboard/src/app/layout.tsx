import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
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
        <Splash>
          {children}
        </Splash>
        <Toaster closeButton richColors />
      </body>
    </html >
  )
}
