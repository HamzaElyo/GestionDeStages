const {sequelize} = require('../db/db');
const {DataTypes} = require('sequelize');



const Stage = sequelize.define('stage',{
    stageId :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    }, 
    titre: DataTypes.STRING, 
    description: DataTypes.STRING, 
    dateDebut: DataTypes.DATE, 
    dateFin: DataTypes.DATE, 
    status : DataTypes.BOOLEAN, 
    commentaire : DataTypes.STRING
},{
    tableName : 'stage',
    timestamps : false
});

module.exports = Stage;