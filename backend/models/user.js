module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define('user', {
        user_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })
};