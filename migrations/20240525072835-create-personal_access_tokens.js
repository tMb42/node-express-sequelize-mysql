'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('personal_access_tokens', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      
      tokenable_type: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      tokenable_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      name: {        
        type: Sequelize.STRING(50),
        allowNull: false
      },  
      token: {        
        type: Sequelize.STRING(64),
        unique: true,
        allowNull: false
      },  
      abilities: {        
        type: Sequelize.TEXT,
        allowNull: false
      },  
      last_used_at: {        
        type: 'TIMESTAMP',
        allowNull: true
      },  
      expires_at: {        
        type: 'TIMESTAMP',
        allowNull: true
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

    // Add a unique constraint across tokenable_type and tokenable_id
    await queryInterface.addConstraint('personal_access_tokens', {
      fields: ['tokenable_type', 'tokenable_id'],
      type: 'unique',
      name: 'unique_tokenable_type_tokenable_id',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('personal_access_tokens');
  }
};
