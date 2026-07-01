'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import PaperSection from '@/components/layout/PaperSection'
import SectionHeader from '@/components/layout/SectionHeader'
import type { Tutorial } from '@/types/tutorial'

function chipStyle(active: boolean): React.CSSProperties {
  return {
    fontSize: 12,
    padding: '7px 16px',
    cursor: 'pointer',
    background: active ? '#0B0B0F' : 'transparent',
    color: active ? '#F2EFE6' : '#0B0B0F',
    border: '1px solid #0B0B0F',
    letterSpacing: '0.04em',
    transition: 'background 0.2s ease, color 0.2s ease',
  }
}

export default function TutorialsSection({
  tutorials,
  teaser = false,
}: {
  tutorials: Tutorial[]
  teaser?: boolean
}) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(tutorials.map((t) => t.category)))],
    [tutorials]
  )
  const [cat, setCat] = useState('All')
  const list = teaser
    ? tutorials.slice(0, 3)
    : cat === 'All'
      ? tutorials
      : tutorials.filter((t) => t.category === cat)

  return (
    <PaperSection id="tutorials">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 48,
        }}
      >
        <SectionHeader
          index="04"
          eyebrow="Learn by doing"
          title="Tutorials, by members."
          tone="paper"
        />
        {!teaser && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }} className="mono">
            {categories.map((c) => (
              <button key={c} style={chipStyle(cat === c)} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 22,
        }}
      >
        {list.map((t) => (
          <Link
            href={`/tutorials/${t.slug}`}
            className="card-paper"
            key={t.slug}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: 28,
              textDecoration: 'none',
              color: 'inherit',
              height: '100%',
            }}
          >
            <span className="eyebrow" style={{ fontSize: 10, color: '#2B53FF' }}>
              {t.category}
            </span>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: '-0.02em',
                color: '#0B0B0F',
                margin: 0,
              }}
            >
              {t.title}
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(11,11,15,0.72)', margin: 0 }}>
              {t.description}
            </p>
            <div
              className="mono"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                fontSize: 12,
                color: 'rgba(11,11,15,0.6)',
                marginTop: 'auto',
                paddingTop: 8,
              }}
            >
              <span>{t.author}</span>
              <span>{t.readTime} min read</span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <Link href="/tutorials" className="btn btn--outline-ink">
          All tutorials →
        </Link>
      </div>
    </PaperSection>
  )
}
