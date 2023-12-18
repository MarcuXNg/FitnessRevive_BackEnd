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
        height: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        bmi: DataTypes.FLOAT,
        bmr: DataTypes.FLOAT,
        activity_level: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'BodyVitalLog',
        tableName: 'body_vital_log',
      },
  );

  return BodyVitalLog;
};
