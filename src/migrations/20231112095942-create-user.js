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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('JWTs', {
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
      refreshToken: {
        type: Sequelize.TEXT, // Use TEXT type instead of JSON
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // role
    await queryInterface.createTable('Role', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
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
      contact_number: {
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // role_permission
    await queryInterface.createTable('RolePermission', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // permission
    await queryInterface.createTable('permission', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      RolePermissionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'RolePermission',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // body_vital_log
    await queryInterface.createTable('body_vitals_log', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_profileId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user_profile',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      height: {
        type: Sequelize.FLOAT,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      bmi: {
        type: Sequelize.FLOAT,
      },
      bmr: {
        type: Sequelize.FLOAT,
      },
      activity_level: {
        type: Sequelize.STRING,
      },
      calories_goal: {
        type: Sequelize.FLOAT,
      },
      weight_goal: {
        type: Sequelize.INTEGER,
      },
      tdee: {
        type: Sequelize.FLOAT,
      },
      water_intake: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // meals
    await queryInterface.createTable('meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bodyVitalLogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'body_vitals_log',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      meal_type: {
        type: Sequelize.STRING,
      },
      meal_name: {
        type: Sequelize.STRING,
      },
      calories: {
        type: Sequelize.FLOAT,
      },
      protein: {
        type: Sequelize.FLOAT,
      },
      fat: {
        type: Sequelize.FLOAT,
      },
      carbon: {
        type: Sequelize.FLOAT,
      },
      gam: {
        type: Sequelize.FLOAT,
      },
      log_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // exercises
    await queryInterface.createTable('exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bodyVitalLogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'body_vitals_log',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      exercise_name: {
        type: Sequelize.STRING,
      },
      calories: {
        type: Sequelize.FLOAT,
      },
      duration: {
        type: Sequelize.FLOAT,
      },
      log_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // daily_log
    await queryInterface.createTable('daily_log', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bodyVitalLogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'body_vitals_log',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      log_date: {
        type: Sequelize.DATEONLY,
      },
      calories_consumed_per_day: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      calories_burnt_per_day: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      carbs_consumed_per_day: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      fat_consumed_per_day: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      protein_consumed_per_day: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      weight_per_day: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      water_drink_per_day: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('WaterLog', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bodyVitalLogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'body_vitals_log',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      log_date: {
        type: Sequelize.DATEONLY,
      },
      water: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_account');
    await queryInterface.dropTable('user_profile');
    await queryInterface.dropTable('role_permission');
    await queryInterface.dropTable('role');
    await queryInterface.dropTable('permission');
  },
};
