import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { SurveyQuestionService } from './survey-question.service';
import { CreateSurveyQuestionDto, UpdateSurveyQuestionDto } from './dto/survey-question.dto';
import { SurveyQuestionTable } from '../../database/entity/survey-question.entity';


@ApiTags('survey-questions')
@Controller('survey-questions')
export class SurveyQuestionController {
    constructor(private readonly surveyQuestionService: SurveyQuestionService) { }

    @Post('create')
    @ApiBody({ type: CreateSurveyQuestionDto })
    @ApiCreatedResponse({
        description: 'The survey question has been successfully created.',
        type: SurveyQuestionTable,
    })
    @ApiOperation({ summary: 'Create a new survey question' })
    async create(@Body() createSurveyQuestionDto: CreateSurveyQuestionDto) {
        return this.surveyQuestionService.create(createSurveyQuestionDto);
    }

    @Get('selectAll')
    @ApiOkResponse({
        description: 'List of all survey questions.',
        type: [SurveyQuestionTable],
    })
    @ApiOperation({ summary: 'Get all survey questions' })
    async findAll() {
        return this.surveyQuestionService.findAll();
    }

    @Get('select/:id')
    @ApiParam({ name: 'id', description: 'ID of the survey question to retrieve', type: Number })
    @ApiOkResponse({
        description: 'The survey question with the given ID.',
        type: SurveyQuestionTable,
    })
    @ApiNotFoundResponse({
        description: 'Survey question not found.',
    })
    @ApiOperation({ summary: 'Get a survey question by ID' })
    async findOne(@Param('id') id: string) {
        return this.surveyQuestionService.findOne(+id);
    }

    @Patch('update/:id')
    @ApiParam({ name: 'id', description: 'ID of the survey question to update', type: Number })
    @ApiBody({ type: UpdateSurveyQuestionDto })
    @ApiOkResponse({
        description: 'The survey question has been successfully updated.',
        type: SurveyQuestionTable,
    })
    @ApiNotFoundResponse({
        description: 'Survey question not found.',
    })
    @ApiOperation({ summary: 'Update a survey question by ID' })
    async update(@Param('id') id: string, @Body() updateSurveyQuestionDto: UpdateSurveyQuestionDto) {
        return this.surveyQuestionService.update(+id, updateSurveyQuestionDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'ID of the survey question to delete', type: Number })
    @ApiOkResponse({
        description: 'The survey question has been successfully deleted.',
    })
    @ApiNotFoundResponse({
        description: 'Survey question not found.',
    })
    @ApiOperation({ summary: 'Delete a survey question by ID' })
    async remove(@Param('id') id: string) {
        return this.surveyQuestionService.remove(+id);
    }
}
