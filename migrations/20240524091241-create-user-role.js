'use strict';
module.exports = {
  up: async (queryInterface, Sequelize, sequelize) => {
    await queryInterface.createTable('user_role', {
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: 'users', // name of Target Table
            key: 'id', // key in Target table that we're referencing
          },
        },
        onDelete: 'CASCADE',
      },
      role_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: 'roles', // name of Target Table
            key: 'id', // key in Target table that we're referencing
          },
        },
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_role');
  }
};
