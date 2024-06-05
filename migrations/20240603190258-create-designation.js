'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('designations', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      designation_name: {        
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
      },
      designation_alias: {        
        type: Sequelize.STRING(20),
        allowNull: true
      },  
      remarks: {
        type: Sequelize.STRING(255),
        allowNull: true
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
    await queryInterface.dropTable('designations');
  }
};
