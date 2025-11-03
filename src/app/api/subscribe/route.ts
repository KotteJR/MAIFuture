import { NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const email = String(body?.email || '').trim().toLowerCase()
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
    }

    // Fan-out to optional destinations depending on available env vars
    const tasks: Promise<{ name: string; ok: boolean; status?: number; body?: string }>[] = []

    // 1) Send to a webhook (Zapier/Make/Sheets) if provided
    const webhookUrl = process.env.SUBSCRIBE_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbw5YL5XOItqj3OJKNw0bSnzWOdmIsVLo4ASTEE8Uo3N1p7ReZPhKMdIueQsZlRNVcI/exec'
    if (webhookUrl) {
      tasks.push(
        (async () => {
          try {
            const r = await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, source: 'maifuture.mk', ts: new Date().toISOString() }),
            })
            const text = await r.text().catch(() => '')
            return { name: 'webhook', ok: r.ok, status: r.status, body: text }
          } catch (e) {
            return { name: 'webhook', ok: false }
          }
        })()
      )
    }

    // 2) Send notification via Resend if configured
    const resendKey = process.env.RESEND_API_KEY
    const notifyTo = process.env.SUBSCRIBE_NOTIFY_TO || ''
    if (resendKey && notifyTo) {
      tasks.push(
        (async () => {
          try {
            const r = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${resendKey}`,
              },
              body: JSON.stringify({
                from: 'MAI Future <no-reply@maifuture.com>',
                to: [notifyTo],
                subject: 'New waitlist subscription',
                html: `<p>New subscriber: <strong>${email}</strong></p>`,
              }),
            })
            return { name: 'resend', ok: r.ok, status: r.status }
          } catch (e) {
            return { name: 'resend', ok: false }
          }
        })()
      )
    }

    const results = await Promise.all(tasks)
    const primary = results.find(r => r.name === 'webhook')
    if (primary && !primary.ok) {
      return NextResponse.json({ ok: false, error: 'Webhook failed', details: { status: primary.status, body: primary.body } }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}


