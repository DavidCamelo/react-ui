import React, { useState } from 'react';
import { Header } from 'components_ui/Header';
import { Footer } from 'components_ui/Footer';
import { LoginLayout } from './LoginLayout';
import { TabsLayout } from './TabsLayout';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from '../auth/useAuth';

export const MainLayout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <>
      <Header title="React UI"
        menuItems={[]}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={logout}
        user={user}
      />
      <LoginLayout isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <PrivateRoute>
        <TabsLayout />
      </PrivateRoute>
      <Footer text="© 2025 David Camelo, Inc. All rights reserved." />
    </>
  );
};

export default MainLayout;
