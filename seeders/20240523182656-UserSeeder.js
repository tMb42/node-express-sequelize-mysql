'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = { 
  async up (queryInterface, Sequelize) {
    // / Logic to populate Users table
    const userData = [
      { name: 'user1', email: 'user1@example.com', password: 'password1'},
      { name: 'user2', email: 'user2@example.com', password: 'password2'},
      
    ];
    await queryInterface.bulkInsert('Users', userData, {});
  },

  async down (queryInterface, Sequelize) {
    // Logic to revert changes made by the up function
    await queryInterface.bulkDelete('Users', null, {});
  }
};
