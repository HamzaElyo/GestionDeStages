// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import StudentDashboard from '../pages/student/Dashboard';
import Applications from '../pages/student/Applications';
import NewApplication from '../pages/student/NewApplication';
import CompanyDashboard from '../pages/company/Dashboard';
import ApplicationDetail from '../pages/company/ApplicationDetail';
import AdminDashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Stats from '../pages/admin/Stats';
import Unauthorized from '../pages/public/Unauthorised'; // Créez ce composant
import HomePage from '../pages/public/HomePage';
import CompanyApplications from '../pages/company/Applications';
import GestionStages from '../pages/company/StageManagement';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Redirection par défaut */}
      <Route path="/" element={<HomePage />} />
      
      {/* Espace étudiant */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute roles={['etudiant']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/student/applications" element={
        <ProtectedRoute roles={['etudiant']}>
          <Applications />
        </ProtectedRoute>
      } />
      <Route path="/student/new-application" element={
        <ProtectedRoute roles={['etudiant']}>
          <NewApplication />
        </ProtectedRoute>
      } />
      
      {/* Espace entreprise */}
      <Route path="/company/dashboard" element={
        <ProtectedRoute roles={['entreprise']}>
          <CompanyDashboard />
        </ProtectedRoute>
      } />
        <Route path="/company/applications" element={ // NOUVELLE ROUTE
        <ProtectedRoute roles={['entreprise']}>
          <CompanyApplications />
        </ProtectedRoute>
      } />
      <Route path="/company/application/:id" element={
        <ProtectedRoute roles={['entreprise']}>
          <ApplicationDetail />
        </ProtectedRoute>
      } />
      <Route path="/company/stages" element={
        <ProtectedRoute roles={['entreprise']}>
          <GestionStages/>
        </ProtectedRoute>
      } />
      
      {/* Espace admin - TOUTES LES ROUTES PROTÉGÉES */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute roles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute roles={['admin']}>
          <Users />
        </ProtectedRoute>
      } />
      <Route path="/admin/stats" element={
        <ProtectedRoute roles={['admin']}>
          <Stats />
        </ProtectedRoute>
      } />
      
      {/* Route de secours pour les pages non trouvées */}
      <Route path="*" element={<div>Page non trouvée</div>} />
    </Routes>
  );
};

export default AppRoutes;