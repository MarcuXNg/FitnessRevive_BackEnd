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
        onUpdate: 'CASCADE',
      });
      UserProfile.belongsTo(models.Group, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  UserProfile.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        contact_number: DataTypes.INTEGER,
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        gender: DataTypes.STRING,
        date_of_birth: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'UserProfile',
        tableName: 'user_profile',
      },
  );

  return UserProfile;
};
