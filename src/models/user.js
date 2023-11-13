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
      User.hasOne(models.UserProfile, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  };
  // Object relational mapping
  User.init({
    email: DataTypes.STRING,
    enc_password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user_account', // Explicitly set the table name
  });

  return User;
};
