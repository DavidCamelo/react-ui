import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from 'components_ui/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refreshToken'));
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        const { accessToken, refreshToken, accessTokenExpiration, refreshTokenExpiration } = await authService.login(username, password);
        const expirationTime = Date.now() + accessTokenExpiration;
        const refreshExpirationTime = Date.now() + refreshTokenExpiration;
        console.log('Login successful, access token expires at:', new Date(expirationTime).toLocaleString());
        console.log('Refresh token expires at:', new Date(refreshExpirationTime).toLocaleString());
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
        sessionStorage.setItem('accessTokenExpiration', expirationTime);
    };

    const logout = useCallback(async () => {
        const currentToken = sessionStorage.getItem('accessToken');
        if (currentToken) {
            try {
                await authService.logout(currentToken);
            } catch (error) {
                console.error("Logout failed on server, clearing session locally.", error);
            }
        }
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        sessionStorage.clear();
    }, []);

    const refreshAuthToken = useCallback(async () => {
        const currentRefreshToken = sessionStorage.getItem('refreshToken');
        if (currentRefreshToken && !loading) {
            setLoading(true);
            try {
                const { accessToken, accessTokenExpiration } = await authService.refreshToken(currentRefreshToken);
                const expirationTime = Date.now() + accessTokenExpiration;
                console.log('Token refreshed successfully');
                setAccessToken(accessToken);
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('accessTokenExpiration', expirationTime);
            } catch (error) {
                console.error('Session expired. Please log in again.', error);
                logout();
            } finally {
                setLoading(false);
            }
        }
    }, [logout, loading]);

    useEffect(() => {
        const expirationTimeStr = sessionStorage.getItem('accessTokenExpiration');
        if (!accessToken || !expirationTimeStr) {
            return;
        }
        const expirationTime = parseInt(expirationTimeStr, 10);
        console.log('Next token refresh scheduled at:', new Date(expirationTime - (60 * 1000)).toLocaleString());
        const now = Date.now();
        const delay = expirationTime - now - (60 * 1000); // Refresh 1 minute before expiration
        if (delay <= 0) {
            refreshAuthToken();
            return;
        }
        const timerId = setTimeout(refreshAuthToken, delay);
        return () => clearTimeout(timerId);
    }, [accessToken, refreshAuthToken]);

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
