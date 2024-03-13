import React, { createContext, useState } from 'react';

// Create a context for managing authentication state
export const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Method to handle user login
    const login = (userData) => {
        setUser(userData);
    };

    // Method to handle user logout
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
