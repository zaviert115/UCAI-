const stats = [
  { num: '412', label: 'Members', sub: 'and growing' },
  { num: '24', label: 'Events / year', sub: 'workshops, panels, socials' },
  { num: '38', label: 'Tutorials', sub: 'written by members' },
  { num: '6', label: 'Industry partners', sub: 'and counting' },
]

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="wrap">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
