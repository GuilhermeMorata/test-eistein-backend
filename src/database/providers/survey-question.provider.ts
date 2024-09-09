import { SurveyQuestionTable } from "../entity/survey-question.entity";

export const surveyQuestionProviders = [
    {
        provide: 'SURVEY_QUESTION_REPOSITORY',
        useValue: SurveyQuestionTable,
    }
]