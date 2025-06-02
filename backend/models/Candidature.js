const {sequelize} = require('../db/db');
const {DataTypes} = require('sequelize');



const Candidature = sequelize.define('candidature',{
    CandidatureId:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    datePostulation : DataTypes.DATE,
    status : DataTypes.BOOLEAN,
    commentaireEntreprise : DataTypes.STRING

},{
    tableName : 'candidature',
    timestamps: false
});

module.exports = Candidature;