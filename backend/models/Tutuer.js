const {sequelize} = require('../db/db');
const {DataTypes} = require('sequelize');



const Tuteur = sequelize.define('tuteur',{
    tuteurId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
       }, 
       fonction : DataTypes.STRING
},{
    tableName : 'tuteur',
    timestamps : false
});

module.exports = Tuteur;