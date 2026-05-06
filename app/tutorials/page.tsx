import type { Metadata } from 'next'
import PageContainer from '@/components/layout/PageContainer'
import TutorialCard from '@/components/sections/TutorialCard'
import { getTutorialsByCategory } from '@/lib/tutorials'

export const metadata: Metadata = {
  title: 'Tutorials',
  description:
    'Free tutorials from UC AI Society — prompt engineering, AI tools, ethics, and more.',
}

export default async function TutorialsPage() {
  const byCategory = await getTutorialsByCategory()
  const categories = Object.keys(byCategory).sort()

  return (
    <>
      <section className="bg-navy-800 text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tutorials</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Practical guides you can work through at your own pace — no prior experience required.
          </p>
        </div>
      </section>

      <PageContainer>
        {categories.length === 0 && (
          <p className="text-muted-foreground">No tutorials yet — check back soon.</p>
        )}
        <div className="space-y-14">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-xl font-bold text-navy-800 mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {byCategory[category].map((tutorial) => (
                  <TutorialCard key={tutorial.slug} tutorial={tutorial} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </PageContainer>
    </>
  )
}
