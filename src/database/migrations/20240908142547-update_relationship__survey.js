'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'survey_questions', 
      'surveys_id',      
      {                  
        type: Sequelize.INTEGER,
        references: {
          model: 'surveys', 
          key: 'surveys_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.addColumn(
      'survey_answers',   
      'surveys_id',       
      {               
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'surveys',  
          key: 'surveys_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );

    await queryInterface.addColumn(
      'survey_answers',   
      'questions_id',    
      {                
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'survey_questions', 
          key: 'questions_id',    
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('survey_answers', 'questions_id');
    await queryInterface.removeColumn('survey_answers', 'surveys_id');
    await queryInterface.removeColumn('survey_questions', 'surveys_id');
  }
};
