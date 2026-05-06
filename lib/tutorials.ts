import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import type { Tutorial } from '@/types/tutorial'

const TUTORIALS_DIR = path.join(process.cwd(), 'content', 'tutorials')

async function parseTutorialFile(filename: string): Promise<Tutorial> {
  const slug = filename.replace(/\.mdx?$/, '')
  const raw = await fs.readFile(path.join(TUTORIALS_DIR, filename), 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title as string,
    category: data.category as string,
    author: data.author as string,
    date: data.date as string,
    readTime: data.readTime as number,
    description: data.description as string,
    content,
  }
}

export async function getAllTutorials(): Promise<Tutorial[]> {
  const files = await fs.readdir(TUTORIALS_DIR)
  const tutorials = await Promise.all(files.filter((f) => /\.mdx?$/.test(f)).map(parseTutorialFile))
  return tutorials.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getTutorialBySlug(slug: string): Promise<Tutorial | null> {
  for (const ext of ['mdx', 'md']) {
    try {
      return await parseTutorialFile(`${slug}.${ext}`)
    } catch {
      // try next extension
    }
  }
  return null
}

export async function getTutorialsByCategory(): Promise<Record<string, Tutorial[]>> {
  const tutorials = await getAllTutorials()
  return tutorials.reduce<Record<string, Tutorial[]>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = []
    acc[t.category].push(t)
    return acc
  }, {})
}
