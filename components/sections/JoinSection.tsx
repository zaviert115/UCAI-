import Link from 'next/link'
import DarkSection from '@/components/layout/DarkSection'
import GradientText from '@/components/ui/GradientText'
import { siteConfig } from '@/lib/site'

export default function JoinSection() {
  return (
    <DarkSection id="join" dataShape="ai">
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <span
          className="eyebrow"
          style={{
            color: '#00E0CC',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 24,
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
          Free · open to all UC students
        </span>

        <h2
          style={{
            fontWeight: 700,
            fontSize: 'clamp(34px,6vw,80px)',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            color: '#F2EFE6',
            margin: 0,
          }}
        >
          Ready to <GradientText sheen>build the future?</GradientText>
        </h2>

        <p
          style={{
            marginTop: 22,
            maxWidth: 560,
            marginInline: 'auto',
            fontSize: 'clamp(15px,1.7vw,19px)',
            lineHeight: 1.6,
            color: 'rgba(242,239,230,0.72)',
          }}
        >
          Come to an event, tell us what you want to learn, or follow along for workshop and
          membership updates. No prior experience required — just curiosity.
        </p>

        <div
          style={{
            marginTop: 36,
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/contact" className="btn btn--grad">
            Register your interest →
          </Link>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </DarkSection>
  )
}
