'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING
      },
      email: {        
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        // validate: {
        //     isEmail: true,
        //     max: 320, //According to email standards (RFC 5321 and RFC 5322).
        //     is:{
        //         // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
        //         match: [ /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
        //         msg: "Please enter a valid email!"
        //     }
        // }       
      
      },
      email_verified_at: {        
        type: 'TIMESTAMP',
        allowNull: true
      },
      password: {        
        type: Sequelize.STRING(255),
        allowNull: false,            
      },
      remember_token: {        
        type: Sequelize.STRING(100),
        allowNull: true,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};