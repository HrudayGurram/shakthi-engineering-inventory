import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';

// API Route to update a tool in the 'tool' table
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, name, description, is_shared } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: 'Tool id and name are required.' });
  }

  const { data, error } = await supabaseAdmin
    .from('tool')
    .update({
      name,
      description: description || '',
      is_shared: !!is_shared,
    })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating tool:', error.message);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data && data[0]);
}
