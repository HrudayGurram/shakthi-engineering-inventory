import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { v4 } from "uuid";
import bcrypt from 'bcryptjs';

// This API Route handles creating a user as an administrator.
// It requires the secure `service_role` client to bypass RLS.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method!== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, name, manager_id, employee_no, password } = req.body;

  if (!email ||!name ||!password) {
    return res.status(400).json({ message: 'Email, name, and password are required.' });
  }

  // Generate a salt and hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const managerIdToInsert = manager_id === ''? null : manager_id;
  
  const { data, error } = await supabaseAdmin.from('user').insert({
    name,
    email,
    // manager_id: managerIdToInsert,
    employee_no,
    created_at: new Date().toISOString(),
    password: hashedPassword,
  }).select();

  if (error) {
    console.error('User creation error:', error.message);
    return res.status(500).json({ message: 'Error creating user.', error: error.message });
  }

  // To avoid sending sensitive data, you can exclude the password from the response
  if (data && data.length > 0) {
    const user = data[0];
    delete user.password;
    return res.status(200).json({
      message: `User ${email} created successfully.`,
      user: user,
    });
  }

  return res.status(200).json({
    message: `User ${email} created successfully.`,
    user: data,
  });
}