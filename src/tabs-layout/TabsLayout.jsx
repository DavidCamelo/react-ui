import React from 'react';
import { Tabs } from 'components_ui/Tabs';
import { UsersPage } from 'user_ui/UsersPage';
import { ProductsPage } from 'product_ui/ProductsPage';

export const TabsLayout = () => {

  const tabs = [
      { name: 'Users', content: <UsersPage /> },
      { name: 'Products', content: <ProductsPage /> },
  ];

  return (
    <>
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <Tabs tabs={tabs} />
      </div>
    </>
  );
};