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

    await queryInterface.bulkInsert('Group',
        [
          {
            name: 'Dev',
            description: 'developer',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            name: 'Guest',
            description: 'view only',
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
            groupId: 1,
            userId: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
        ], {});

    await queryInterface.bulkInsert('role',
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
            url: '/admin/roles/create',
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
            url: '/group/read',
            description: 'read group',
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
        ], {});

    await queryInterface.bulkInsert('Group_Role',
        [
          {
            groupId: 4,
            roleId: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 4,
            roleId: 2,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 4,
            roleId: 3,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 1,
            roleId: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 1,
            roleId: 2,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 1,
            roleId: 3,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 1,
            roleId: 4,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 1,
            roleId: 5,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 1,
            roleId: 6,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 1,
            roleId: 7,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 1,
            roleId: 8,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          },
          {
            groupId: 1,
            roleId: 9,
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
