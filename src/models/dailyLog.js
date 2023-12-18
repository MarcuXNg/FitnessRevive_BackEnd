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
        calories_comsumed_per_day: DataTypes.INTEGER,
        calories_burned_per_day: DataTypes.INTEGER,
        calories_goal: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'DailyLog',
        tableName: 'daily_log',
      },
  );

  return DailyLog;
};
