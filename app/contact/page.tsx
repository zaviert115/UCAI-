import type { Metadata } from 'next'
import PageContainer from '@/components/layout/PageContainer'
import ContactForm from '@/components/sections/ContactForm'

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
      <section className="bg-navy-800 text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact us</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Got a question, idea, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <PageContainer>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Form */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-navy-800 mb-6">Send us a message</h2>
            <ContactForm />
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
