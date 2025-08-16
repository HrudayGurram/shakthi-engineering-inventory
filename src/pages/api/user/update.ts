// pages/api/user/update.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow PUT or PATCH requests for updates
  if (req.method !== 'PUT' && req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Extract the user ID and the fields to be updated
  const { name, manager_id, employee_id, password, email, user_role } = req.body;

  // Ensure the user ID is provided
  if (!employee_id) {
    return res.status(400).json({ message: 'employee id is required for update.' });
  }

  let updateData: any = {
    name,
    manager_no: manager_id === '' ? null : manager_id,
    email,
    user_role,
    password,
  };

  try {
    // If a new password is provided, hash it before updating
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    // Use supabaseAdmin to update the user record
    const { data, error } = await supabaseAdmin
      .from('user')
      .update(updateData)
      .eq('employee_no', employee_id)
      .select();

    if (error) {
      console.error('User update error:', error.message);
      return res.status(500).json({ message: 'Error updating user.', error: error.message });
    }

    // Return the updated user data (without the password hash)
    const updatedUser = data[0];
    if (updatedUser) {
      delete updatedUser.password;
    }

    return res.status(200).json({
      message: `User with ID ${employee_id} updated successfully.`,
      user: updatedUser,
    });
  } catch (err) {
    console.error('Update operation error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}