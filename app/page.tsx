import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import PillarsSection from '@/components/sections/PillarsSection'
import EventsSection from '@/components/sections/EventsSection'
import MiniTerminal from '@/components/sections/MiniTerminal'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TutorialsSection from '@/components/sections/TutorialsSection'
import TeamSection from '@/components/sections/TeamSection'
import AIDemo from '@/components/sections/AIDemo'
import SponsorsSection from '@/components/sections/SponsorsSection'
import JoinSection from '@/components/sections/JoinSection'
import { getAllEvents } from '@/lib/events'
import { getAllTutorials } from '@/lib/tutorials'

export const metadata: Metadata = {
  title: 'UC AI Society',
  description:
    'A student-led club at the University of Canterbury focused on helping students understand and use AI in practical, ethical, and real-world ways.',
}

export default async function HomePage() {
  const [allEvents, allTutorials] = await Promise.all([getAllEvents(), getAllTutorials()])

  return (
    <>
      <Hero />
      <StatsSection />
      <PillarsSection />
      <EventsSection events={allEvents} teaser />
      <MiniTerminal />
      <ProjectsSection />
      <TutorialsSection tutorials={allTutorials} teaser />
      <TeamSection />
      <AIDemo />
      <SponsorsSection />
      <JoinSection />
    </>
  )
}
