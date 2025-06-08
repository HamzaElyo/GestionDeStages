const { sequelize } = require('../db/db');
const User = require('./User');
const Candidature = require('./Candidature');
const Entreprise = require('./Entreprise');
const Etudiant = require('./Etudiant');
const Stage = require('./Stage');
const Tuteur = require('./Tuteur');

// Associations Candidature
Candidature.belongsTo(Stage, {
  foreignKey: 'stageId',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

Candidature.belongsTo(Etudiant, {
  foreignKey: 'etudiantId',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

Candidature.belongsTo(Entreprise, {
  foreignKey: 'entrepriseId',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});
//Association Stage
Stage.belongsTo(Entreprise, {
  foreignKey: 'entrepriseId',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
})

Stage.belongsTo(Tuteur, {
  foreignKey: 'tuteurId',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
  });
// Associations Tuteur
Tuteur.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Tuteur.belongsTo(Entreprise, {
  foreignKey: 'entrepriseId',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

// Association Etudiant
Etudiant.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Association Entreprise
Entreprise.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = {
  sequelize,
  User,
  Candidature,
  Entreprise,
  Etudiant,
  Stage,
  Tuteur
};
