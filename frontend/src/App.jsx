import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { StageProvider } from './contexts/StageContext';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './contexts/AuthContext';

// ✅ Ce composant est utilisé à l'intérieur de AuthProvider
const AppContent = () => {
  const { user } = useAuth();

  return (
    <MainLayout isAuthenticated={!!user}>
      <AppRoutes />
    </MainLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <StageProvider>
        <Router>
          <AppContent />
        </Router>
      </StageProvider>
    </AuthProvider>
  );
}

export default App;
