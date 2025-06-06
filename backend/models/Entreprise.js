const {sequelize} = require('../db/db');
const {DataTypes} = require('sequelize');



const Entreprise = sequelize.define('entreprise',{
    entrepriseId:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull : false
    }, 
    nom : DataTypes.STRING,
    secteur: DataTypes.STRING,
    adresse : DataTypes.STRING,
    siteWeb : DataTypes.STRING,
    description : DataTypes.STRING
},{
    tableName : 'entreprise',
    timestamps : false
});

module.exports = Entreprise;