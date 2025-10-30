import type { Metadata } from 'next'
import { Montserrat, Montserrat as MontserratFont } from 'next/font/google'
import './globals.css'

const montserrat = MontserratFont({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Mai Future',
  description: 'A Next.js application for the future',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
