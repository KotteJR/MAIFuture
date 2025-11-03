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
    const tasks: Promise<any>[] = []

    // 1) Send to a webhook (Zapier/Make/Sheets) if provided
    const webhookUrl = process.env.SUBSCRIBE_WEBHOOK_URL
    if (webhookUrl) {
      tasks.push(
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'maifuture.mk', ts: new Date().toISOString() }),
        }).catch(() => undefined)
      )
    }

    // 2) Send notification via Resend if configured
    const resendKey = process.env.RESEND_API_KEY
    const notifyTo = process.env.SUBSCRIBE_NOTIFY_TO || ''
    if (resendKey && notifyTo) {
      tasks.push(
        fetch('https://api.resend.com/emails', {
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
        }).catch(() => undefined)
      )
    }

    await Promise.all(tasks)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}


