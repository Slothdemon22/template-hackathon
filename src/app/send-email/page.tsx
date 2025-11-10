'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function SendEmailPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [subject, setSubject] = useState('')
  const [html, setHtml] = useState('')
  const [to, setTo] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<any>(null)

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setResult(null)

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          html,
          to: to || user.email,
        }),
      })

      const data = await response.json()
      setResult(data)

      if (response.ok) {
        setSubject('')
        setHtml('')
        setTo('')
      }
    } catch (error) {
      setResult({ error: 'Failed to send email' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Send Email
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Send an email using Resend
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
              Default recipient: {user.email}
            </p>
          </div>

          <form onSubmit={handleSend} className="space-y-6">
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                To (optional - defaults to your email)
              </label>
              <input
                id="to"
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder={user.email}
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email subject"
              />
            </div>

            <div>
              <label htmlFor="html" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                HTML Content *
              </label>
              <textarea
                id="html"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                required
                rows={8}
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="<p>Your HTML email content here</p>"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold py-3 px-6 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Email'}
            </button>
          </form>

          {result && (
            <div
              className={`mt-6 p-4 rounded-lg border ${
                result.error
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              }`}
            >
              {result.error ? (
                <p className="text-sm text-red-800 dark:text-red-200">
                  {result.error}
                </p>
              ) : (
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                    ✅ Email sent successfully!
                  </p>
                  {result.data && (
                    <p className="text-xs text-green-700 dark:text-green-300">
                      ID: {result.data.id}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

