'use strict';
const bcrypt = require('bcrypt');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// hashpassword
const hashUserPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const pass = 'admin';
// checking user's password
const hashPass = hashUserPassword(pass.toString());

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const currentTimestamp = new Date();

    await queryInterface.bulkInsert('user_account',
        [
          {
            email: 'admin',
            enc_password: hashPass,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
        ], {});

    await queryInterface.bulkInsert('Role',
        [
          {
            name: 'Dev',
            description: 'developer',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            name: 'Admin',
            description: 'full access',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            name: 'User',
            description: 'limited access',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
        ], {});

    await queryInterface.bulkInsert('user_profile',
        [
          {
            first_name: 'admin',
            last_name: '',
            roleId: 1,
            userId: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
        ], {});

    await queryInterface.bulkInsert('RolePermission',
        [
          {
            url: '/users',
            description: 'view all users',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/users/edit',
            description: 'edit users',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/users/delete',
            description: 'delete users',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/admin/permissions/create',
            description: 'create roles',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/users/read',
            description: 'read users',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/users/delete',
            description: 'delete users',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/roles/read',
            description: 'read roles',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/users/create',
            description: 'create users',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/users/update',
            description: 'update users',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/admin/permissions/read',
            description: '',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/admin/permissions/delete',
            description: '',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/admin/permissions/by-role',
            description: '',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/admin/permissions/assign-to-role',
            description: '',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            url: '/admin/permissions/update',
            description: '',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
        ], {});

    await queryInterface.bulkInsert('permission',
        [
          {
            roleId: 3,
            RolePermissionId: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 3,
            RolePermissionId: 2,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 3,
            RolePermissionId: 3,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 2,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 3,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 4,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 5,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 6,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 7,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 8,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 9,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 10,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 11,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 12,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 13,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            roleId: 1,
            RolePermissionId: 14,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },

        ], {});
  },


  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
