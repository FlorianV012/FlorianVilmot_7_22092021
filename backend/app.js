const express = require('express');
const cors = require("cors");

const app = express();

const db = require("./models");

const userRoutes = require('./routes/user');


app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization,');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

//app.use(express.urlencoded({ extended: true }));

// Synchronisation de la base
db.sequelize.sync();

/*
// Réinitialisation de la base
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/

// Routes
app.use('/api/auth', userRoutes);

module.exports = app;