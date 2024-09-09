import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ISurveyAnswerTable } from '../interface/survey-answer.interface';
import { SurveyTable } from './survey.entity';
import { SurveyQuestionTable } from './survey-question.entity';
import { SurveyFormTable } from './survey-form.entitie';

@Table({ tableName: 'survey_answers' })
export class SurveyAnswerTable extends Model<ISurveyAnswerTable> {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    answer_Id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    answer_data: string; // Resposta do cliente 

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    deletedAt: Date;

    @ForeignKey(() => SurveyTable)
    @Column({ type: DataType.INTEGER })
    surveys_Id: number;

    @ForeignKey(() => SurveyQuestionTable)
    @Column({ type: DataType.INTEGER })
    questions_Id: number;

    @ForeignKey(() => SurveyFormTable)
    @Column({ type: DataType.INTEGER })
    survey_form_id: number;

    @BelongsTo(() => SurveyQuestionTable, { as: 'question' })
    question: SurveyQuestionTable;
}
