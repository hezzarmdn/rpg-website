import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
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
