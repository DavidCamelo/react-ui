import React, { useState } from 'react';
import { Header } from 'components_ui/Header';
import { Footer } from 'components_ui/Footer';
import { Modal } from 'components_ui/Modal';
import { Login } from 'components_ui/Login';
import { Tabs } from 'components_ui/Tabs';
import { UsersPage } from 'user_ui/UsersPage';
import { ProductsPage } from 'product_ui/ProductsPage';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from '../auth/useAuth';

export const MainLayout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { logout, user } = useAuth();

  const onClose = () => {
    setIsLoginModalOpen(false)
  }

  const menuItems = [{ name: 'Users', href: 'users' }, { name: 'Products', href: 'products'}];
  const tabs = [{ name: 'Users', content: <UsersPage /> }, { name: 'Products', content: <ProductsPage /> }];

  return (
    <>
      <Header title="React UI"
        menuItems={menuItems}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={logout}
        user={user}
      />
      <Modal title="Login" isOpen={isLoginModalOpen} onClose={onClose}>
          <Login service={useAuth()} onLoginSuccess={onClose} onCancel={onClose} />
      </Modal>
      <PrivateRoute>
        <div className="container mx-auto p-4 bg-gray-50">
          <Tabs tabs={tabs} />
        </div>
      </PrivateRoute>
      <Footer text="© 2025 David Camelo, Inc. All rights reserved." />
    </>
  );
};

export default MainLayout;
