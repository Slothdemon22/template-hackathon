import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

const chatRooms = [
  { name: 'General Discussion' },
  { name: 'Tech Talk' },
  { name: 'Random Chat' },
  { name: 'Help & Support' },
  { name: 'Announcements' },
  { name: 'Off-Topic' },
  { name: 'Gaming' },
  { name: 'Music' },
  { name: 'Movies & TV' },
  { name: 'Sports' },
]

export async function POST() {
  try {
    const supabase = await createServerClient()

    // Check if rooms already exist
    const { data: existingRooms } = await supabase
      .from('chat-table')
      .select('name')

    if (existingRooms && existingRooms.length > 0) {
      return NextResponse.json(
        {
          message: `Found ${existingRooms.length} existing rooms. Skipping seed.`,
          existingRooms: existingRooms.map((r: any) => r.name),
        },
        { status: 200 }
      )
    }

    // Insert chat rooms
    const { data, error } = await supabase
      .from('chat-table')
      .insert(chatRooms)
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: `Successfully seeded ${data?.length || 0} chat rooms!`,
        rooms: data,
      },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

