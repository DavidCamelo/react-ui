import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import MainLayout from './layout/MainLayout';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <div className="app-container" style={{fontFamily: 'sans-serif'}}>
        <MainLayout />
      </div>
    </AuthProvider>
  );
};

export default App;