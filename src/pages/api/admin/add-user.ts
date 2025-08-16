import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { v4 } from "uuid";

// This API Route handles creating a user as an administrator.
// It requires the secure `service_role` client to bypass RLS.[2, 3]
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method!== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, name, manager_id, employee_id, password } = req.body;

  if (!email ||!name) {
    return res.status(400).json({ message: 'Email and name are required.' });
  }

  // Check if the provided manager_id is an empty string.
  // If it is, set the value to null. Otherwise, use the provided ID.
  const managerIdToInsert = manager_id === ''? null : manager_id;
  
  // The insert() method is used to add a new row to the specified table.[4]
  const { data, error } = await supabaseAdmin.from('user').insert({
    // id: v4(),
    name,
    email,
    manager_id: managerIdToInsert, // Correctly handles the null value
    employee_id,
    created_at: new Date().toISOString(),
    password,
  }).select();

  if (error) {
    console.error('User creation error:', error.message);
    return res.status(500).json({ message: 'Error creating user.', error: error.message });
  }

  return res.status(200).json({
    message: `User ${email} created successfully.`,
    user: data,
  });
}