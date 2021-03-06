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

db.gif.belongsTo(db.user, { foreignKey: 'userId', onDelete: 'cascade' });
db.user.hasMany(db.gif, { onDelete: 'cascade' });

db.like.belongsTo(db.gif, { foreignKey: 'gifId', onDelete: 'cascade' });
db.gif.hasMany(db.like,);
db.like.belongsTo(db.user, { foreignKey: 'userId', onDelete: 'cascade' });


db.comment.belongsTo(db.user, { foreignKey: 'userId', onDelete: 'cascade' });
db.gif.hasMany(db.comment,);
db.comment.belongsTo(db.gif, { foreignKey: 'gifId', onDelete: 'cascade' });

module.exports = db;
