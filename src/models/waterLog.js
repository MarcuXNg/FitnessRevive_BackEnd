/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WaterLog extends Model {
    static associate(models) {
      WaterLog.belongsTo(models.BodyVitalLog, {
        foreignKey: 'bodyVitalLogId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  WaterLog.init(
      {
        water: DataTypes.INTEGER,
        log_date: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'WaterLog',
        tableName: 'WaterLog',
      },
  );

  return WaterLog;
};
