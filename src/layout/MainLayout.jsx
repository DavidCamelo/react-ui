import React, { useState } from 'react';
import { Header } from 'components_ui/Header';
import { Login } from 'components_ui/Login';
import { Card } from 'components_ui/Card';
import { Modal } from 'components_ui/Modal';
import { TabsLayout } from './TabsLayout';
import { Footer } from 'components_ui/Footer';
import { authService } from 'components_ui/api';
import PrivateRoute from '../components/PrivateRoute';

const MainLayout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
      setUser(userData);
      setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
      setUser(null);
  };

  return (
    <>
      <Header
        title="React UI"
        menuItems={[{ name: 'Home', href: '#' }, { name: 'About', href: '#'}]}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        user={user}
      />
      <Card>
        {!user && <p>Please log in to see more content.</p>}
        {user && <p>{user.name} logged in.</p>}
      </Card>
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} title="Member Login">
        <Login
          service={authService}
          onLoginSuccess={handleLoginSuccess}
          onCancel={() => setIsLoginModalOpen(false)}
        />
      </Modal>
      <PrivateRoute>
        <TabsLayout />
      </PrivateRoute>
      <Footer text="© 2025 David Camelo, Inc. All rights reserved." />
    </>
  );
};

export default MainLayout;
