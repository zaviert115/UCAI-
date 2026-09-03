interface RateEntry {
  count: number
  resetAt: number
}

interface RateLimitOptions {
  key: string
  limit: number
  windowMs: number
}

const entries = new Map<string, RateEntry>()

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip')?.trim() ||
    'unknown'
  )
}

export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions) {
  const now = Date.now()
  const entry = entries.get(key)

  if (!entry || now >= entry.resetAt) {
    entries.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    }
  }

  entry.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}
