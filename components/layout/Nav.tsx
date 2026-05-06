'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-navy-800 text-white sticky top-0 z-50 shadow-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-brand-cyan">UC AI</span>
            <span className="text-white/80 font-normal text-sm hidden sm:inline">Society</span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium"
            aria-label="Main navigation"
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={
                  pathname === href
                    ? 'text-brand-cyan'
                    : 'text-white/80 hover:text-white transition-colors'
                }
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#join"
              className="ml-2 rounded-md bg-brand-cyan px-4 py-1.5 text-navy-800 font-semibold hover:bg-brand-cyan-dark transition-colors"
            >
              Join Us
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-navy-700 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="md:hidden border-t border-white/10 bg-navy-800 px-4 pb-4 pt-2 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={
                pathname === href
                  ? 'rounded-md px-3 py-2 text-brand-cyan font-medium'
                  : 'rounded-md px-3 py-2 text-white/80 hover:bg-navy-700 hover:text-white transition-colors'
              }
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#join"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-brand-cyan px-3 py-2 text-center text-navy-800 font-semibold hover:bg-brand-cyan-dark transition-colors"
          >
            Join Us
          </Link>
        </nav>
      )}
    </header>
  )
}
