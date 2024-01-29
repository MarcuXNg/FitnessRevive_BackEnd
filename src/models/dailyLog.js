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
    }
  }

  DailyLog.init(
      {
        log_date: DataTypes.DATE,
        calories_consumed_per_day: DataTypes.FLOAT,
        calories_burnt_per_day: DataTypes.FLOAT,
        carbs_consumed_per_day: DataTypes.FLOAT,
        fat_consumed_per_day: DataTypes.FLOAT,
        protein_consumed_per_day: DataTypes.FLOAT,
        weight_per_day: DataTypes.INTEGER,
        water_drink_per_day: DataTypes.FLOAT,
      },
      {
        sequelize,
        modelName: 'DailyLog',
        tableName: 'daily_log',
      },
  );

  return DailyLog;
};
