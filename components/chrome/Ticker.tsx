interface TickerProps {
  items: string[]
}

/** Seamless marquee strip (two copies translate -50%). CSS-only animation. */
export default function Ticker({ items }: TickerProps) {
  const line = items.map((t) => `◆ ${t}`).join('   ')
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <span
          className="mono"
          style={{
            fontSize: 12.5,
            letterSpacing: '0.12em',
            color: 'rgba(242,239,230,0.55)',
            textTransform: 'uppercase',
            paddingRight: 24,
            whiteSpace: 'nowrap',
          }}
        >
          {line}
        </span>
        <span
          className="mono"
          style={{
            fontSize: 12.5,
            letterSpacing: '0.12em',
            color: 'rgba(242,239,230,0.55)',
            textTransform: 'uppercase',
            paddingRight: 24,
            whiteSpace: 'nowrap',
          }}
        >
          {line}
        </span>
      </div>
    </div>
  )
}
