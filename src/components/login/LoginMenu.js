// Login.js

import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default to user role

    const handleLogin = async (e) => {
        e.preventDefault();

        // Simulated authentication
        const response = await fakeAuthentication(email, password);

        if (response.success) {
            // If authentication is successful, proceed with role-based logic
            if (role === 'user') {
                // User authentication logic
                console.log('User login successful');
            } else if (role === 'admin') {
                // Admin authentication logic
                console.log('Admin login successful');
            }
        } else {
            console.error(response.message);
        }
    };

    const fakeAuthentication = (email, password) => {
        // Simulated asynchronous authentication (replace this with actual authentication logic)
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'user@example.com' && password === 'password') {
                    resolve({ success: true });
                } else if (email === 'admin@example.com' && password === 'password') {
                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: 'Invalid credentials' });
                }
            }, 1000); // Simulate 1 second delay for authentication
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {role === 'admin' ? (
                    <div>
                        <label>Role:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                ) : null}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
