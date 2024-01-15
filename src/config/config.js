require('dotenv').config(); // env
module.exports = {
  HOST: process.env.HOST || process.env.LOCALHOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  DIALECT: process.env.DIALECT,
  PORT: process.env.DB_PORT || 3306,
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    // idle: 10000,
  },
  logging: false,
};
