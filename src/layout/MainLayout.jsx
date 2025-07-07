import React, { useState } from 'react';
import { LoginSignUpLayout } from './LoginSignUpLayout';
import { TabsLayout } from './TabsLayout';
import { Footer } from 'components_ui/Footer';
import { Header } from 'components_ui/Header';
import { useAuth } from 'components_ui/AuthContext';

export const MainLayout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { logout, user } = useAuth();

  const onClose = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
  }

  const menuItems = [{ name: 'Users', href: 'users' }, { name: 'Products', href: 'products' }];

  return (
    <>
      <Header title="React UI"
        menuItems={menuItems}
        onLogoutClick={logout}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignUpClick={() => setIsSignUpModalOpen(true)}
        user={user}
      />
      <LoginSignUpLayout isLoginModalOpen={isLoginModalOpen} isSignUpModalOpen={isSignUpModalOpen} onClose={onClose} />
      <main style={{padding: '2rem'}}>
        <TabsLayout />
      </main>
      <Footer text={`© ${new Date().getFullYear()} David Camelo, Inc. All Rights Reserved.`} />
    </>
  );
};

export default MainLayout;
