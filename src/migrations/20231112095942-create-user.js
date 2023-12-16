'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // user_account
    await queryInterface.createTable('user_account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      enc_password: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
    });
    // user_profile
    await queryInterface.createTable('user_profile', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user_account',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Group',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    // role
    await queryInterface.createTable('role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      url: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
    // Group
    await queryInterface.createTable('Group', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
    // Group_Role
    await queryInterface.createTable('Group_Role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Group',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Role',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_account');
    await queryInterface.dropTable('user_profile');
    await queryInterface.dropTable('role');
    await queryInterface.dropTable('Group');
    await queryInterface.dropTable('Group_Role');
  },
};
