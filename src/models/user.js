/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  // Object relational mapping
  User.init({
    email: DataTypes.STRING,
    enc_password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'user_account',
  });
  // User.init({
  //   first_name: DataTypes.STRING,
  //   last_name: DataTypes.STRING,
  //   userId: DataTypes.INTEGER,
  //   updatedAt: DataTypes.DATE,
  // }, {
  //   sequelize,
  //   modelName: 'user_profile',
  // });
  return User;
};
