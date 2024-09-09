import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiOperation, ApiNotFoundResponse, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SurveyAnswerTable } from '../../database/entity/survey-answer.entity';
import { CreateSurveyAnswerDto, SelectFilterSurveyAnswerDto, UpdateSurveyAnswerDto } from './dto/survey-answer.dto';
import { SurveyAnswerService } from './survey-answer.service';

@ApiTags('survey-answers')
@Controller('survey-answers')
export class SurveyAnswerController {
    constructor(private readonly surveyAnswerService: SurveyAnswerService) { }

    @Post('create')
    @ApiBody({ type: CreateSurveyAnswerDto })
    @ApiCreatedResponse({
        description: 'The survey answers have been successfully created.',
        type: [SurveyAnswerTable],
    })
    @ApiOperation({ summary: 'Create multiple survey answers' })
    async create(@Body() createSurveyAnswerDto: CreateSurveyAnswerDto) {
        return await this.surveyAnswerService.createAll(createSurveyAnswerDto);
    }

    @Get('selectAll')
    @ApiOkResponse({
        description: 'List of all survey answers.',
        type: [SurveyAnswerTable],
    })
    @ApiOperation({ summary: 'Get all survey answers' })
    async findAll() {
        return await this.surveyAnswerService.findAll();
    }

    @Get('selectByID/:id')
    @ApiParam({ name: 'id', description: 'ID of the survey answer to retrieve', type: Number })
    @ApiOkResponse({
        description: 'The survey answer with the specified ID.',
        type: SurveyAnswerTable,
    })
    @ApiNotFoundResponse({
        description: 'Survey answer not found.',
    })
    async findOne(@Param('id') id: string) {
        const answerId = parseInt(id, 10);
        if (isNaN(answerId)) {
            return {
                status: 400,
                message: { errors: ['Invalid ID format'] }
            };
        }
        return this.surveyAnswerService.findOne(answerId);
    }

    @Get('select/filter')
    @ApiQuery({ name: 'targetAudience', description: 'The target audience to filter by', required: false, type: String })
    @ApiQuery({ name: 'surveyId', description: 'The ID of the survey to filter by (optional)', required: false, type: Number })
    @ApiQuery({ name: 'orderByStars', description: 'Order by stars, either ascending or descending', required: false, enum: ['ASC', 'DESC'] })
    @ApiOkResponse({
        description: 'List of responses filtered by target audience and optionally by survey',
        type: [SurveyAnswerTable],
    })
    async selectFilter(@Query() selectFilterSurveyAnswerDto: SelectFilterSurveyAnswerDto) {
        return this.surveyAnswerService.selectFilter(selectFilterSurveyAnswerDto);
    }

    @Patch('update/:id')
    @ApiParam({ name: 'id', description: 'ID of the survey answer to update', type: Number })
    @ApiBody({ type: UpdateSurveyAnswerDto })
    @ApiOkResponse({
        description: 'The survey answer has been successfully updated.',
        type: SurveyAnswerTable,
    })
    @ApiNotFoundResponse({
        description: 'Survey answer not found.',
    })
    @ApiOperation({ summary: 'Update a survey answer by ID' })
    async update(@Param('id') id: number, @Body() updateSurveyAnswerDto: UpdateSurveyAnswerDto) {
        return await this.surveyAnswerService.update(id, updateSurveyAnswerDto);

    }

}
