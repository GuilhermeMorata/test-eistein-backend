import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { surveyProviders } from '../../database/providers/survey.provider';
import { surveyQuestionProviders } from '../../database/providers/survey-question.provider';

@Module({
    imports: [],
    controllers: [SurveyController],
    providers: [SurveyService, ...surveyProviders, ...surveyQuestionProviders],
})
export class SurveyModule { }
