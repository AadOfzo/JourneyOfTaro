import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const userDetails = await ApiService.fetchUserDetails(token);
                    setUser(userDetails);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };
        fetchUserData();
    }, [token]);

    const login = (userData, authToken) => {
        setUser(userData);
        localStorage.setItem('token', authToken);
        setToken(authToken);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
