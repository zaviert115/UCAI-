'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Tutorial } from '@/types/tutorial'

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
    <section className="tut-section" id="tutorials">
      <div className="wrap">
        <div className="events-head">
          <div>
            <span className="section-eyebrow">Tutorials</span>
            <h2 className="section-title">Learn at your own pace.</h2>
          </div>
          {!teaser && (
            <div className="filter-row">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`chip${cat === c ? ' on' : ''}`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="tut-grid">
          {list.map((t) => (
            <Link href={`/tutorials/${t.slug}`} className="tut-card" key={t.slug}>
              <span className="tut-cat">{t.category}</span>
              <h3 className="tut-title">{t.title}</h3>
              <p className="tut-desc">{t.description}</p>
              <div className="tut-meta">
                <span>{t.author}</span>
                <span>{t.readTime} min read</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/tutorials" className="btn btn-outline">
            All tutorials →
          </Link>
        </div>
      </div>
    </section>
  )
}
