import React, { createContext, useContext, useState } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (userData, authToken) => {
        setUser(userData);
        localStorage.setItem('token', authToken);
        setToken(authToken);
    };

    const handleLogin = async (setIsLoggedIn) => {
        const token = 'your_token_value'; // Replace with actual token value obtained from login
        localStorage.setItem('token', token);
        setToken(token);
        setIsLoggedIn(true);

        try {
            const userDetails = await ApiService.fetchUserDetails(token);
            setUser(userDetails.username); // Update setUser with appropriate value from userDetails
        } catch (error) {
            console.error('Error fetching user details after login:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const handleLogout = async (setUserName, setUserRole) => {
    try {
        localStorage.removeItem('token');
        setUserName(''); // Reset user name
        setUserRole('visitor'); // Reset user role
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};
