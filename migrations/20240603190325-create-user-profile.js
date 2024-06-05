'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_profiles', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: 'users', // name of Target Table
            key: 'id', // key in Target table that we're referencing
          },
        },
        onDelete: 'CASCADE'
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      mobileNo: {
        type: Sequelize.STRING(10),
        allowNull: true,
        unique: true
      },
      is_departmental: {
        type: Sequelize.TINYINT(4),
        allowNull: false,
        defaultValue: 1
      },
      is_pwd_engineer: {
        type: Sequelize.TINYINT(4),
        allowNull: false,
        defaultValue: 0
      },
      department_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: {
            tableName: 'departments', // name of Target Table
            key: 'id', // key in Target table that we're referencing
          },
        },
        onDelete: 'CASCADE'
      },
      designation_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: {
            tableName: 'designations', // name of Target Table
            key: 'id', // key in Target table that we're referencing
          },
        },
        onDelete: 'CASCADE'
      },
      display: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      inforce: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      remarks: {
        type: Sequelize.STRING(255),
        allowNull: true
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
    await queryInterface.dropTable('user_profiles');
  }
};
