import React from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/constants';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl p-8 bg-white rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Plateforme de Gestion de Stages
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Connectez étudiants et entreprises pour des stages réussis. 
          Simplifiez le processus de candidature, de sélection et de suivi.
        </p>
        
        <div className="flex justify-center gap-6">
          <Link 
            to={PATHS.LOGIN} 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Se connecter
          </Link>
          
          <Link 
            to={PATHS.REGISTER} 
            className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;