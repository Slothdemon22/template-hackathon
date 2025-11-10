'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'

function StripeSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // You can verify the session here if needed
    setLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Thank you for your purchase.
          </p>
          {sessionId && (
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
              Session ID: {sessionId}
            </p>
          )}
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function StripeSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading...</div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mt-4"></div>
          </div>
        </div>
      }
    >
      <StripeSuccessContent />
    </Suspense>
  )
}

