"use client"
import { useState } from 'react';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [managerId, setManagerId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/admin/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    manager_id: managerId,
                    employee_Id: employeeId,
                    password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create user.');
            }

            setSuccess(true);
            setEmail('');
            setName('');
            setManagerId('');
            setEmployeeId('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="name">Full Name</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="managerId">Manager ID (optional)</label>
                    <input id="managerId" type="text" value={managerId} onChange={(e) => setManagerId(e.target.value)} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="employeeid">Manager ID (optional)</label>
                    <input id="employeeid" type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="Password">Password</label>
                    <input id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>User created successfully!</p>}
        </div>
    );
}