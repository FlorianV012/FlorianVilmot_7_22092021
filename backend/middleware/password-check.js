const passwordSchema = require('../models/validator/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le mot de passe doit avoir une longueur comprise entre 6 et 40 caractères.' });
    } else {
        next();
    }
};