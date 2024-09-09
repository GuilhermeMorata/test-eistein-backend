import { SurveyAnswerTable } from "../entity/survey-answer.entity";

export const surveyAnswerProviders = [
    {
        provide: 'SURVEY_ANSWER_REPOSITORY',
        useValue: SurveyAnswerTable,
    }
]