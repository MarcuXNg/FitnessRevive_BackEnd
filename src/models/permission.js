/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  // Object relational mapping
  Permission.init({
    roleId: DataTypes.INTEGER,
    RolePermissionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permission', // Explicitly set the table name
  });

  return Permission;
};
