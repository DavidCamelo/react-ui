import React, { createContext, useState } from 'react';
import { authService } from 'components_ui/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refreshToken'));

    const login = async (username, password) => {
        const { accessToken, refreshToken } = await authService.login(username, password);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    };

    const value = {
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
