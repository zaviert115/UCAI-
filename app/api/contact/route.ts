import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/contact'
import { CONTACT_REASONS, type ContactReason } from '@/lib/contact-fields'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit({
    key: `contact:${getClientIp(request.headers)}`,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  })
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes and try again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
      }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const values = body as Record<string, unknown>

  // Honeypot — bots fill this, humans don't
  if (values.website) {
    return NextResponse.json({ ok: true })
  }

  const name = typeof values.name === 'string' ? values.name.trim() : ''
  const email = typeof values.email === 'string' ? values.email.trim() : ''
  const reason = typeof values.reason === 'string' ? values.reason.trim() : ''
  const message = typeof values.message === 'string' ? values.message.trim() : ''

  if (!name || !email || !reason || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 })
  }

  if (!CONTACT_REASONS.includes(reason as ContactReason)) {
    return NextResponse.json({ error: 'Please select a valid reason.' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  try {
    await sendContactEmail({ name, email, reason, message })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    )
  }
}
