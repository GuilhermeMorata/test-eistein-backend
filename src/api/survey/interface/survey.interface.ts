import { surveys_status } from '../../../database/interface/survey.interface';

export interface ISurveyData {
    surveys_id: number;
    surveys_title: string;
    surveys_description: string;
    surveys_status: surveys_status;
    surveys_limit_date: Date;
}