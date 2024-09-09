import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { SurveyTable } from './survey.entity';
import { ISurveyFormTable } from '../interface/survey-form.interface';
import { SurveyAnswerTable } from './survey-answer.entity';

@Table({ tableName: 'survey_form' })
export class SurveyFormTable extends Model<ISurveyFormTable> {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    survey_form_id: number;

    @ForeignKey(() => SurveyTable)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    surveys_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    })
    survey_form_star_rating: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    })
    survey_form_survey_email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    survey_form_target_audience: string;

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

    @HasMany(() => SurveyAnswerTable, { as: 'surveys_answers' })
    surveys_answers: SurveyAnswerTable[];

}
