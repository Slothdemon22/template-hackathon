'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function SeedPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [seeding, setSeeding] = useState(false)
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

  const handleSeed = async () => {
    setSeeding(true)
    setResult(null)

    try {
      const response = await fetch('/api/chat/seed', {
        method: 'POST',
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to seed chat rooms' })
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Seed Chat Rooms
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            This will create 10 default chat rooms in your Supabase database.
          </p>

          <button
            onClick={handleSeed}
            disabled={seeding}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold py-3 px-6 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {seeding ? 'Seeding...' : 'Seed Chat Rooms'}
          </button>

          {result && (
            <div
              className={`p-4 rounded-lg border ${
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
                    ✅ {result.message}
                  </p>
                  {result.rooms && (
                    <div className="mt-4">
                      <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                        Created rooms:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-300">
                        {result.rooms.map((room: any) => (
                          <li key={room.id}>
                            {room.name} (ID: {room.id})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.existingRooms && (
                    <div className="mt-4">
                      <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                        Existing rooms:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-300">
                        {result.existingRooms.map((name: string) => (
                          <li key={name}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <a
              href="/chat"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline"
            >
              ← Back to Chat Rooms
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

