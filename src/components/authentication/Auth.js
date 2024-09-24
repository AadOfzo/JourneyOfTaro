import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username'));

    useEffect(() => {
        const fetchUserData = async () => {
            if (token && username) {
                try {
                    const userDetails = await ApiService.fetchUserDetails(token, username);
                    setUser(userDetails);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    logout(); // Ensure token is cleared if fetching user details fails
                }
            }
        };
        fetchUserData();
    }, [token, username]);

    const login = (userData, authToken) => {
        localStorage.setItem('token', authToken.jwt);
        localStorage.setItem('username', userData.username);
        setUsername(userData.username);
        setToken(authToken.jwt);
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
