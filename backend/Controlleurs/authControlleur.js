const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const db = require('../db/db');




exports.signup = async (req, res)  =>{
    const {errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { username, password, ...rest } = req.body;
     try {
        const existingUser = await db.User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: "L'utilisateur existe déjà" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({
            ...rest,
            username,
            password: hashedPassword
        });
        jwt.sign(
                payload,
                keys.secretOrkey, 
                {expiresIn: 3600 },
                (err, token)=>{
                    res.json({
                        user,
                        success : true,
                        token : 'Bearer ' + token
                    });
                });

  } catch (error) {
    const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
    res.status(statusCode).json({
      message: error.message || "Erreur lors de la création du compte",
      errors: error.errors?.map(err => err.message)
    });
  }

   
}


exports.login = async (req, res) =>{
    const {errors, isValid } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await db.User.findAll({ 
        where: { email},
        logging : console.log
      //attributes: ['id', 'password', 'username', 'ecole'] 
        });
        if (!user) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.pwd);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }
        
        //User Matched
        const payload= { id : user.id, name: user.name , avatar : user.avatar}

        //Sign Token
        jwt.sign(
            payload,
            keys.secretOrkey, 
            {expiresIn: 3600 },
            (err, token)=>{
                res.json({
                    success : true,
                    token : 'Bearer ' + token
                });
            });

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de l'authentification",
            error: process.env.NODE_ENV === 'development' ? error.message : error.message
        });
    }
}