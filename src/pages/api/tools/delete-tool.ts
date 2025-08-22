import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';

// API Route to delete a tool from the 'tool' table
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Tool id is required.' });
  }

  const { error } = await supabaseAdmin
    .from('tool')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting tool:', error.message);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Tool deleted successfully.' });
}
