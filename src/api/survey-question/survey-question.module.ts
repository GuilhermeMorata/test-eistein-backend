import { Module } from '@nestjs/common';
import { SurveyQuestionController } from './survey-question.controller';
import { SurveyQuestionService } from './survey-question.service';
import { surveyQuestionProviders } from '../../database/providers/survey-question.provider';
import { surveyProviders } from '../../database/providers/survey.provider';

@Module({
    imports: [],
    controllers: [SurveyQuestionController],
    providers: [SurveyQuestionService, ...surveyQuestionProviders, ...surveyProviders],
})
export class SurveyQuestionModule { }
