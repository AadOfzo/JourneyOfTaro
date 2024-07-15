import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/Auth'; // Update import path
import ApiService from '../../configs/utilities/axios/ApiService';
import SuccessMessage from '../messaging/SuccessMessage';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Use useAuth hook to access login function
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { jwt } = await ApiService.authenticate(username, password);
            login({ username }, jwt);
            setSuccessMessage('Login successful');
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h3>Login</h3>
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
            {successMessage && <SuccessMessage message={successMessage} />}
        </div>
    );
};

export default LoginForm;
