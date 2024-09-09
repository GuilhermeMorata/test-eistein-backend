'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('logError', {
      error_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      error_route: {
        allowNull: false,
        type: Sequelize.STRING
      },
      error_method: {
        allowNull: false,
        type: Sequelize.TEXT  
      },
      error_message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      error_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      error_params: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('logError');
  }
};
