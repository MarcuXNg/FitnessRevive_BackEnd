/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercises extends Model {
    static associate(models) {
      Exercises.belongsTo(models.BodyVitalLog, {
        foreignKey: 'bodyVitalLogId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Exercises.init(
      {
        exercise_name: DataTypes.STRING,
        calories: DataTypes.FLOAT,
        duration: DataTypes.FLOAT,
        log_date: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Exercises',
        tableName: 'exercises',
      },
  );

  return Exercises;
};
