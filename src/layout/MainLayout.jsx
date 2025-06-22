import React, { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { Header } from 'components_ui/Header';
import { TabsLayout } from './TabsLayout';
import LoginModal from '../components/LoginModal';
import { Footer } from 'components_ui/Footer';
import PrivateRoute from '../components/PrivateRoute';

const MainLayout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <Header
        title="React UI"
        menuItems={[{ name: 'Home', href: '#' }, { name: 'About', href: '#'}]}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={logout}
        user={ isAuthenticated ? {avatarUrl: 'https://placehold.co/40x40/EFEFEF/3A3A3A?text=JD', name: 'Jane Doe'} : null }
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <PrivateRoute>
        <TabsLayout />
      </PrivateRoute>
      <Footer text="© 2025 David Camelo, Inc. All rights reserved." />
    </>
  );
};

export default MainLayout;
