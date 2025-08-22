import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';

// API Route to get all tools from the 'tool' table
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { data: tools, error } = await supabaseAdmin
    .from('tool')
    .select('id, created_at, name, description, is_shared');

  if (error) {
    console.error('Error fetching tools:', error.message);
    return res.status(500).json({ message: 'Error fetching tools.', error: error.message });
  }

  return res.status(200).json(tools);
}
