/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.UserProfile);
      Role.belongsToMany(models.RolePermission, {through: 'Permission', foreignKey: 'roleId'});
    }
  };
  // Object relational mapping
  Role.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Role', // Explicitly set the table name
  });

  return Role;
};
