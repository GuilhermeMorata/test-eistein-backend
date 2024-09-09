import { Injectable, Inject } from '@nestjs/common';
import IObjectResponse from '../../common/interface/responseApi.interface';
import { SurveyAnswerTable } from '../../database/entity/survey-answer.entity';
import { CreateSurveyAnswerDto, question, SelectFilterSurveyAnswerDto, UpdateSurveyAnswerDto } from './dto/survey-answer.dto';
import { SurveyQuestionTable } from '../../database/entity/survey-question.entity';
import { SurveyTable } from '../../database/entity/survey.entity';
import { Op } from 'sequelize';
import { SurveyFormTable } from '../../database/entity/survey-form.entitie';

@Injectable()
export class SurveyAnswerService {
    constructor(
        @Inject('SURVEY_ANSWER_REPOSITORY')
        private readonly surveyAnswerTable: typeof SurveyAnswerTable,

        @Inject('SURVEY_QUESTION_REPOSITORY')
        private readonly surveyQuestionTable: typeof SurveyQuestionTable,

        @Inject('SURVEY_REPOSITORY')
        private readonly surveyTable: typeof SurveyTable,

        @Inject('SURVEY_FORM_REPOSITORY')
        private readonly surveyFormTable: typeof SurveyFormTable,
    ) { }

    async createAll(createSurveyAnswerDto: CreateSurveyAnswerDto): Promise<IObjectResponse> {
        try {
            const { email, questions, starRating, targetAudience, surveyId } = createSurveyAnswerDto;

            // Check if questions array is empty
            if (!questions || questions.length === 0) {
                return {
                    status: 400,
                    message: { errors: ['At least one question is required.'] },
                };
            }

            // Check if required fields are provided
            if (!email || !starRating || !targetAudience || !surveyId) {
                return {
                    status: 400,
                    message: { errors: ['Missing required fields.'] },
                };
            }


            // Create the survey form entry
            const form = await this.surveyFormTable.create({
                survey_form_star_rating: starRating,
                survey_form_survey_email: email,
                survey_form_target_audience: targetAudience,
                surveys_id: surveyId
            });


            // Verify duplicates in request
            const hasDuplicates = (arr: question[]): boolean => {
                const seen = new Set<string>();
                return arr.some(dto => {
                    const key = `${dto.surveys_Id}-${dto.questions_Id}-${form.survey_form_id}`;
                    return seen.size === seen.add(key).size;
                });
            };

            if (hasDuplicates(questions)) {
                return {
                    status: 400,
                    message: { errors: ['Duplicate answers found in request. No answers were created.'] },
                };
            }

            // Verify duplicates in database
            const conditions = questions?.map(dto => ({
                [Op.and]: [
                    { surveys_Id: dto.surveys_Id },
                    { questions_Id: dto.questions_Id },
                    { survey_form_id: form.survey_form_id }
                ]
            }));

            let existingAnswers = [];
            if (conditions?.length) {
                existingAnswers = await this.surveyAnswerTable.findAll({
                    where: {
                        [Op.or]: conditions
                    }
                });
            }

            if (existingAnswers.length > 0) {
                return {
                    status: 400,
                    message: { errors: ['Duplicate answers found in database.'] },
                };
            }

            // Map the questions to include the form ID
            const questionsWithFormId = questions.map(dto => {
                if (!dto.answer_data) {
                    throw new Error(`Answer data is missing for question ID ${dto.questions_Id}`);
                }

                return {
                    ...dto,
                    survey_form_id: form.survey_form_id
                }
            });

            // Bulk create the answers
            const responseData = await this.surveyAnswerTable.bulkCreate(questionsWithFormId);

            return {
                status: 201,
                data: responseData,
                message: { success: 'Answers created successfully!' },
            };

        } catch (error) {
            console.log(error);
            return {
                status: 400,
                message: { errors: ['Error creating answers', error.message] },
            };
        }
    }


    async findAll(): Promise<IObjectResponse> {
        try {
            const responseData = await this.surveyAnswerTable.findAll();
            return {
                status: 200,
                data: responseData
            };
        } catch (error) {
            return {
                status: 500,
                message: { errors: ['Error fetching answers', error.message] }
            };
        }
    }

