/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RolePermission.belongsToMany(models.Role, {
        through: 'Permission',
        foreignKey: 'RolePermissionId',
      });
    }
  };
  // Object relational mapping
  RolePermission.init({
    url: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'RolePermission', // Explicitly set the table name
  });

  return RolePermission;
};
