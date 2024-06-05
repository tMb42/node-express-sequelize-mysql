'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('departments', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      department_name: {        
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
      },
      department_short_name: {        
        type: Sequelize.STRING(50),
        allowNull: true
      },  
      alias_name: {        
        type: Sequelize.STRING(20),
        allowNull: true
      },  
      remarks: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      display: {
        type: Sequelize.TINYINT(4),
        allowNull: false,
        defaultValue: 1
      },
      inforce: {
        type: Sequelize.TINYINT(4),
        allowNull: false,
        defaultValue: 1
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
    await queryInterface.dropTable('departments');
  }
};
