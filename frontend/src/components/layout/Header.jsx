import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-primary text-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="text-white text-decoration-none">
          <h1 className="m-0">JobConnect</h1>
        </Link>
        
        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="me-3">
                <i className="bi bi-person-circle me-2"></i>
                {user.nom} {user.prenom} ({user.role})
              </span>
              <button 
                className="btn btn-outline-light"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-light me-2">
                Se Connecter
              </Link>
              <Link to="/register" className="btn btn-light">
                Créer un compte
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;