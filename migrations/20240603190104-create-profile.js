'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
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
      photo: {        
        type: Sequelize.STRING(512),
        allowNull: false,
        defaultValue: 'storage/images/no_image.png',
      },  
      created_at: {        
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true
      }, 
      updated_at: {        
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: true
      }, 
    }); 
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profiles');
  }
};