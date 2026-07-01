import type { Metadata } from 'next'
import PageContainer from '@/components/layout/PageContainer'
import TeamCard from '@/components/sections/TeamCard'
import Reveal from '@/components/chrome/Reveal'
import GradientText from '@/components/ui/GradientText'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about UC AI Society — a student-led club at the University of Canterbury focused on practical, ethical AI education.',
}

const team = [
  { name: 'Name', role: 'President', bio: 'Placeholder bio — update via PR.' },
  {
    name: 'Name',
    role: 'Director of Technology',
    bio: 'Placeholder bio — update via PR.',
  },
  { name: 'Name', role: 'Events Lead', bio: 'Placeholder bio — update via PR.' },
  { name: 'Name', role: 'Marketing Lead', bio: 'Placeholder bio — update via PR.' },
]

const whatWeDo = [
  {
    title: 'Workshops & tutorials',
    desc: 'From prompt engineering to building with AI APIs, we run practical sessions that give you real skills you can use immediately.',
  },
  {
    title: 'Industry panels',
    desc: 'We bring in professionals from across industries to talk honestly about how AI is changing work and what skills employers are looking for.',
  },
  {
    title: 'Project showcases',
    desc: 'Members demo their AI projects — a great way to get feedback, find collaborators, and see what your peers are building.',
  },
  {
    title: 'Community',
    desc: "A space to ask questions, share what you're learning, and connect with other students who care about AI.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="dark-sec" style={{ paddingBlock: 'clamp(110px,16vh,190px)' }}>
        <div className="wrap">
          <Reveal>
            <span className="mono eyebrow" style={{ color: '#00E0CC' }}>
              ABOUT · UC·AI
            </span>
          </Reveal>
          <Reveal variant="big" delay={0.05}>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 'clamp(44px,8vw,120px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#F2EFE6',
                margin: '20px 0 0',
              }}
            >
              What is <GradientText sheen>UC·AI?</GradientText>
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
              A student-led club at the University of Canterbury, helping students understand and
              build with AI in practical, ethical ways.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <PageContainer>
        <div className="max-w-3xl">
          <h2
            className="text-navy-800 mb-6"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(28px,4vw,48px)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            Our mission
          </h2>
          <div className="prose prose-slate max-w-none text-foreground leading-relaxed space-y-4">
            <p className="text-lg">
              UC AI (artificial intelligence) Society is a student-led club at the University of
              Canterbury focused on helping students understand and use artificial intelligence in
              practical, ethical, and real-world ways.
            </p>
            <p>
              The club brings together students from all backgrounds to explore how AI is changing
              the workplace, how to use AI tools responsibly, and how to build skills that will be
              valuable in future careers.
            </p>
            <p>
              From workshops to networking events, panel discussions, and project showcases, UC AI
              SOC aims to create a community where students can learn, connect, and prepare for a
              world where AI is becoming increasingly important across every industry.
            </p>
          </div>
        </div>
      </PageContainer>

      {/* What we do */}
      <section className="bg-navy-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="mono eyebrow" style={{ color: '#2B53FF' }}>
            WHAT WE DO
          </span>
          <h2
            className="text-navy-800 mb-10 mt-4"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(28px,4vw,48px)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            From prompts to projects.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whatWeDo.map(({ title, desc }) => (
              <div key={title} className="rounded-xl bg-white border border-border p-6">
                <h3 className="font-semibold text-navy-800 mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <PageContainer>
        <span className="mono eyebrow" style={{ color: '#2B53FF' }}>
          THE TEAM
        </span>
        <h2
          className="text-navy-800 mb-2 mt-4"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(28px,4vw,48px)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          Meet the committee
        </h2>
        <p className="text-muted-foreground mb-10">
          The people keeping UC AI SOC running. Interested in joining the committee? Get in touch.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <TeamCard key={member.role} {...member} />
          ))}
        </div>
      </PageContainer>
    </>
  )
}
