module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        gifId: {
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

    return Comment;
};