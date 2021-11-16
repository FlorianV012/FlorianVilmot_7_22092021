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
    });

    return Comment;
};