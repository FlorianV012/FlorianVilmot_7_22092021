module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {

        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        gifId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        like: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    });

    return Like;
};