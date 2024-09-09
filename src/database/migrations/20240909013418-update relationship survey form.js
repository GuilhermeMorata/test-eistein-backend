'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'survey_answers',   
      'survey_form_id',       
      {                  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'survey_form',  
          key: 'survey_form_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'survey_answers',  
      'survey_form_id'    
    );
  }
};
