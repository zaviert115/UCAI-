import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import EventCard from '@/components/sections/EventCard'
import TutorialCard from '@/components/sections/TutorialCard'
import { getAllEvents } from '@/lib/events'
import { getAllTutorials } from '@/lib/tutorials'

export const metadata: Metadata = {
  title: 'UC AI Society',
  description:
    'A student-led club at the University of Canterbury focused on helping students understand and use AI in practical, ethical, and real-world ways.',
}

export default async function HomePage() {
  const [allEvents, allTutorials] = await Promise.all([getAllEvents(), getAllTutorials()])
  const upcomingEvents = allEvents.filter((e) => !e.isPast).slice(0, 3)
  const recentTutorials = allTutorials.slice(0, 3)

  return (
    <>
      <Hero />

      {/* What we do */}
      <section className="bg-navy-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-10 text-center">
            What we do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🧠',
                title: 'Workshops',
                desc: 'Hands-on sessions covering AI tools, prompt engineering, and building with APIs.',
              },
              {
                icon: '🎙️',
                title: 'Panel discussions',
                desc: 'Industry guests share how AI is changing their work and what skills matter most.',
              },
              {
                icon: '🤝',
                title: 'Networking',
                desc: 'Connect with students and professionals who are passionate about AI.',
              },
              {
                icon: '📚',
                title: 'Tutorials',
                desc: 'Structured guides you can work through at your own pace, on your own time.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl bg-white border border-border p-6 flex flex-col gap-3"
              >
                <span className="text-3xl" aria-hidden="true">
                  {icon}
                </span>
                <h3 className="font-semibold text-navy-800">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-800">Upcoming events</h2>
              <Link
                href="/events"
                className="text-sm font-medium text-brand-cyan-dark hover:underline"
              >
                All events &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tutorials */}
      {recentTutorials.length > 0 && (
        <section className="bg-navy-50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-800">
                Learn at your own pace
              </h2>
              <Link
                href="/tutorials"
                className="text-sm font-medium text-brand-cyan-dark hover:underline"
              >
                All tutorials &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.slug} tutorial={tutorial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join CTA */}
      <section id="join" className="bg-navy-800 text-white py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get involved?</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Membership is free and open to all UC students regardless of background. No prior
            experience with AI required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="rounded-md bg-brand-cyan px-6 py-3 text-navy-800 font-semibold hover:bg-brand-cyan-dark transition-colors"
            >
              Join on StudentLink
            </a>
            <Link
              href="/contact"
              className="rounded-md border border-white/30 px-6 py-3 text-white hover:bg-white/10 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors strip */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-6">Supported by</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/40 font-semibold text-sm tracking-wide">
            <span>Your sponsor here</span>
            <span>Your sponsor here</span>
            <span>Your sponsor here</span>
          </div>
        </div>
      </section>
    </>
  )
}
