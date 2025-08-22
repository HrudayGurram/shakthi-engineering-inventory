import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';

// API Route to add a new tool to the 'tool' table
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, description, is_shared } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Tool name is required.' });
  }

  const { data, error } = await supabaseAdmin
    .from('tool')
    .insert([
      {
        name,
        description: description || '',
        is_shared: !!is_shared,
      },
    ])
    .select();

  if (error) {
    console.error('Error adding tool:', error.message);
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data && data[0]);
}
