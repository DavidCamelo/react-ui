import React, { useState } from 'react';
import { Login } from 'components_ui/Login';
import { Modal } from 'components_ui/Modal';
import { SignUp } from 'components_ui/SignUp';
import { useAuth } from 'components_ui/AuthContext';

export const LoginSignUpLayout = ({ isLoginModalOpen, isSignUpModalOpen, onClose }) => {

  const handleSuccess = (userData) => {
      console.log(userData);
      onClose();
  };

  return (
    <>
      <Modal title="Login" isOpen={isLoginModalOpen} onClose={onClose}>
          <Login service={useAuth()} onLoginSuccess={handleSuccess} onCancel={onClose} />
      </Modal>
      <Modal title="Create Account" isOpen={isSignUpModalOpen} onClose={onClose}>
          <SignUp service={useAuth()} onSignUpSuccess={handleSuccess} onCancel={onClose} />
      </Modal>
    </>
  );
};

export default LoginSignUpLayout;
