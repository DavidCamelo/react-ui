import React, { useState } from 'react';
import { Header } from 'components_ui/Header';
import UsersPage from 'user_ui/UsersPage';
import ProductsPage from 'product_ui/ProductsPage';
import './App.css'

const App = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-6 font-semibold rounded-t-lg transition-colors ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`py-2 px-6 font-semibold rounded-t-lg transition-colors ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
      </div>
      <div className="mt-6">
        {activeTab === 'users' && <UsersPage />}
        {activeTab === 'products' && <ProductsPage />}
      </div>
    </div>
  );
};

export default App
