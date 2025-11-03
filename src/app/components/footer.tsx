"use client";
import Image from 'next/image'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'err'>('idle')
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'footer' }) })
      setStatus(res.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }
  return (
    <footer className="bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top: brand + nav + cta */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logos/logo.png"
                alt="MAI Future"
                width={160}
                height={40}
                className="h-8 w-auto"
                priority
              />
              <span className="sr-only">MAI Future</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-gray-600">
              AI-powered lung cancer screening solutions for earlier detection and better outcomes.
            </p>
          </div>


          {/* CTA */}
          <form onSubmit={submit} className="w-full max-w-md md:w-auto">
            <label htmlFor="footer-email" className="sr-only">Email</label>
            <div className="flex gap-2">
              <input
                id="footer-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button type="submit" className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-60" disabled={status==='loading'}>
                {status==='ok' ? 'Thanks!' : status==='loading' ? 'Sending…' : 'Sign up'}
              </button>
            </div>
            <p className="mt-7 text-xs text-gray-500">© {new Date().getFullYear()} MAI Future. All rights reserved.</p>
          </form>
        </div>
      </div>
    </footer>
  );
}
