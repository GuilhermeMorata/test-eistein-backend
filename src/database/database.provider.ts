import { Sequelize } from 'sequelize-typescript';
import { LogErrorTable } from './entity/logErro.entitie';
import { SurveyAnswerTable } from './entity/survey-answer.entity';
import { SurveyQuestionTable } from './entity/survey-question.entity';
import { SurveyTable } from './entity/survey.entity';
import { SurveyFormTable } from './entity/survey-form.entitie';


require('dotenv').config();
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.HOST,
        username: process.env.DATABASE_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        define: {
          timestamps: true,
        },
      });

      sequelize.addModels([
        SurveyTable,
        SurveyQuestionTable,
        SurveyAnswerTable,
        SurveyFormTable,
        LogErrorTable
      ]);
      return sequelize;
    },
  },
];
