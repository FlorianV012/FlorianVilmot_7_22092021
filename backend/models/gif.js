module.exports = (sequelize, Sequelize) => {
    const Gif = sequelize.define("gif", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gifUrl: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        nb_like: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        nb_dislike: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    });

    return Gif;
};