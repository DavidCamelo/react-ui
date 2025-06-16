import React from 'react';
import { Header } from 'components_ui/Header';
import { TabsLayout } from './tabs-layout/TabsLayout';
import './App.css';

const App = () => {
  return (
    <>
      <Header title="React UI" menuItems={[{ name: 'Home', href: '#' }, { name: 'About', href: '#'}]} />
      <TabsLayout />
    </>
  );
};

export default App;