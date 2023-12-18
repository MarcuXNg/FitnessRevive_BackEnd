/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercises extends Model {
    static associate(models) {
        Exercises.hasMany(models.Daily_log);
    }
  }

  Exercises.init(
      {
        exercise_type: DataTypes.STRING,
        exercise_name: DataTypes.STRING,
        calories: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'Exercises',
        tableName: 'exercises',
      },
  );

  return Exercises;
};