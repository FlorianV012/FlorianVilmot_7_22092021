const usernameSchema = require('../models/validator/username');

module.exports = (req, res, next) => {
    if (!usernameSchema.validate(req.body.username)) {
        res.status(400).json({ message: 'Le mot de passe doit avoir une longueur comprise entre 3 et 20 caractères sans espace.' });
    } else {
        next();
    }
};