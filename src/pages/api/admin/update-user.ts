import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

// This API Route handles updating a user's profile as an administrator.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method!== 'PATCH') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId, newName, newEmail, newManagerId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  const updatePayload = {
   ...(newName && { name: newName }),
   ...(newEmail && { email: newEmail }),
   ...(newManagerId && { manager_id: newManagerId }),
  };

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({ message: 'No fields to update.' });
  }

  // The update() method modifies rows that match the filter.[2]
  const { data, error } = await supabase
   .from('user')
   .update(updatePayload)
   .eq('id', userId)
   .select();

  if (error) {
    console.error('User update error:', error.message);
    return res.status(500).json({ message: 'Failed to update user.', error: error.message });
  }

  return res.status(200).json({ message: 'User updated successfully', data: data });
}