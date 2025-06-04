import React, { createContext, useContext, useState, useEffect } from 'react';
import studentService from '../services/studentService';
import companyService from '../services/companyService';
import { useAuth } from './AuthContext'; // Ajuste le chemin si nécessaire


const StageContext = createContext();

export const StageProvider = ({ children }) => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Supposons que useAuth est disponible
  const fetchStages = async () => {
      try {
        let data = [];
        
        if (user?.role === 'etudiant') {
          data = await studentService.getAvailableStages();
        } else if (user?.role === 'entreprise') {
          data = await companyService.getCompanyStages(user.id);
        }
        
        setStages(data);
      } catch (err) {
        setError('Erreur de chargement des stages');
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    if (user) fetchStages();
  }, [user]);

  const value = {
    stages,
    loading,
    error,
    refreshStages: () => {
      setLoading(true);
      fetchStages();
    }
  };

  return (
    <StageContext.Provider value={value}>
      {children}
    </StageContext.Provider>
  );
};

export const useStages = () => useContext(StageContext);