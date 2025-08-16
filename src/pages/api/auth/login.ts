import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method!== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { employee_id, password } = req.body;

  if (!employee_id ||!password) {
    return res.status(400).json({ message: 'Employee ID and password are required.' });
  }

  try {
    // 1. Find the user in your 'user' table by employee_id
    const { data: user, error } = await supabaseAdmin
      .from('user')
      .select('id, employee_no, password, name')
      .eq('employee_no', employee_id)
      .single();

    if (error ||!user) {
      return res.status(401).json({ message: 'Invalid employee ID or password.' });
    }

    // 2. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid employee ID or password.' });
    }

    // 3. Authentication is successful
    delete user.password; // Do not return the hashed password to the client

    return res.status(200).json({
      message: 'Login successful.',
      user: user,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}