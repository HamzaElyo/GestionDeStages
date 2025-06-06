const express = require('express');
const app = express();
const cors = require('cors');
const db=require('./models');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const etudiantRoutes = require('./routes/etudiantRoutes');
const entrepriseRoutes = require('./routes/entrepriseRoutes');
const tuteurRoutes = require('./routes/tuteurRoutes');
const stageRoutes = require('./routes/stageRoutes');
const candidatureRoutes = require('./routes/candidatureRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/AdminRoutes');



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Synchronisation des modèles avec la base de données
/*db.sequelize.sync({ alter: true })
  .then(() => console.log('La base de données a été synchronisée.'))
  .catch(err => console.error('Erreur lors de la synchronisation de la base de données:', err));
*/
// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de Gestion de stages!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/entreprises', entrepriseRoutes);
app.use('/api/tuteurs', tuteurRoutes);
app.use('/api/stages', stageRoutes);
app.use('/api/candidatures', candidatureRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

