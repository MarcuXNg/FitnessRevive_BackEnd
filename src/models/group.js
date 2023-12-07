/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Group.hasMany(models.UserProfile);
      Group.belongsToMany(models.Role, {through: 'GroupRole'});
    }
  };
  // Object relational mapping
  Group.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'Group', // Explicitly set the table name
  });

  return Group;
};
