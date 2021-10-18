module.exports = (sequelize, Sequelize) => {
    const Gif = sequelize.define("gif", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
        },
        gif_name: {
            type: Sequelize.STRING,
        },
        data: {
            type: Sequelize.BLOB("long"),
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