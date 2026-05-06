import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page not found',
}

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center px-4 py-24">
      <p className="text-brand-cyan font-bold tracking-widest uppercase text-sm mb-4">404</p>
      <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-4">Page not found</h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        This page doesn&apos;t exist — or it may have moved. Try heading back home.
      </p>
      <Link
        href="/"
        className="rounded-md bg-navy-800 px-6 py-3 text-white font-semibold hover:bg-navy-700 transition-colors"
      >
        Back to home
      </Link>
    </section>
  )
}