    async findOne(id: number): Promise<IObjectResponse> {
        try {
            const responseData = await this.surveyAnswerTable.findByPk(id);
            if (responseData) {
                return {
                    status: 200,
                    data: responseData
                };
            } else {
                return {
                    status: 404,
                    message: { errors: ['Answer not found'] }
                };
            }
        } catch (error) {
            return {
                status: 500,
                message: { errors: ['Error fetching answer', error.message] }
            };
        }
    }

    async selectFilter(selectFilterSurveyAnswerDto: SelectFilterSurveyAnswerDto): Promise<IObjectResponse> {
        const { targetAudience, orderByStars, surveyId } = selectFilterSurveyAnswerDto;
        try {
            const whereConditions: any = {};
            if (targetAudience) { whereConditions.survey_form_target_audience = targetAudience; }
            if (surveyId) { whereConditions.surveys_id = surveyId; }

            const forms = await this.surveyFormTable.findAll({
                where: whereConditions,
                order: orderByStars ? [['survey_form_star_rating', orderByStars]] : [['survey_form_id', 'ASC']],
                include: [{
                    model: this.surveyAnswerTable,
                    as: 'surveys_answers',
                    attributes: ['questions_Id', 'answer_data'],
                    include: [{
                        model: this.surveyQuestionTable,
                        attributes: ['questions_title'],
                    }]
                }]
            });

            if (forms.length === 0) {
                return {
                    status: 404,
                    message: { errors: ['Nenhum formulário encontrado com os filtros aplicados'] }
                };
            }

            return {
                status: 200,
                data: forms,
            };

        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: { errors: ['Erro ao listar as respostas', error.message] }
            };
        }
    }


    async update(formId: number, updateSurveyAnswerDto: UpdateSurveyAnswerDto): Promise<IObjectResponse> {
        try {
            const { questions, starRating, targetAudience } = updateSurveyAnswerDto;

            if (!questions || questions.length === 0) {
                return { status: 400, message: { errors: ['At least one question is required for update.'] } };
            }

            const form = await this.surveyFormTable.findByPk(formId);
            if (!form) {
                return { status: 404, message: { errors: ['Form not found.'] } };
            }

            form.survey_form_star_rating = starRating ?? form.survey_form_star_rating;
            form.survey_form_target_audience = targetAudience ?? form.survey_form_target_audience;
            form.updatedAt = new Date(); // Save the update timestamp
            await form.save();

            const hasDuplicates = (arr: question[]): boolean => {
                const seen = new Set<string>();
                return arr.some(dto => {
                    const key = `${dto.surveys_Id}-${dto.questions_Id}-${formId}`;
                    return seen.size === seen.add(key).size;
                });
            };

            if (hasDuplicates(questions)) {
                return { status: 400, message: { errors: ['Duplicate answers found in the update request. No answers were updated.'] } };
            }

            const conditions = questions.map(dto => ({
                [Op.and]: [
                    { surveys_Id: dto.surveys_Id },
                    { questions_Id: dto.questions_Id },
                    { survey_form_id: formId },
                ]
            }));

            const existingAnswers = await this.surveyAnswerTable.findAll({ where: { [Op.or]: conditions } });

            if (!existingAnswers.length) {
                return { status: 404, message: { errors: ['No existing answers found for this form.'] } };
            }

            const updatedAnswers = [];
            for (const question of questions) {
                const existingAnswer = existingAnswers.find(ans => ans.questions_Id === question.questions_Id);

                if (existingAnswer) {
                    existingAnswer.answer_data = question.answer_data ?? existingAnswer.answer_data;
                    await existingAnswer.save();
                    updatedAnswers.push(existingAnswer);
                } else {
                    const newAnswer = await this.surveyAnswerTable.create({
                        ...question,
                        survey_form_id: formId,
                    });
                    updatedAnswers.push(newAnswer);
                }
            }

            return { status: 200, data: updatedAnswers, message: { success: 'Answers updated successfully!' } };

        } catch (error) {
            console.error(error);
            return { status: 500, message: { errors: ['Error updating answers', error.message] } };
        }
    }
}
