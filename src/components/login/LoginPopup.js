// LoginPopup.js

import React, { useState } from 'react';

const LoginPopup = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleLogin = async (e) => {
        e.preventDefault();
        // Simulated authentication logic...
    };

    return (
        <div className="popup">
            <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
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
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    ) : null}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;
