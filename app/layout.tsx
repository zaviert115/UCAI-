import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NeuralBackground from '@/components/chrome/NeuralBackground'
import ScrollProgress from '@/components/chrome/ScrollProgress'
import CommandPalette from '@/components/chrome/CommandPalette'
import CursorFX from '@/components/chrome/CursorFX'
import CardTilt from '@/components/chrome/CardTilt'
import { buildSearchIndex } from '@/lib/search'
import { siteConfig } from '@/lib/site'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: '/',
    locale: 'en_NZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const searchIndex = await buildSearchIndex()
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NeuralBackground />
        <CursorFX />
        <CardTilt />
        <ScrollProgress />
        <Header />
        <main className="flex-1" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
        <CommandPalette index={searchIndex} />
        <Analytics />
      </body>
    </html>
  )
}
