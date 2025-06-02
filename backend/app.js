const express = require('express');
const app = express();
const db=require('./models');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Synchronisation des modèles avec la base de données
db.sequelize.sync({ alter: true })
  .then(() => console.log('La base de données a été synchronisée.'))
  .catch(err => console.error('Erreur lors de la synchronisation de la base de données:', err));

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de Gestion de stages!' });
});
app.use('/auth', authRoutes);
// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Une erreur est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

