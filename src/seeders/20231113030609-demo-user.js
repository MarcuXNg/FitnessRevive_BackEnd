'use strict';

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

    await queryInterface.bulkInsert('Group',
        [
          {
            name: 'Dev',
            description: 'developer',
          },
          {
            name: 'Guest',
            description: 'view only',
          },
          {
            name: 'Admin',
            description: 'full access',
          },
          {
            name: 'User',
            description: 'limited access',
          },
        ], {});
    await queryInterface.bulkInsert('role',
        [
          {
            url: '/users',
            description: 'view all users',
          },
          {
            url: '/users/edit',
            description: 'edit users',
          },
          {
            url: '/users/delete',
            description: 'delete users',
          },
          {
            url: '/admin/roles/create',
            description: 'create roles',
          },
          {
            url: '/users/read',
            description: 'read users',
          },
          {
            url: '/users/delete',
            description: 'delete users',
          },
          {
            url: '/group/read',
            description: 'read group',
          },
          {
            url: '/users/create',
            description: 'create users',
          },
        ], {});
  },

  // await queryInterface.bulkInsert('Group_Role',
    //     [
    //       {
    //         groupId: 4,
    //         roleId: 1,
    //       },
    //       {
    //         groupId: 4,
    //         roleId: 2,
    //       },
    //       {
    //         groupId: 1,
    //         roleId: 1,
    //       },
    //       {
    //         groupId: 1,
    //         roleId: 2,
    //       },
    //       {
    //         groupId: 1,
    //         roleId: 4,
    //       },
    //       {
    //         groupId: 1,
    //         roleId: 6,
    //       },
    //       {
    //         groupId: 1,
    //         roleId: 7,
    //       },
    //       {
    //         groupId: 1,
    //         roleId: 8,
    //       },
    //       {
    //         groupId: 1,
    //         roleId: 9,
    //       },
    //     ], {});

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
