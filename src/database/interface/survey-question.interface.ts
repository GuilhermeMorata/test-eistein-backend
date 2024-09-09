
export interface ISurveyQuestionTable {
    questions_Id: number;
    questions_title: string;
    questions_type: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    surveys_id: number;
}