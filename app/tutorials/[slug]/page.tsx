import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, User, Calendar } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllTutorials, getTutorialBySlug } from '@/lib/tutorials'

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
      <section
        style={{ background: 'var(--bg, #070710)' }}
        className="text-[#F2EFE6] py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/tutorials"
            className="mono text-[11px] uppercase tracking-[0.2em] text-[#F2EFE6]/55 hover:text-[#00E0CC] transition-colors mb-8 inline-flex items-center gap-1.5"
          >
            &larr; All tutorials
          </Link>
          <div className="eyebrow text-[#00E0CC] mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{tutorial.category}</span>
            <span className="text-[#F2EFE6]/30">·</span>
            <span className="text-[#F2EFE6]/70">{tutorial.author}</span>
            <span className="text-[#F2EFE6]/30">·</span>
            <span className="text-[#F2EFE6]/70">{tutorial.readTime} min read</span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold mb-8 max-w-3xl"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            {tutorial.title}
          </h1>
          <div className="mono flex flex-wrap gap-4 text-[#F2EFE6]/70 text-xs uppercase tracking-[0.12em]">
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

      <div className="paper">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <article className="prose-uc max-w-none">
            <MDXRemote source={tutorial.content} />
          </article>

          <div className="mt-14 pt-8 border-t border-[#0B0B0F]/15">
            <Link
              href="/tutorials"
              className="mono text-xs uppercase tracking-[0.16em] font-bold text-[#2B53FF] hover:text-[#7A2BFF] transition-colors"
            >
              &larr; Back to tutorials
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
