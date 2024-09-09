
export interface ISurveyAnswerTable {
    answer_Id: number;
    answer_data: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    survey_form_id: number;
    surveys_Id: number;
    questions_Id: number;
}