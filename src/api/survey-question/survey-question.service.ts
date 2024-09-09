import { Inject, Injectable } from '@nestjs/common';
import { SurveyQuestionTable } from '../../database/entity/survey-question.entity';
import { CreateSurveyQuestionDto, UpdateSurveyQuestionDto } from './dto/survey-question.dto';
import { SurveyTable } from '../../database/entity/survey.entity';
import IObjectResponse from '../../common/interface/responseApi.interface';
import { subHours } from 'date-fns';

@Injectable()
export class SurveyQuestionService {
    constructor(
        @Inject('SURVEY_QUESTION_REPOSITORY')
        private readonly surveyQuestionTable: typeof SurveyQuestionTable,

        @Inject('SURVEY_REPOSITORY')
        private readonly surveyTable: typeof SurveyTable,
    ) { }

    async create(createSurveyQuestionDto: CreateSurveyQuestionDto): Promise<IObjectResponse> {
        const exist = await this.surveyTable.findByPk(createSurveyQuestionDto.surveys_id);
        const duplicated = await this.surveyQuestionTable.findOne({ where: { questions_title: createSurveyQuestionDto.questions_title, surveys_id: createSurveyQuestionDto.surveys_id } });
        if (exist && !duplicated) {
            const responseData = this.surveyQuestionTable.create(createSurveyQuestionDto);
            return {
                status: 200,
                data: responseData,
                message: { success: 'Foi criado com sucesso!' }
            }
        } else {
            return {
                status: 400,
                message: { errors: ['Não foi achado nenhuma pergunta com esse ID ou dado duplicado'] }
            }
        }

    }

    async findAll(): Promise<IObjectResponse> {
        const responseData = this.surveyQuestionTable.findAll();
        return {
            status: 200,
            data: responseData
        }
    }

    async findOne(id: number): Promise<IObjectResponse> {
        const responseData = this.surveyQuestionTable.findByPk(id);
        return {
            status: 200,
            data: responseData
        }
    }

    async update(id: number, updateSurveyQuestionDto: UpdateSurveyQuestionDto): Promise<IObjectResponse> {
        const existSurvey = await this.surveyQuestionTable.findByPk(updateSurveyQuestionDto.surveys_id)
        const existQuestion = await this.surveyQuestionTable.findByPk(id)
        const duplicated = await this.surveyQuestionTable.findOne({ where: { questions_title: updateSurveyQuestionDto.questions_title, surveys_id: updateSurveyQuestionDto.surveys_id } });
        if (existSurvey && existQuestion && !duplicated) {
            const responseData = await this.surveyQuestionTable.update({ ...updateSurveyQuestionDto, updatedAt: new Date() }, { where: { questions_Id: id }, returning: true });
            await this.surveyQuestionTable.update({ updatedAt: new Date() }, { where: { surveys_id: updateSurveyQuestionDto.surveys_id } }) //update survey because question its updated
            return {
                status: 200,
                data: responseData,
                message: { success: 'Foi Atualizado com sucesso!' }
            }
        } else {
            return {
                status: 400,
                message: { errors: ['Não foi achado nenhuma pergunta com esse ID ou dado duplicado'] }
            }
        }
    }

    async remove(id: number): Promise<IObjectResponse> {
        const question = await this.surveyQuestionTable.findByPk(id);
        await question.destroy();
        return {
            status: 200,
            data: question
        }
    }
}
