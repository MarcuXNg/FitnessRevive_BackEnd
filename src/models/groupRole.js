/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  // Object relational mapping
  GroupRole.init({
    groupId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'GroupRole',
    tableName: 'Group_Role', // Explicitly set the table name
  });

  return GroupRole;
};
