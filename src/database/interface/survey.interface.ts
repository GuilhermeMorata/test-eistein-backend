import { ISurveyAnswerTable } from "./survey-answer.interface";
import { ISurveyQuestionTable } from "./survey-question.interface";

export enum surveys_status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DRAFT = 'draft',
}

export interface ISurveyTable {
    surveys_id: number;
    surveys_title: string;
    surveys_description: string;
    surveys_status: surveys_status;
    surveys_limit_date: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    surveys_questions?: ISurveyQuestionTable[];
    surveys_answers?: ISurveyAnswerTable[];
}
