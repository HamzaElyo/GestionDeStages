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

  const {
    email, password, nom, prenom, role, photo,
    niveau, filiere, nomEntreprise, secteur,
    adresse, siteWeb, description, fonction
  } = req.body;

  try {
    // Vérifier l'existence de l'utilisateur
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "L'utilisateur existe déjà" });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur principal
    const newUser = await db.User.create({
      email,
      pwd: hashedPassword,
      nom,
      prenom,
      role,
      dateInscription: new Date(),
      actif: true,
      photo
    });

    // Création des entités spécifiques selon le rôle
    if (role === 'etudiant') {
      await db.Etudiant.create({
        userId: newUser.userId,
        niveau,
        filiere,
        cv: req.files?.cv?.[0]?.filename || null,
        lettreMotivation: req.files?.lettreMotivation?.[0]?.filename || null
      });
    } else if (role === 'entreprise') {
      await db.Entreprise.create({
        userId: newUser.userId,
        nom: nomEntreprise,
        secteur,
        adresse,
        siteWeb,
        description
      });
    } else if (role === 'tuteur') {
      // On suppose ici que l’entreprise existe déjà
      const entreprise = await db.Entreprise.findOne({ where: { nom: nomEntreprise } });
      if (!entreprise) {
        return res.status(400).json({ message: "Entreprise non trouvée pour le tuteur" });
      }
      await db.Tuteur.create({
        userId: newUser.userId,
        entrepriseId: entreprise.entrepriseId,
        fonction
      });
    }

    // Génération du token
    const payload = {
      id: newUser.userId,
      email: newUser.email,
      nom: newUser.nom,
      role: newUser.role
    };

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