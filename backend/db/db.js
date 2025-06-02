require('dotenv').config();
const {Sequelize} = require('sequelize');



const sequelize = new Sequelize({
    database : process.env.DB_NAME,
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    dialect : process.env.DB_DIALECT
});


sequelize.authenticate()
        .then(()=> console.log('Connexion à la base de donnée réussie'))
        .catch(err =>console.log('Une erreur a été rencontrée lors de la connexion à la base de données :', err));


module.exports = {sequelize};