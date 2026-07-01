import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// build.nvidia.com — free, OpenAI-compatible, rate-limited hosted open models.
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1'
const MODEL = process.env.NVIDIA_MODEL ?? 'meta/llama-3.3-70b-instruct'

export async function POST(req: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { answer: 'AI demo is not configured yet. Add NVIDIA_API_KEY to your environment.' },
      { status: 200 }
    )
  }

  const { prompt, context } = await req.json()
  if (!prompt || typeof prompt !== 'string' || prompt.length > 500) {
    return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 })
  }

  const grounding =
    typeof context === 'string' && context.length > 0
      ? `\n\nUse only the following information about UC AI Society:\n${context.slice(0, 2000)}`
      : ''

  try {
    const client = new OpenAI({ baseURL: NVIDIA_BASE_URL, apiKey })
    const completion = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 200,
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content:
            'You are a friendly UC AI Society assistant. Answer in 1-2 short sentences, max 50 words. Be helpful and enthusiastic.' +
            grounding,
        },
        { role: 'user', content: prompt },
      ],
    })
    const answer =
      completion.choices[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.'
    return NextResponse.json({ answer })
  } catch {
    return NextResponse.json(
      { answer: '// the model is napping. try again in a sec.' },
      { status: 200 }
    )
  }
}
