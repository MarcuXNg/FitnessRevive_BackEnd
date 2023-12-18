/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Daily_log extends Model {
    static associate(models) {
        Daily_log.belongsTo(models.Body_vital_log, {
        foreignKey: 'body_vital_logId',
        onDelete: 'CASCADE',
      });
        Daily_log.belongsTo(models.Meals, {
        foreignKey: 'mealsId',
        onDelete: 'CASCADE',
      });
        Daily_log.belongsTo(models.Exercises, {
        foreignKey: 'exercisesId',
        onDelete: 'CASCADE',
      });
    }
  }

  Daily_log.init(
      {
        log_date: DataTypes.DATE,
        calories_comsumed_per_day: DataTypes.INTEGER,
        calories_burned_per_day: DataTypes.INTEGER,
        calories_goal: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'Daily_log',
        tableName: 'daily_log',
      },
  );

  return Daily_log;
};