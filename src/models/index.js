/* eslint-disable prefer-const */
'use strict';
require('dotenv').config();

const fs = require('fs'); // fs read import
const path = require('path');
const Sequelize = require('sequelize'); // Sequelize
const basename = path.basename(__filename);
const dbConfig = require('../config/config.js'); // import config.js
const db = {};

let sequelize;

sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT, // Specify the port for database here
  define: {
    freezeTableName: dbConfig.freezeTableName,
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    // idle: dbConfig.pool.idle,
  },
  logging: dbConfig.logging,
});

// Read file
fs
    .readdirSync(__dirname) // Reads all files in the current directory (__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'); // filters out non-JavaScript files and the current script itself.
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model; // Loads each JavaScript file (assumed to be Sequelize model definitions) into the application and associates it with the Sequelize instance.
    });

// Iterates through the loaded models and calls the associate function on each if it exists.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Exports the initialized Sequelize instance (sequelize)
db.Sequelize = Sequelize; // EXports the Sequelize library itself

// Test the connection
sequelize
    .authenticate()
    .then(() => {
      console.log('Connection using Sequelize to database has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });

module.exports = db; // load model db

