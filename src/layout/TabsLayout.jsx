import React, { useState } from 'react';
import { Tabs } from 'components_ui/Tabs';
import { PrivateRoute } from 'components_ui/PrivateRoute';
import { UsersPage } from 'user_ui/UsersPage';
import { ProductsPage } from 'product_ui/ProductsPage';
import { useAuth } from 'components_ui/AuthContext';

export const TabsLayout = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { user } = useAuth();

  const tabs = [{ name: 'Users', content: <UsersPage /> }, { name: 'Products', content: <ProductsPage /> }];

  return (
    <>
      <PrivateRoute
        hasPermission={user}
        fallbackMessage={
          <div>
            <h2 className="text-xl font-semibold">Please log in to view this content.</h2>
            <p className="mt-2">Authentication is required to access the dashboard.</p>
            <p className="mt-3">To login you can use 'user@test.com' and 'password'</p>
          </div>
        }
        children={<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />}
      />
    </>
  );
};

export default TabsLayout;
