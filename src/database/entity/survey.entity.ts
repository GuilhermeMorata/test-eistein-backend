import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SurveyAnswerTable } from './survey-answer.entity';
import { SurveyQuestionTable } from './survey-question.entity';
import { ISurveyTable, surveys_status } from '../interface/survey.interface';


@Table({ tableName: 'surveys' })
export class SurveyTable extends Model<ISurveyTable> {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    surveys_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    surveys_title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    surveys_description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    surveys_status: surveys_status

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    surveys_limit_date: Date = new Date();

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

    @HasMany(() => SurveyQuestionTable)
    surveys_questions: SurveyQuestionTable[];

    @HasMany(() => SurveyAnswerTable)
    surveys_answers: SurveyAnswerTable[];
}