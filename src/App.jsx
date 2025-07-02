import React from 'react';
import { ThemeProvider } from 'components_ui/ThemeContext';
import { AuthProvider } from './auth/AuthContext';
import { MainLayout } from './layout/MainLayout';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-container" style={{fontFamily: 'sans-serif'}}>
          <MainLayout />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;