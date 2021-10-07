const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
// const { Sequelize } = require('sequelize');


// connexion à la BD avec mysql

const db = mysql.createConnection({
  host: process.env.MySQL_DB_host,
  user: process.env.MySQL_DB_user,
  password: process.env.MySQL_DB_password,
  database: process.env.MySQL_DB
});

db.connect((err) => {
  if (err) { throw err; }
  console.log("Connecté à la base de données MySQL!");
});

/*
// connexion à la BD avec sequelize
const sequelize = new Sequelize(process.env.MySQL_DB, process.env.MySQL_DB_user, process.env.MySQL_DB_password, {
  dialect: "mysql",
  host: process.env.MySQL_DB_host
 });
 
 try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}
*/

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization,');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

module.exports = app;