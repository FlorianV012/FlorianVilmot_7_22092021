const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const path = require('path');

const app = express();

const db = require("./models");

const userRoutes = require('./routes/user');
const gifRoutes = require("./routes/gif");

app.use(helmet());

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

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/gif', gifRoutes);

module.exports = app;