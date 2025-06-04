import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { StageProvider } from './contexts/StageContext';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <StageProvider>
        <Router>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </Router>
      </StageProvider>
    </AuthProvider>
  );
}

export default App;