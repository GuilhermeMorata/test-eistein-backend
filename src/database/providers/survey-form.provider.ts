import { SurveyFormTable } from "../entity/survey-form.entitie";

export const surveyformProviders = [
    {
        provide: 'SURVEY_FORM_REPOSITORY',
        useValue: SurveyFormTable,
    }
]