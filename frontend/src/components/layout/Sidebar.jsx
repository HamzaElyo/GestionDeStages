import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Liens communs à tous les rôles
  /*const commonLinks = [
    { path: '/dashboard', label: 'Tableau de bord', icon: 'bi-speedometer2' }
  ];*/
  
  // Liens spécifiques par rôle
  const roleLinks = {
    etudiant: [
      { path: 'student/dashboard', label: 'Tableau de bord', icon: 'bi-speedometer2' },
      { path: '/student/applications', label: 'Mes candidatures', icon: 'bi-file-earmark-text' },
      { path: '/student/new-application', label: 'Nouvelle candidature', icon: 'bi-plus-circle' }
    ],
    entreprise: [
      { path: '/company/applications', label: 'Candidatures reçues', icon: 'bi-inbox' },
      { path: '/company/stages', label: 'Offres de stage', icon: 'bi-briefcase' }
    ],
    admin: [
      { path: '/admin/users', label: 'Utilisateurs', icon: 'bi-people' },
      { path: '/admin/stats', label: 'Statistiques', icon: 'bi-bar-chart' }
    ]
  };
  
  const currentLinks = [
    //...commonLinks,
    ...(roleLinks[user?.role] || [])
  ];

  return (
    <div className="bg-light border-end" style={{ width: '250px' }}>
      <Nav className="flex-column p-3">
        {currentLinks.map(link => (
          <Nav.Link 
            as={NavLink}
            to={link.path}
            key={link.path}
            active={location.pathname.startsWith(link.path)}
            className="d-flex align-items-center py-2 px-3 rounded"
          >
            <i className={`bi ${link.icon} me-2`}></i>
            {link.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;