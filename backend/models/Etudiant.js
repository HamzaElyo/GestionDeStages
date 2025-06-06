const {sequelize} = require('../db/db');
const {DataTypes} = require('sequelize');



const Etudiant = sequelize.define('etudiant',{
    etudiantId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
        allowNull : false
    }, 
    niveau : DataTypes.STRING, 
    filiere : DataTypes.STRING, 
    cv: DataTypes.STRING, 
    lettreMotivation : DataTypes.STRING

},{
    tableName: 'etudiant',
    timestamps: false
});

module.exports = Etudiant;