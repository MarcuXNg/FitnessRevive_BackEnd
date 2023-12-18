/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meals extends Model {
    static associate(models) {
    }
  }

  Meals.init(
      {
        meal_type: DataTypes.STRING,
        meal_name: DataTypes.STRING,
        calories: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'Meals',
        tableName: 'meals',
      },
  );

  return Meals;
};
