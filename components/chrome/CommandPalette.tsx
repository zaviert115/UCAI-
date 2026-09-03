'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import type { SearchIndex, SearchItem, SearchKind } from '@/lib/search'

const TINT: Record<SearchKind, string> = {
  event: '#00E0CC',
  tutorial: '#4F9DFF',
  project: '#7A2BFF',
  page: '#5BE0B0',
}

const BADGE: Record<SearchKind, string> = {
  event: 'EV',
  tutorial: 'TU',
  project: 'PR',
  page: 'PG',
}

const SUGGESTIONS = ['Upcoming events', 'How to join', 'Prompt engineering', 'Hackathon']

function rank(items: SearchItem[], q: string): SearchItem[] {
  const query = q.trim().toLowerCase()
  if (!query) return []

  const scored: { item: SearchItem; score: number }[] = []
  for (const item of items) {
    const index = item.key.indexOf(query)
    if (index === -1) continue

    let score = index
    if (item.key.startsWith(query) || item.label.toLowerCase().startsWith(query)) score -= 6
    scored.push({ item, score })
  }

  scored.sort((a, b) => a.score - b.score)
  return scored.slice(0, 8).map(({ item }) => item)
}

export default function CommandPalette({ index }: { index: SearchIndex }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => rank(index.items, query), [index.items, query])
  const hasQuery = query.trim().length > 0

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      } else if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)

    window.addEventListener('keydown', onKey)
    window.addEventListener('open-search', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-search', onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => inputRef.current?.focus(), 30)
    return () => clearTimeout(timer)
  }, [open])

  const go = (href: string) => {
    close()
    router.push(href)
  }

  if (!open) return null

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(4,4,12,0.72)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '13vh 20px 20px',
        animation: 'cmdFade .2s ease both',
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search UC AI Society"
        style={{
          width: 'min(680px,94vw)',
          background: 'rgba(12,12,22,0.97)',
          border: '1px solid rgba(255,255,255,0.16)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.6)',
          animation: 'cmdPop .28s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '17px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Search size={18} color="#00E0CC" aria-hidden="true" />
          <input
            ref={inputRef}
            aria-label="Search the UC AI Society website"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && results[0]) {
                event.preventDefault()
                go(results[0].href)
              }
            }}
            placeholder="Search events, tutorials, projects, and pages"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#F2EFE6',
              fontSize: 18,
              fontFamily: 'var(--font-space-grotesk), sans-serif',
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 10,
              color: 'rgba(242,239,230,0.4)',
              border: '1px solid rgba(255,255,255,0.16)',
              padding: '3px 7px',
            }}
          >
            ESC
          </span>
        </div>

        <div style={{ maxHeight: '54vh', overflowY: 'auto' }}>
          {hasQuery &&
            results.map((result) => (
              <button
                key={`${result.kind}-${result.href}-${result.label}`}
                onClick={() => go(result.href)}
                style={{
                  display: 'flex',
                  width: '100%',
                  textAlign: 'left',
                  alignItems: 'center',
                  gap: 13,
                  padding: '13px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                }}
              >
                <span
                  className="mono"
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 30,
                    height: 30,
                    flex: 'none',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#06060e',
                    background: TINT[result.kind],
                  }}
                >
                  {BADGE[result.kind]}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 15,
                      color: '#F2EFE6',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {result.label}
                  </span>
                  <span
                    className="mono"
                    style={{
                      display: 'block',
                      fontSize: 11,
                      color: 'rgba(242,239,230,0.5)',
                      marginTop: 2,
                    }}
                  >
                    {result.sub}
                  </span>
                </span>
              </button>
            ))}

          {hasQuery && results.length === 0 && (
            <div
              className="mono"
              style={{ padding: '20px', fontSize: 13, color: 'rgba(242,239,230,0.5)' }}
            >
              No matching pages or content.
            </div>
          )}

          {!hasQuery && (
            <div style={{ padding: '18px 20px' }}>
              <div
                className="mono"
                style={{
                  fontSize: 10.5,
                  letterSpacing: '0.14em',
                  color: 'rgba(242,239,230,0.4)',
                  marginBottom: 12,
                }}
              >
                TRY
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion)
                      setTimeout(() => inputRef.current?.focus(), 0)
                    }}
                    style={{
                      padding: '7px 12px',
                      border: '1px solid rgba(255,255,255,0.16)',
                      color: 'rgba(242,239,230,0.8)',
                      fontSize: 12.5,
                      cursor: 'pointer',
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
