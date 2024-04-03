import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username,
                password
            });

            const token = response.data.token;

            if (!token) {
                setError('Invalid token received');
                return;
            }

            localStorage.setItem('token', token);
            setError('');
            onLoginSuccess();

            // Request to the authenticated endpoint after successful login
            const authenticatedResponse = await axios.get('http://localhost:8080/authenticated', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSuccessMessage('User authenticated successfully');
            console.log('Authenticated user:', authenticatedResponse.data);
        } catch (error) {
            setError('Error occurred while logging in');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <div>{error}</div>}
            {successMessage && <div>{successMessage}</div>}
        </div>
    );
};

export default Login;
