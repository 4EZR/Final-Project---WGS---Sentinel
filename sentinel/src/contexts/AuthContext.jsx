import React, { createContext, useState, useEffect } from 'react';
import { login, refreshToken } from '@/services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const loginUser = async (email) => {
        const data = await login(email);
        setUser(data.user);
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    };

    const refreshUserToken = async () => {
        try {
            const data = await refreshToken();
            localStorage.setItem('accessToken', data.token);
            return data.token;
        } catch (error) {
            logoutUser();
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login: loginUser, logout: logoutUser, refreshToken: refreshUserToken }}>
            {children}
        </AuthContext.Provider>
    );
};