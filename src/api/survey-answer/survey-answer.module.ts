import { Module } from '@nestjs/common';
import { SurveyAnswerController } from './survey-answer.controller';
import { SurveyAnswerService } from './survey-answer.service';
import { surveyAnswerProviders } from '../../database/providers/survey-answer.provider';
import { surveyProviders } from '../../database/providers/survey.provider';
import { surveyQuestionProviders } from '../../database/providers/survey-question.provider';
import { surveyformProviders } from '../../database/providers/survey-form.provider';

@Module({
    imports: [],
    controllers: [SurveyAnswerController],
    providers: [
        SurveyAnswerService,
        ...surveyAnswerProviders,
        ...surveyProviders,
        ...surveyQuestionProviders,
        ...surveyformProviders],
})
export class SurveyAnswerModule { }
