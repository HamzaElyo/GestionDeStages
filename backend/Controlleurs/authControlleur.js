const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const db = require('../models/index');



exports.signup = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password, nom, prenom, role } = req.body;

  try {
    // Vérifie si un utilisateur avec le même email existe déjà
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "L'utilisateur existe déjà" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const newUser = await db.User.create({
      email,
      pwd: hashedPassword,         // 🔐 on stocke dans le champ `pwd` (pas `password`)
      nom,
      prenom,
      role,
      dateInscription: new Date(),
      actif: true
    });

    // Préparation du payload JWT
    const payload = {
      id: newUser.userId,
      email: newUser.email,
      nom: newUser.nom,
      role: newUser.role
    };

    // Génération du token
    jwt.sign(
      payload,
      process.env.secretOrkey || "default_secret",
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          success: true,
          user: {
            userId: newUser.userId,
            nom: newUser.nom,
            prenom: newUser.prenom,
            email: newUser.email,
            role: newUser.role,
            dateInscription: newUser.dateInscription
          },
          token: "Bearer " + token
        });
      }
    );
  } catch (error) {
    const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
    res.status(statusCode).json({
      message: "Erreur lors de la création du compte",
      error: error.message,
      details: error.errors?.map(err => err.message)
    });
  }
};


exports.login = async (req, res) =>{
    const {errors, isValid } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await db.User.findOne({ 
        where: { email},
        });
        if (!user) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.pwd);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }
        
        //User Matched
        const payload = {
                        id: user.userId,
                        email: user.email,
                        nom: user.nom,
                        role: user.role
                        };

        //Sign Token
        jwt.sign(
            payload,
            process.env.secretOrkey, 
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