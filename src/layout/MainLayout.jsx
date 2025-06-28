import React, { useState } from 'react';
import { Footer } from 'components_ui/Footer';
import { Header } from 'components_ui/Header';
import { Login } from 'components_ui/Login';
import { Modal } from 'components_ui/Modal';
import { PrivateRoute } from 'components_ui/PrivateRoute';
import { SignUp } from 'components_ui/SignUp';
import { Tabs } from 'components_ui/Tabs';
import { UsersPage } from 'user_ui/UsersPage';
import { ProductsPage } from 'product_ui/ProductsPage';
import { useAuth } from '../auth/useAuth';

export const MainLayout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { logout, user } = useAuth();

    const handleLoginSuccess = (userData) => {
        console.log(userData);
        setIsLoginModalOpen(false);
    };

    const handleSignUpSuccess = (userData) => {
        console.log(userData);
        setIsSignUpModalOpen(false);
    };

  const onClose = () => {
    setIsLoginModalOpen(false)
    setIsSignUpModalOpen(false)
  }

  const menuItems = [{ name: 'Users', href: 'users' }, { name: 'Products', href: 'products' }];
  const tabs = [{ name: 'Users', content: <UsersPage /> }, { name: 'Products', content: <ProductsPage /> }];

  return (
    <>
      <Header title="React UI"
        menuItems={menuItems}
        onLogoutClick={logout}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignUpClick={() => setIsSignUpModalOpen(true)}
        user={user}
      />
      <Modal title="Login" isOpen={isLoginModalOpen} onClose={onClose}>
          <Login service={useAuth()} onLoginSuccess={handleLoginSuccess} onCancel={onClose} />
      </Modal>
      <Modal title="Create Account" isOpen={isSignUpModalOpen} onClose={onClose}>
          <SignUp service={useAuth()} onSignUpSuccess={handleSignUpSuccess} onCancel={onClose} />
      </Modal>
      <div className="container mx-auto p-4 bg-gray-50">
      <PrivateRoute
        hasPermission={user}
        fallbackMessage={
          <div>
            <h2 className="text-xl font-semibold">Please log in to view this content.</h2>
            <p className="mt-2">Authentication is required to access the dashboard.</p>
          </div>
        }
        children={<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />}
      />
      </div>
      <Footer text="© 2025 David Camelo, Inc. All rights reserved." />
    </>
  );
};

export default MainLayout;
