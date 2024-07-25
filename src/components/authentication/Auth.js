import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUserName] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            console.log(token);
            if (token) {
                try {
                    const userDetails = await ApiService.fetchUserDetails(token, username);
                    console.log(userDetails);
                    setUser(userDetails);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    logout(); // Ensure token is cleared if fetching user details fails
                }
            }
        };
        fetchUserData();
    }, [token]);

    const login = (userData, authToken) => {
        console.log(userData)
        setUserName(userData.username);
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
