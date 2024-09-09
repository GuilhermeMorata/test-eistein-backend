export interface ISurveyFormTable {
    survey_form_id: number;
    surveys_id: number;
    survey_form_star_rating: number;
    survey_form_survey_email: string;
    survey_form_target_audience: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}