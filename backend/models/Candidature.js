const {sequelize} = require('../db/db');
const {DataTypes} = require('sequelize');



const Candidature = sequelize.define('candidature', {
  CandidatureId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  datePostulation: DataTypes.DATE,
  status: DataTypes.STRING,
  commentaireEntreprise: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'stage', key: 'stageId' },
  },
  etudiantId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'etudiant', key: 'etudiantId' },
  },
  entrepriseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'entreprise', key: 'entrepriseId' },
  },
}, {
  tableName: 'candidature',
  timestamps: false,
});

module.exports = Candidature;