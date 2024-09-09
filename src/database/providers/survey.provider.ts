import { SurveyTable } from "../entity/survey.entity";


export const surveyProviders = [
    {
        provide: 'SURVEY_REPOSITORY',
        useValue: SurveyTable,
    }
]