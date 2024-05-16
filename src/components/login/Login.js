import React, { useState } from 'react';
import axios from 'axios';
import SuccessMessage from "../messaging/SuccessMessage";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username,
                password,
            });
            const { jwt } = response.data; // Assuming the server responds with a JWT token
            localStorage.setItem('token', jwt); // Store the token in localStorage
            setSuccessMessage('Login successful'); // Set success message
            // Redirect the user to another page or update UI to reflect authentication
        } catch (error) {
            setError('Invalid username or password'); // Display error message to user
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
            {successMessage && <SuccessMessage message={successMessage} />} {/* Display success message if exists */}
        </div>
    );
};

export default LoginForm;
