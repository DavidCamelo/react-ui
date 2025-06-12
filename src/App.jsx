import React, { useState } from 'react';
import { Tabs } from 'components_ui/Tabs';
import { UsersPage } from 'user_ui/UsersPage';
import { ProductsPage } from 'product_ui/ProductsPage';
import { Header } from 'components_ui/Header';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('users');
  const tabs = [
      { name: 'users', label: 'Users' },
      { name: 'products', label: 'Products' },
  ];

  return (
    <>
      <Header label="Example Header" onCreateAccount={() => {}} onLogin={() => {}} onLogout={() => {}} user={{name: 'David Camelo'}}/>
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'users' && <UsersPage />}
          {activeTab === 'products' && <ProductsPage />}
        </div>
      </div>
    </>
  );
};

export default App;
