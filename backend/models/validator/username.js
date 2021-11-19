const passwordValidator = require('password-validator');

const usernameSchema = new passwordValidator();

usernameSchema
    .is().min(3)
    .is().max(20)
    .has().not().spaces();

module.exports = usernameSchema;