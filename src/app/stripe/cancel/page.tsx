'use client'

import Link from 'next/link'

export default function StripeCancelPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Payment Cancelled
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Your payment was cancelled. No charges were made.
          </p>
          <Link
            href="/stripe"
            className="inline-block px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  )
}

