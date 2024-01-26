/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meals extends Model {
    static associate(models) {
      Meals.belongsTo(models.BodyVitalLog, {
        foreignKey: 'bodyVitalLogId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Meals.init(
      {
        meal_type: DataTypes.STRING,
        meal_name: DataTypes.STRING,
        calories: DataTypes.FLOAT,
        protein: DataTypes.INTEGER,
        fat: DataTypes.INTEGER,
        carbon: DataTypes.INTEGER,
        log_date: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Meals',
        tableName: 'meals',
      },
  );

  return Meals;
};
