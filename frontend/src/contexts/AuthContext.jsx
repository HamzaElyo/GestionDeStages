import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ajoutez cette dépendance
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Décoder le token JWT pour obtenir les infos utilisateur
  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Erreur de décodage du token', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser({
          id: decodedUser.id,
          email: decodedUser.email,
          nom: decodedUser.nom,
          role: decodedUser.role
        });
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const token = response.data.token.replace('Bearer ', '');
    localStorage.setItem('token', token);
    
    const decodedUser = decodeToken(token);
    setUser({
      id: decodedUser.id,
      email: decodedUser.email,
      nom: decodedUser.nom,
      role: decodedUser.role
    });
    
    return response.data;
  };

  const register = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    const token = response.data.token.replace('Bearer ', '');
    localStorage.setItem('token', token);
    
    const decodedUser = decodeToken(token);
    setUser({
      id: decodedUser.id,
      email: decodedUser.email,
      nom: decodedUser.nom,
      role: decodedUser.role
    });
    
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);