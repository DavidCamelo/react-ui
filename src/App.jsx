import React from 'react';
import { Header } from 'components_ui/Header';
import { TabsLayout } from './tabs-layout/TabsLayout';
import './App.css';

const App = () => {
  return (
    <>
      <Header label="Example Header" onCreateAccount={() => {}} onLogin={() => {}} onLogout={() => {}} user={{name: 'David Camelo'}}/>
      <TabsLayout />
    </>
  );
};

export default App;