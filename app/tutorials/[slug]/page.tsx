import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, User, Calendar } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllTutorials, getTutorialBySlug } from '@/lib/tutorials'
import { Badge } from '@/components/ui/badge'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tutorials = await getAllTutorials()
  return tutorials.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tutorial = await getTutorialBySlug(slug)
  if (!tutorial) return {}
  return {
    title: tutorial.title,
    description: tutorial.description,
    openGraph: { title: tutorial.title, description: tutorial.description },
  }
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params
  const tutorial = await getTutorialBySlug(slug)
  if (!tutorial) notFound()

  const dateStr = new Date(tutorial.date).toLocaleDateString('en-NZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <section className="bg-navy-800 text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/tutorials"
            className="text-white/60 text-sm hover:text-white transition-colors mb-6 inline-flex items-center gap-1"
          >
            &larr; All tutorials
          </Link>
          <Badge className="mb-4 block w-fit bg-brand-cyan text-navy-800 hover:bg-brand-cyan-dark">
            {tutorial.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl">{tutorial.title}</h1>
          <div className="flex flex-wrap gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <User size={14} aria-hidden="true" />
              {tutorial.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              {dateStr}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {tutorial.readTime} min read
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <article className="prose prose-slate max-w-none">
          <MDXRemote source={tutorial.content} />
        </article>

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/tutorials"
            className="text-sm font-medium text-navy-800 hover:text-brand-cyan-dark transition-colors"
          >
            &larr; Back to tutorials
          </Link>
        </div>
      </div>
    </>
  )
}
