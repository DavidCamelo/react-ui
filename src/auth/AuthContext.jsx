import React, { createContext, useState } from 'react';
import { authService } from 'components_ui/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refreshToken'));

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

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    };

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
