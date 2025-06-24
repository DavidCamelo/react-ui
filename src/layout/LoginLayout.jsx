import React, { useState } from 'react';
import { Modal } from 'components_ui/Modal';
import { Login } from 'components_ui/Login';
import { useAuth } from '../auth/useAuth';

export const LoginLayout = ({ isOpen, onClose }) => {
    const handleLoginSuccess = (userData) => {
        console.log('Login successful:', userData);
        onClose();
    }

    return (
        <Modal title="Login" isOpen={isOpen} onClose={onClose}>
            <Login service={useAuth()} onLoginSuccess={onClose} onCancel={onClose} />
        </Modal>
    );
};

export default LoginLayout;
