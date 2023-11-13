/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  UserProfile.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'UserProfile',
        tableName: 'user_profile',
      },
  );

  return UserProfile;
};
