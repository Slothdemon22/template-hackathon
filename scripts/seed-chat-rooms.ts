import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

async function seedChatRooms() {
  console.log('🌱 Seeding chat rooms...')

  try {
    // Check if rooms already exist
    const { data: existingRooms } = await supabase
      .from('chat-table')
      .select('name')

    if (existingRooms && existingRooms.length > 0) {
      console.log(`⚠️  Found ${existingRooms.length} existing rooms. Skipping seed.`)
      console.log('Existing rooms:', existingRooms.map(r => r.name).join(', '))
      return
    }

    // Insert chat rooms
    const { data, error } = await supabase
      .from('chat-table')
      .insert(chatRooms)
      .select()

    if (error) {
      console.error('❌ Error seeding chat rooms:', error)
      throw error
    }

    console.log(`✅ Successfully seeded ${data?.length || 0} chat rooms!`)
    console.log('Created rooms:')
    data?.forEach((room: any) => {
      console.log(`  - ${room.name} (ID: ${room.id})`)
    })
  } catch (error) {
    console.error('❌ Failed to seed chat rooms:', error)
    process.exit(1)
  }
}

seedChatRooms()

