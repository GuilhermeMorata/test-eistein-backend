import { Inject, Injectable } from '@nestjs/common';
import { SurveyTable } from '../../database/entity/survey.entity';
import { CreateSurveyDto, UpdateSurveyDto } from './dto/survey.dto';
import { SurveyQuestionTable } from '../../database/entity/survey-question.entity';
import { ISurveyData } from './interface/survey.interface';
import IObjectResponse from '../../common/interface/responseApi.interface';
import { subHours } from 'date-fns';

@Injectable()
export class SurveyService {

    constructor(
        @Inject('SURVEY_REPOSITORY')
        private readonly surveyTable: typeof SurveyTable,

        @Inject('SURVEY_QUESTION_REPOSITORY')
        private readonly surveyQuestionTable: typeof SurveyQuestionTable,
    ) { }

    async create(createSurveyDto: CreateSurveyDto): Promise<IObjectResponse> {
        const exist = await this.surveyTable.findOne({ where: { surveys_title: createSurveyDto.surveys_title } });

        if (!exist) {
            const survey: ISurveyData = await this.surveyTable.create(createSurveyDto);
            return { status: 200, data: survey, message: { success: "Criado com sucesso!" } }
        }
        else {
            return { status: 400, data: [], message: { errors: ['Pesquisa ja existente!'] } }
        }

    }

    async findAll(): Promise<IObjectResponse> {
        const responseData: SurveyTable[] = await this.surveyTable.findAll({ include: ['surveys_questions', 'surveys_answers'] });

        return {
            status: 200,
            data: responseData,
        }
    }

    async findOne(id: number): Promise<IObjectResponse> {
        const responseData: SurveyTable = await this.surveyTable.findByPk(id, { include: ['surveys_questions', 'surveys_answers'] });

        return {
            status: 200,
            data: responseData,
        }
    }

    async update(id: number, updateSurveyDto: UpdateSurveyDto): Promise<IObjectResponse> {
        const responseData = await this.surveyTable.update({ ...updateSurveyDto, updatedAt: new Date() }, { where: { surveys_id: id }, returning: true });
        if (responseData) {
            return {
                status: 200,
                data: responseData,
                message: { success: 'Foi atualizado com sucesso' }
            }
        }
        else { return { status: 400, message: { errors: ['Não foi encontrado nenhum dado com esse ID'] } } }
    }

    async remove(id: number): Promise<IObjectResponse> {
        const survey = await this.surveyTable.findByPk(id); // soft delete use deletedAt 
        await survey.destroy();
        return {
            status: 200,
            data: survey
        }
    }
}
