'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/events', label: 'Events' },
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="site-nav">
      <div className="wrap site-nav-inner">
        <Link href="/" className="brand">
          <Image
            src="/uc-ai-logo.png"
            alt="UC AI Society"
            width={36}
            height={36}
            className="brand-logo"
          />
          <div>
            <div className="brand-text">UC AI Society</div>
            <div className="brand-tag">University of Canterbury</div>
          </div>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={pathname.startsWith(href) ? 'active' : ''}>
              {label}
            </Link>
          ))}
          <Link href="/#join" className="nav-cta">
            Join →
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-md text-navy-700 hover:text-navy-900 transition-colors"
          style={{ display: 'none' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t px-8 pb-4 pt-2 flex flex-col gap-1"
          style={{ borderColor: 'var(--brand-border)', background: 'rgba(255,255,255,0.95)' }}
          aria-label="Mobile navigation"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 14,
                color: pathname.startsWith(href) ? 'var(--cyan-dark)' : 'var(--navy-700)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#join"
            onClick={() => setOpen(false)}
            className="nav-cta"
            style={{ marginTop: 8, textAlign: 'center' }}
          >
            Join →
          </Link>
        </nav>
      )}
    </header>
  )
}
