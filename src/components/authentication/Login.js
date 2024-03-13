import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username,
                password
            });

            // Assuming backend returns a JWT token upon successful authentication
            const token = response.data.token;

            // Store the token in local storage
            localStorage.setItem('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUZXN0QWRtaW5fMiIsImlhdCI6MTcxMDI0NjE5NCwiZXhwIjoxNzExMTEwMTk0fQ.qRH6IybOC4-SDTMja3PcKck3Eh0b8G-IjGGlvcwrJ_A', token);

            // Call the onLoginSuccess callback function
            onLoginSuccess();

            // Redirect the user to the dashboard or any other protected route
            // Example: history.push('/dashboard');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username or Email:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
