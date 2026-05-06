import Image from 'next/image'

interface Sponsor {
  name: string
  logo?: string // path relative to /public, e.g. '/sponsors/uc-logo.png'
  url?: string
}

const sponsors: {
  platinum: Sponsor[]
  gold: Sponsor[]
  community: Sponsor[]
  poweredBy: Sponsor[]
} = {
  platinum: [
    {
      name: 'University of Canterbury',
      logo: '/sponsors/uc.jpg',
      url: 'https://www.canterbury.ac.nz',
    },
    {
      name: 'UC Engineering Pūhanga',
      logo: '/sponsors/uc-engineering.png',
      url: 'https://www.canterbury.ac.nz/engineering',
    },
  ],
  gold: [],
  community: [],
  poweredBy: [
    { name: 'Claude', logo: '/sponsors/claude.png', url: 'https://claude.ai' },
    { name: 'OpenAI', logo: '/sponsors/openai.png', url: 'https://openai.com' },
    { name: 'Gemini', logo: '/sponsors/gemini.png', url: 'https://gemini.google.com' },
  ],
}

function SponsorTile({
  sponsor,
  large = false,
  keepColor = false,
}: {
  sponsor: Sponsor
  large?: boolean
  keepColor?: boolean
}) {
  const inner = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={large ? 180 : 140}
      height={large ? 60 : 48}
      style={{
        objectFit: 'contain',
        filter: keepColor ? 'none' : 'grayscale(1)',
        transition: 'filter 0.2s',
      }}
      className={keepColor ? undefined : 'sponsor-logo-img'}
    />
  ) : (
    <span>{sponsor.name}</span>
  )

  return (
    <div className="sponsor" style={{ minHeight: large ? 110 : 90, fontSize: large ? 17 : 15 }}>
      {sponsor.url ? (
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  )
}

export default function SponsorsSection() {
  return (
    <section className="sponsors-section" id="sponsors">
      <style>{`
        .sponsor-logo-img { transition: filter 0.2s; }
        .sponsor:hover .sponsor-logo-img { filter: grayscale(0) !important; }
      `}</style>
      <div className="wrap">
        <div className="sponsors-head">
          <span className="section-eyebrow" style={{ display: 'block' }}>
            Supported by
          </span>
          <h2>The partners that make this free.</h2>
        </div>

        <div className="sponsor-tier">— Platinum —</div>
        <div className="sponsor-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
          {sponsors.platinum.map((s) => (
            <SponsorTile key={s.name} sponsor={s} large />
          ))}
        </div>

        {sponsors.gold.length > 0 && (
          <>
            <div className="sponsor-tier">— Gold —</div>
            <div className="sponsor-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              {sponsors.gold.map((s) => (
                <SponsorTile key={s.name} sponsor={s} />
              ))}
            </div>
          </>
        )}

        {sponsors.community.length > 0 && (
          <>
            <div className="sponsor-tier">— Community —</div>
            <div className="sponsor-grid" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
              {sponsors.community.map((s) => (
                <SponsorTile key={s.name} sponsor={s} />
              ))}
            </div>
          </>
        )}

        <div className="sponsor-tier" style={{ marginTop: 48 }}>
          — With support from —
        </div>
        <div className="sponsor-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          {sponsors.poweredBy.map((s) => (
            <SponsorTile key={s.name} sponsor={s} keepColor />
          ))}
        </div>
      </div>
    </section>
  )
}
