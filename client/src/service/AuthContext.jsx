import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshAccessToken, clearAccessToken } from './axios'; // Import axiosInstance

const API_URL = 'http://localhost:5000/api/user';
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // const [isRefreshing, setIsRefreshing] = useState(false);

    const login = async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/signin`, userData, { withCredentials: true });
            localStorage.setItem('user', JSON.stringify(response.data || {}));
            setUser(response.data);
            await refreshAccessToken(); // Refresh access token after login
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
            throw err; 
        }
    };


    const logout = async () => {
        setLoading(true);
        try {
            await axios.get(`${API_URL}/logout`);
            setUser(null);
            clearAccessToken();
            localStorage.removeItem('user');
            Cookies.remove('refreshtoken');
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                await refreshAccessToken();
            } catch (err) {
                console.error("Failed to refresh access token on load:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccessToken();
    }, []);

    const value = {
        user,
        login,
        logout,
        loading,
        error,
        refreshAccessToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
