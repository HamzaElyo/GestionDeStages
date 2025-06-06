import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>JobConnect</h5>
            <p className="mb-0">
              Plateforme de gestion des stages en entreprise
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;