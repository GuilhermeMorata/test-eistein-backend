import { SurveyAnswerModule } from './api/survey-answer/survey-answer.module';
import { SurveyQuestionModule } from './api/survey-question/survey-question.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SurveyModule } from './api/survey/survey.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    SurveyAnswerModule,
    SurveyQuestionModule,
    SurveyModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class AppModule { }
