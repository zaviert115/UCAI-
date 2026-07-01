'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'

const GITHUB = 'https://github.com/zaviert115/UCAI-'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

const links = [
  { href: '/events', label: 'Events' },
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function openCmd() {
  window.dispatchEvent(new Event('open-cmd'))
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const active = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        padding: '14px clamp(16px,4vw,46px)',
        backdropFilter: 'blur(16px) saturate(140%)',
        background: 'rgba(7,7,16,0.46)',
        borderBottom: '1px solid rgba(255,255,255,0.09)',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          className="mono"
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 34,
            height: 34,
            border: '1.5px solid rgba(255,255,255,0.65)',
            fontWeight: 700,
            fontSize: 13,
            color: '#F2EFE6',
            background: 'linear-gradient(135deg,rgba(0,224,204,0.5),rgba(43,83,255,0.55))',
          }}
        >
          AI
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            style={{ fontWeight: 700, fontSize: 17, letterSpacing: '0.02em', color: '#F2EFE6' }}
          >
            UC·AI
          </span>
          <span
            className="mono"
            style={{
              fontSize: 8.5,
              letterSpacing: '0.18em',
              color: 'rgba(242,239,230,0.5)',
              marginTop: 3,
            }}
          >
            CANTERBURY
          </span>
        </span>
      </Link>

      <nav
        aria-label="Main navigation"
        style={{ display: 'flex', alignItems: 'center', gap: 2 }}
        className="hidden md:flex"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="mono"
            style={{
              position: 'relative',
              whiteSpace: 'nowrap',
              padding: '9px 13px',
              fontSize: 12,
              letterSpacing: '0.06em',
              color: '#F2EFE6',
            }}
          >
            {label}
            {active(href) && (
              <span
                style={{
                  position: 'absolute',
                  left: 13,
                  right: 13,
                  bottom: 3,
                  height: 2,
                  background: 'linear-gradient(90deg,#2B53FF,#00E0CC)',
                }}
              />
            )}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={openCmd}
          aria-label="Ask UC·AI"
          className="mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            padding: '9px 13px',
            border: '1.5px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.04)',
            fontSize: 12,
            letterSpacing: '0.03em',
            color: '#F2EFE6',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          <Search size={14} aria-hidden="true" />
          <span className="hidden sm:inline">Ask UC·AI</span>
          <span
            style={{
              padding: '2px 6px',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: 10,
              color: 'rgba(242,239,230,0.6)',
            }}
          >
            ⌘K
          </span>
        </button>

        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="mono hidden md:inline-flex"
          style={{
            alignItems: 'center',
            gap: 8,
            padding: '9px 13px',
            border: '1.5px solid rgba(255,255,255,0.28)',
            fontSize: 12,
            letterSpacing: '0.04em',
            color: '#F2EFE6',
            whiteSpace: 'nowrap',
          }}
        >
          <GithubIcon size={15} />
          GitHub
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden"
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 38,
            height: 38,
            color: '#F2EFE6',
            cursor: 'pointer',
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: '10px 16px 16px',
            background: 'rgba(7,7,16,0.97)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.09)',
          }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="mono"
              style={{
                padding: '11px 8px',
                fontSize: 13,
                letterSpacing: '0.05em',
                color: active(href) ? '#00E0CC' : '#F2EFE6',
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{ padding: '11px 8px', fontSize: 13, letterSpacing: '0.05em', color: '#F2EFE6' }}
          >
            GitHub ↗
          </a>
        </nav>
      )}
    </header>
  )
}
