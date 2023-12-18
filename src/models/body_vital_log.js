/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Body_vital_log extends Model {
    static associate(models) {
        Body_vital_log.belongsTo(models.UserProfile, {
        foreignKey: 'user_profileId',
        onDelete: 'CASCADE',
      });
    }
  }

  Body_vital_log.init(
      {
        height: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        bmi: DataTypes.FLOAT,
        bmr: DataTypes.FLOAT,
        activity_level: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Body_vital_log',
        tableName: 'body_vital_log',
      },
  );

  return Body_vital_log;
};