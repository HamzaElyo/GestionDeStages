import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css';  // Import des styles globaux// Fichier CSS global (optionnel)
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);