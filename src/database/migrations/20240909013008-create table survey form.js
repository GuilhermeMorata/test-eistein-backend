'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('survey_form', {
      survey_form_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      surveys_id: {               
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'surveys',  
          key: 'surveys_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      survey_form_star_rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },

      survey_form_survey_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      survey_form_target_audience: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
      
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('survey_form');
  }
};