import React from 'react';
import { Footer } from 'components_ui/Footer';
import { Header } from 'components_ui/Header';
import { TabsLayout } from './tabs-layout/TabsLayout';
import './App.css';

const App = () => {
  return (
    <div className="app-container" style={{fontFamily: 'sans-serif'}}>
      <Header title="React UI" menuItems={[{ name: 'Home', href: '#' }, { name: 'About', href: '#'}]} />
      <TabsLayout />
      <Footer text="© 2025 David Camelo, Inc. All rights reserved." />
    </div>
  );
};

export default App;