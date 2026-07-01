import type { Metadata } from 'next'
import PageContainer from '@/components/layout/PageContainer'
import ContactForm from '@/components/sections/ContactForm'
import Reveal from '@/components/chrome/Reveal'
import GradientText from '@/components/ui/GradientText'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with UC AI Society — questions, sponsorship, or just a kia ora.',
}

const socials = [
  { label: 'Instagram', href: '#', handle: '@ucaisoc' },
  { label: 'LinkedIn', href: '#', handle: 'UC AI Society' },
  { label: 'Discord', href: '#', handle: 'Join our server' },
]

export default function ContactPage() {
  return (
    <>
      <section className="dark-sec" style={{ paddingBlock: 'clamp(110px,16vh,190px)' }}>
        <div className="wrap">
          <Reveal>
            <span className="mono eyebrow" style={{ color: '#00E0CC' }}>
              CONTACT · UC·AI
            </span>
          </Reveal>
          <Reveal variant="big" delay={0.05}>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 'clamp(48px,9vw,128px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#F2EFE6',
                margin: '20px 0 0',
              }}
            >
              Let&apos;s <GradientText sheen>talk.</GradientText>
            </h1>
          </Reveal>
          <Reveal variant="fade" delay={0.12}>
            <p
              style={{
                marginTop: 26,
                maxWidth: 620,
                fontSize: 'clamp(16px,1.9vw,20px)',
                lineHeight: 1.6,
                color: 'rgba(242,239,230,0.72)',
              }}
            >
              Got a question, idea, or just want to say hi? We&apos;d love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <PageContainer>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Form */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-navy-800 mb-6">Send us a message</h2>
            <div className="card-paper" style={{ padding: 'clamp(20px,4vw,40px)' }}>
              <ContactForm />
            </div>
          </div>

          {/* Info */}
          <aside className="lg:w-72 shrink-0 space-y-8">
            <div>
              <h2 className="font-semibold text-navy-800 mb-3">Email</h2>
              <a
                href="mailto:ucaisoc@outlook.com"
                className="text-muted-foreground hover:text-navy-800 transition-colors text-sm"
              >
                ucaisoc@outlook.com
              </a>
            </div>

            <div>
              <h2 className="font-semibold text-navy-800 mb-3">Find us</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                University of Canterbury
                <br />
                Christchurch, New Zealand
                <br />
                <br />
                Meetings are held on campus — check the events page for upcoming sessions.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-navy-800 mb-3">Social</h2>
              <ul className="space-y-2">
                {socials.map(({ label, href, handle }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-navy-800 transition-colors"
                    >
                      <span className="font-medium w-20">{label}</span>
                      <span>{handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </PageContainer>
    </>
  )
}
