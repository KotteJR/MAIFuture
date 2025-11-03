import type { Metadata } from 'next'
import { Montserrat, Montserrat as MontserratFont } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const montserrat = MontserratFont({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maifuture.com'),
  title: {
    default: 'MAI Future — AI‑powered Lung Cancer Screening',
    template: '%s | MAI Future',
  },
  description:
    'AI‑enabled imaging platform supporting CT scan analysis and early lung cancer screening for North Macedonia healthcare.',
  keywords: [
    'MAI Future',
    'lung cancer screening',
    'early detection',
    'AI-enabled imaging',
    'CT scan analysis',
    'North Macedonia healthcare',
    'medical screening platform',
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.maifuture.com/',
    title: 'MAI Future — AI‑powered Lung Cancer Screening',
    description:
      'Clinically robust, operationally scalable AI‑assisted lung cancer screening in North Macedonia.',
    images: [
      {
        url: '/logos/logo.png',
        width: 1200,
        height: 630,
        alt: 'MAI Future',
      },
    ],
    siteName: 'MAI Future',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAI Future — AI‑powered Lung Cancer Screening',
    description:
      'Clinically robust, operationally scalable AI‑assisted lung cancer screening in North Macedonia.',
    images: ['/logos/logo.png'],
  },
  alternates: {
    canonical: 'https://www.maifuture.com/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/logo.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* JSON-LD: Organization */}
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'MAI Future',
            url: 'https://www.maifuture.com/',
            logo: 'https://www.maifuture.com/logos/logo.png',
            sameAs: [],
          })}
        </Script>
        {/* JSON-LD: MedicalOrganization */}
        <Script id="ld-medical-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalOrganization',
            name: 'MAI Future',
            url: 'https://www.maifuture.com/',
            logo: 'https://www.maifuture.com/logos/logo.png',
            medicalSpecialty: ['Oncologic', 'Radiography'],
            areaServed: 'North Macedonia',
          })}
        </Script>
        {/* JSON-LD: WebSite with SearchAction */}
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'MAI Future',
            url: 'https://www.maifuture.com/',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.google.com/search?q=site:maifuture.com+{search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          })}
        </Script>
        {/* JSON-LD: SoftwareApplication (medical screening platform) */}
        <Script id="ld-software" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'MAI Future Screening Platform',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            description:
              'AI-enabled imaging platform supporting CT scan analysis and lung cancer screening workflows for North Macedonia healthcare.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            url: 'https://www.maifuture.com/',
            publisher: { '@type': 'Organization', name: 'MAI Future' },
          })}
        </Script>
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
