const { sequelize } = require('../db/db');
const { DataTypes } = require('sequelize');

const Stage = sequelize.define('Stage', {
  stageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.STRING,
  dateDebut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  commentaire: DataTypes.STRING
}, {
  tableName: 'stage',
  timestamps: false
});



module.exports = Stage;
