require('dotenv').config();

module.exports = {
  HOST: process.env.MySQL_DB_host,
  USER: process.env.MySQL_DB_user,
  PASSWORD: process.env.MySQL_DB_password,
  DB: process.env.MySQL_DB,
  dialect: "mysql",

  // optionel
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};