// pages/api/user/delete.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow DELETE requests
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { employee_no } = req.body;

  // Ensure the user ID is provided
  if (!employee_no) {
    return res.status(400).json({ message: 'User ID is required for deletion.' });
  }

  try {
    // Use the supabaseAdmin client to delete the user record
    const { error } = await supabaseAdmin
      .from('user')
      .delete()
      .eq('employee_no', employee_no);

    if (error) {
      console.error('User deletion error:', error.message);
      return res.status(500).json({ message: 'Error deleting user.', error: error.message });
    }

    return res.status(200).json({
      message: `User with ID ${employee_no} deleted successfully.`,
    });

  } catch (err) {
    console.error('Deletion operation error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}