const {Sequelize} = require('sequelize'); // import sequelize
const dbConfig = require('./config.js'); // import config.js
require('dotenv').config(); // env

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(dbConfig.DB || process.env.DB, dbConfig.USER || process.env.USER, dbConfig.PASSWORD || process.env.PASSWORD, {
  host: dbConfig.HOST || process.env.HOST,
  dialect: dbConfig.dialect,
  port: process.env.DB_PORT || 3306, // Specify the port here
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: dbConfig.logging,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connection;
