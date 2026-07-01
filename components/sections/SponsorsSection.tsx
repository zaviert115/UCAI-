import Image from 'next/image'
import PaperSection from '@/components/layout/PaperSection'
import SectionHeader from '@/components/layout/SectionHeader'
import Reveal from '@/components/chrome/Reveal'

interface Sponsor {
  name: string
  logo?: string // path relative to /public
  url?: string
  w: number // intrinsic width  (for aspect ratio)
  h: number // intrinsic height
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
      w: 944,
      h: 629,
    },
    {
      name: 'UC Engineering Pūhanga',
      logo: '/sponsors/uc-engineering.png',
      url: 'https://www.canterbury.ac.nz/engineering',
      w: 1890,
      h: 591,
    },
  ],
  gold: [],
  community: [],
  poweredBy: [
    { name: 'Claude', logo: '/sponsors/claude.png', url: 'https://claude.ai', w: 3840, h: 825 },
    { name: 'OpenAI', logo: '/sponsors/openai.png', url: 'https://openai.com', w: 1280, h: 348 },
    {
      name: 'Gemini',
      logo: '/sponsors/gemini.png',
      url: 'https://gemini.google.com',
      w: 1080,
      h: 1080,
    },
  ],
}

function SponsorLogo({ sponsor, maxH }: { sponsor: Sponsor; maxH: number }) {
  const inner = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={sponsor.w}
      height={sponsor.h}
      // multiply dissolves the white/opaque logo backgrounds into the cream
      style={{
        width: 'auto',
        height: 'auto',
        maxHeight: maxH,
        maxWidth: '100%',
        objectFit: 'contain',
        mixBlendMode: 'multiply',
      }}
    />
  ) : (
    <span className="mono" style={{ fontSize: 13, color: 'rgba(11,11,15,0.7)' }}>
      {sponsor.name}
    </span>
  )

  return (
    <div
      className="sponsor-logo"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: maxH + 28,
        padding: '8px 20px',
      }}
    >
      {sponsor.url ? (
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={sponsor.name}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  )
}

function TierLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow" style={{ color: '#2B53FF', margin: '52px 0 10px' }}>
      {children}
    </div>
  )
}

function LogoRow({ items, maxH }: { items: Sponsor[]; maxH: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${maxH > 50 ? 240 : 180}px, 1fr))`,
        gap: 12,
        alignItems: 'center',
        borderTop: '1px solid rgba(11,11,15,0.1)',
      }}
    >
      {items.map((s, i) => (
        <Reveal key={s.name} variant="fade" delay={i * 0.08}>
          <SponsorLogo sponsor={s} maxH={maxH} />
        </Reveal>
      ))}
    </div>
  )
}

export default function SponsorsSection() {
  return (
    <PaperSection id="sponsors" dataShape="nz">
      <style>{`
        .sponsor-logo img { opacity: .82; transition: opacity .2s ease, transform .2s ease; }
        .sponsor-logo a:hover img { opacity: 1; transform: scale(1.03); }
      `}</style>

      <SectionHeader index="07" eyebrow="Backed by" title="Our supporters." tone="paper" />

      <TierLabel>Principal partners</TierLabel>
      <LogoRow items={sponsors.platinum} maxH={64} />

      {sponsors.gold.length > 0 && (
        <>
          <TierLabel>Gold</TierLabel>
          <LogoRow items={sponsors.gold} maxH={48} />
        </>
      )}

      {sponsors.community.length > 0 && (
        <>
          <TierLabel>Community</TierLabel>
          <LogoRow items={sponsors.community} maxH={44} />
        </>
      )}

      <TierLabel>With support from</TierLabel>
      <LogoRow items={sponsors.poweredBy} maxH={40} />
    </PaperSection>
  )
}
