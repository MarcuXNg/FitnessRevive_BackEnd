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

    await queryInterface.bulkInsert('user_account',
        [
          {
            email: 'john@gmail.com',
            enc_password: 'test1',
          },
          {
            email: 'hello@gmail.com',
            enc_passwordL: 'test2',
          },
          {
            email: 'goodbye@gmail.com',
            enc_passwordL: 'test3',
          },
          {
            email: 'marcus@gmail.com',
            enc_passwordL: 'test4',
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
