import { Resend } from 'resend'

export interface ContactPayload {
  name: string
  email: string
  reason: string
  message: string
}

export async function sendContactEmail(data: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')

  const resend = new Resend(apiKey)
  const to = process.env.CONTACT_TO_EMAIL ?? 'committee@ucaisoc.nz'
  const from = process.env.CONTACT_FROM_EMAIL ?? 'noreply@ucaisoc.nz'

  await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `[UC AI SOC Contact] ${data.reason} — from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nReason: ${data.reason}\n\n${data.message}`,
  })
}
