import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { answer: 'AI demo is not configured yet. Add ANTHROPIC_API_KEY to your environment.' },
      { status: 200 }
    )
  }

  const { prompt } = await req.json()
  if (!prompt || typeof prompt !== 'string' || prompt.length > 500) {
    return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 })
  }

  try {
    const client = new Anthropic({ apiKey })
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: `You are a friendly UC AI Society assistant. Answer in 1-2 short sentences, max 50 words. Be helpful and enthusiastic. Question: ${prompt}`,
        },
      ],
    })
    const answer =
      message.content[0].type === 'text'
        ? message.content[0].text
        : 'Sorry, I could not generate a response.'
    return NextResponse.json({ answer })
  } catch {
    return NextResponse.json(
      { answer: '// the model is napping. try again in a sec.' },
      { status: 200 }
    )
  }
}
