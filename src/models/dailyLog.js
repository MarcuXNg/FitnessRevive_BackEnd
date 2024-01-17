/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailyLog extends Model {
    static associate(models) {
      DailyLog.belongsTo(models.BodyVitalLog, {
        foreignKey: 'bodyVitalLogId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      DailyLog.hasMany(models.Meals, {
        foreignKey: 'mealsId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      DailyLog.hasMany(models.Exercises, {
        foreignKey: 'exercisesId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  DailyLog.init(
      {
        log_date: DataTypes.DATE,
        calories_comsumed_per_day: DataTypes.FLOAT,
        calories_burned_per_day: DataTypes.FLOAT,
        weight_per_day: DataTypes.FLOAT,
      },
      {
        sequelize,
        modelName: 'DailyLog',
        tableName: 'daily_log',
      },
  );

  return DailyLog;
};
