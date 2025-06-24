import React from 'react';
import { useAuth } from '../auth/useAuth';

export const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="text-center p-10 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h2 className="text-xl font-semibold text-yellow-800">Please log in to view this content.</h2>
                <p className="text-yellow-700 mt-2">Authentication is required to access the dashboard.</p>
            </div>
        );
    }

    return children;
};

export default PrivateRoute;
