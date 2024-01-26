/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BodyVitalLog extends Model {
    static associate(models) {
      BodyVitalLog.belongsTo(models.UserProfile, {
        foreignKey: 'user_profileId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  BodyVitalLog.init(
      {
        height: DataTypes.FLOAT,
        weight: DataTypes.FLOAT,
        bmi: DataTypes.FLOAT,
        bmr: DataTypes.FLOAT,
        activity_level: DataTypes.STRING,
        calories_goal: DataTypes.FLOAT,
        weight_goal: DataTypes.INTEGER,
        tdee: DataTypes.FLOAT,
        water_intake: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'BodyVitalLog',
        tableName: 'body_vitals_log',
      },
  );

  return BodyVitalLog;
};
