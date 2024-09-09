import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { SurveyTable } from './survey.entity';
import { ISurveyQuestionTable } from '../interface/survey-question.interface';
import { SurveyAnswerTable } from './survey-answer.entity';

@Table({ tableName: 'survey_questions' })
export class SurveyQuestionTable extends Model<ISurveyQuestionTable> {

    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    questions_Id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    questions_title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    questions_type: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    createdAt: Date = new Date();

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date = new Date();

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    deletedAt: Date;

    @ForeignKey(() => SurveyTable)
    @Column({ type: DataType.INTEGER })
    surveys_id: number;


    @HasMany(() => SurveyAnswerTable, { as: 'answers' })
    answers: SurveyAnswerTable[];
}