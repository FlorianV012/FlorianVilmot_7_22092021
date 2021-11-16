module.exports = (sequelize, Sequelize) => {
    const Gif = sequelize.define("gif", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gifUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },       
    });

    return Gif;
};