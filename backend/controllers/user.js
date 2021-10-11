const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../models");

const User = db.user;

// Création et sauvegarde d'un utilisateur
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
        user_name: req.body.user_name,
        email: req.body.email,
        password: hash
      };
      User.create(user)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
