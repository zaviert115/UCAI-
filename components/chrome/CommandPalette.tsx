'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, CornerDownLeft } from 'lucide-react'
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
    const i = item.key.indexOf(query)
    if (i === -1) continue
    let score = i
    if (item.key.startsWith(query) || item.label.toLowerCase().startsWith(query)) score -= 6
    scored.push({ item, score })
  }
  scored.sort((a, b) => a.score - b.score)
  return scored.slice(0, 8).map((s) => s.item)
}

export default function CommandPalette({ index }: { index: SearchIndex }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [aiActive, setAiActive] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiAnswer, setAiAnswer] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => rank(index.items, query), [index.items, query])
  const hasQuery = query.trim().length > 0

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setAiActive(false)
    setAiAnswer('')
    setAiLoading(false)
  }, [])

  // ⌘K / Ctrl+K toggle, Esc close, plus header "open-cmd" event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-cmd', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-cmd', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  const go = (href: string) => {
    close()
    router.push(href)
  }

  const runAI = async () => {
    const q = query.trim()
    if (!q) return
    setAiActive(true)
    setAiLoading(true)
    setAiAnswer('')
    try {
      const res = await fetch('/api/ai-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q.slice(0, 500), context: index.aiContext }),
      })
      const data = await res.json()
      setAiAnswer(data.answer ?? data.error ?? 'Sorry, something went wrong.')
    } catch {
      setAiAnswer('// the model is napping. try again in a sec.')
    } finally {
      setAiLoading(false)
    }
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (results.length > 0 && !hasQuery) return
      if (results.length > 0) go(results[0].href)
      else runAI()
    }
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
        onClick={(e) => e.stopPropagation()}
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search events, tutorials, projects — or ask a question"
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
          {hasQuery && (
            <button
              onClick={runAI}
              style={{
                display: 'flex',
                width: '100%',
                textAlign: 'left',
                alignItems: 'center',
                gap: 13,
                padding: '15px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 30,
                  height: 30,
                  background: 'linear-gradient(135deg,#00E0CC,#7A2BFF)',
                  color: '#06060e',
                  fontWeight: 700,
                  flex: 'none',
                }}
              >
                ✶
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
                  Ask UC·AI — “{query}”
                </span>
                <span
                  className="mono"
                  style={{
                    display: 'block',
                    fontSize: 11,
                    color: 'rgba(242,239,230,0.5)',
                    marginTop: 3,
                  }}
                >
                  Generate an answer about the club
                </span>
              </span>
              <CornerDownLeft size={16} color="#00E0CC" />
            </button>
          )}

          {aiActive && (
            <div
              style={{
                padding: '18px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(0,224,204,0.04)',
              }}
            >
              <div
                className="mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 10.5,
                  letterSpacing: '0.14em',
                  color: '#00E0CC',
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#00E0CC',
                    animation: 'dotpulse 1s infinite',
                  }}
                />
                UC·AI ASSISTANT
              </div>
              {aiLoading ? (
                <div className="mono" style={{ fontSize: 13, color: 'rgba(242,239,230,0.6)' }}>
                  Thinking…
                </div>
              ) : (
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: '#F2EFE6',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {aiAnswer}
                </div>
              )}
            </div>
          )}

          {hasQuery &&
            results.map((r) => (
              <button
                key={`${r.kind}-${r.href}-${r.label}`}
                onClick={() => go(r.href)}
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
                    background: TINT[r.kind],
                  }}
                >
                  {BADGE[r.kind]}
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
                    {r.label}
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
                    {r.sub}
                  </span>
                </span>
              </button>
            ))}

          {hasQuery && results.length === 0 && !aiActive && (
            <div
              className="mono"
              style={{ padding: '20px', fontSize: 13, color: 'rgba(242,239,230,0.5)' }}
            >
              No matches — press ↵ to ask UC·AI instead.
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
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setQuery(s)
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
                    {s}
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
