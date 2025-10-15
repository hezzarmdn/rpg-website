import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.https://iuxbvjbopwoytpkiphek.supabase.co,
  process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1eGJ2amJvcHdveXRwa2lwaGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MTc4OTEsImV4cCI6MjA3NjA5Mzg5MX0.n2Ps3uEJRBjr1YkdvBZNEqQKFJq1lrzLS7baEhl5dKQ
)

export default async function handler(req, res) {
  const { command, username } = req.body

  if (!command || !username) {
    return res.status(400).json({ error: 'Missing command or username' })
  }

  if (command === '/inventory') {
    const { data, error } = await supabase
      .from('players')
      .select('inventory')
      .eq('username', username)
      .single()
    if (error) return res.status(500).json({ error })
    return res.json({ result: data.inventory })
  }

  if (command === '/shop') {
    return res.json({
      result: [
        { name: 'Potion', price: 10 },
        { name: 'Sword', price: 50 },
        { name: 'Shield', price: 40 },
      ],
    })
  }

  return res.json({ result: 'Unknown command' })
}
