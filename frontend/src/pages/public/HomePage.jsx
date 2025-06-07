import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

const HomePage = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 300);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div 
        className="relative flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className={`max-w-4xl mx-auto text-center text-white transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="block mb-2">Plateforme de</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Gestion de Stages
            </span>
          </h1>

          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Connectez étudiants et entreprises pour des stages réussis. 
            Simplifiez le processus de candidature, de sélection et de suivi.
          </p>
            {user ? (
                <>
                </>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto callAction">
                    <Link to={PATHS.LOGIN} className="btn btn-primary w-full sm:w-auto text-center">
                      Se connecter
                    </Link>
                    <p></p>
                    <Link to={PATHS.REGISTER} className="btn btn-primary w-full sm:w-auto text-center">
                      Créer un compte
                    </Link>
                  </div>
                </>
              )}


        </div>

        {/* Bulles animées */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-400 opacity-20"
              style={{
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
