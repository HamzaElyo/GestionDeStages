const { sequelize } = require('../db/db');
const User = require('./User');
const Candidature =require('./Candidature');
const Entreprise = require('././Entreprise');
const Etudiant = require('./Etudiant');
const Stage = require('./Stage');
const Tuteur = require('./Tutuer');

Candidature.belongsTo(Stage);
Candidature.belongsTo(Etudiant);
Candidature.belongsTo(Entreprise);

Tuteur.belongsTo(User);
Tuteur.belongsTo(Entreprise);

Etudiant.belongsTo(User);

Entreprise.belongsTo(User);



module.exports = {
  sequelize,
  User,
  Candidature,
  Entreprise,
  Etudiant,
  Stage,
  Tuteur
};
