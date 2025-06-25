import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from 'components_ui/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refreshToken'));
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        const { accessToken, refreshToken } = await authService.login(username, password);
        const userData = {
            name: username,
            avatarUrl: 'https://placehold.co/40x40/EFEFEF/3A3A3A?text=' + username.substring(0, 1).toUpperCase(),
        }
        setUser(userData);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
    };

    const logout = useCallback(async () => {
        const currentToken = sessionStorage.getItem('accessToken');
        if (currentToken) {
            try {
                await authService.logout(currentToken);
            } catch (error) {
                console.error("Logout failed on server, clearing session locally.", error);
            } finally {
                setUser(null);
                setAccessToken(null);
                setRefreshToken(null);
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('refreshToken');
            }
        }
    }, []);

    useEffect(() => {
        if (!refreshToken) {
            return;
        }

        const REFRESH_INTERVAL = 60000;

        const interval = setInterval(async () => {
            if (refreshToken && !loading) {
                setLoading(true);
                try {
                    const newAccessToken = await authService.refreshToken(refreshToken);
                    console.log('Access token refreshed');
                    setAccessToken(newAccessToken);
                    sessionStorage.setItem('accessToken', newAccessToken);
                } catch (error) {
                    console.error('Session expired. Please log in again.', error);
                    logout();
                } finally {
                    setLoading(false);
                }
            }
        }, REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, [refreshToken, logout, loading]);


    const value = {
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
        user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
