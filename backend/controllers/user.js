const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../models");

const User = db.user;

// Création et sauvegarde d'un utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: hash
            };
            User.create(user)
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        accessToken: jwt.sign(
                            { userId: user.id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
