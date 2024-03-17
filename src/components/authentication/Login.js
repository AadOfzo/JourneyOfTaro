import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from "../messaging/SuccessMessage";

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username,
                password
            });

            const token = localStorage.getItem('token');

            if (!token) {
                setError('Invalid token received');
                return;
            }

            localStorage.setItem('token', token);

            setShowSuccessMessage(true);
            onLoginSuccess();
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
            {showSuccessMessage && <SuccessMessage message="Thank you for signing in!" />}
        </div>
    );
};

export default Login;
