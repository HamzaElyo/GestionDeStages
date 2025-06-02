const {sequelize} = require('../db/db');
const {DataTypes} = require('sequelize');



const User = sequelize.define('User',{
userId:{
    type :DataTypes.INTEGER,
    allowNull : false,
    primaryKey : true,
    autoIncrement : true
}, 
nom: DataTypes.STRING,
prenom: DataTypes.STRING,
email: {
    type :DataTypes.STRING,
    unique : true
},
pwd : DataTypes.STRING,
role : DataTypes.STRING,
dateInscription : DataTypes.DATE,
actif: DataTypes.BOOLEAN
},
{
    tableName : 'user',
    timestamps : false
});

module.exports = User;