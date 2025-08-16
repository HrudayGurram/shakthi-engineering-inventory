import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient'; // Assumes you have the supabaseAdmin client set up

// This API Route handles a GET request to fetch all users as an administrator.
// It requires the secure `service_role` client.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method!== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Use the select('*') method to fetch all columns from the 'user' table.
  const { data: users, error } = await supabaseAdmin.from('user').select('*');

  if (error) {
    console.error('Error fetching users:', error.message);
    return res.status(500).json({ message: 'Error fetching users.', error: error.message });
  }
  
  // By default, Supabase limits the number of rows returned to 1000.
  // For larger datasets, consider using pagination with.range() [3, 5]

  return res.status(200).json(users);
}