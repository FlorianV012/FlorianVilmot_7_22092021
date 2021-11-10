const dbConfig = require("../config/config");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.js')(sequelize, Sequelize);
db.gif = require('./gif.js')(sequelize, Sequelize);
db.like = require('./like.js')(sequelize, Sequelize);
db.comment = require('./comment.js')(sequelize, Sequelize);

db.gif.belongsTo(db.user, { foreignKey: 'userId' });
db.user.hasMany(db.gif, { as: "gif" });

db.like.belongsTo(db.gif, { foreignKey: 'gifId' });
db.gif.hasMany(db.like,);
db.like.belongsTo(db.user, { foreignKey: 'userId' });


db.comment.belongsTo(db.user, { foreignKey: 'userId' });
db.comment.belongsTo(db.gif, { foreignKey: 'gifId' });

module.exports = db;
