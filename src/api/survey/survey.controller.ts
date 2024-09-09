import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto, UpdateSurveyDto } from './dto/survey.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { SurveyTable } from '../../database/entity/survey.entity';


@ApiTags('surveys')
@Controller('surveys')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) { }

    @Post('create')
    @ApiBody({ type: CreateSurveyDto })
    @ApiCreatedResponse({
        description: 'The survey has been successfully created.',
        type: SurveyTable,
    })
    create(@Body() createSurveyDto: CreateSurveyDto) {
        return this.surveyService.create(createSurveyDto);
    }

    @Get('selectAll')
    @ApiCreatedResponse({
        description: 'List of all surveys.',
        type: [SurveyTable],
    })
    async findAll() {
        return this.surveyService.findAll();
    }

    @Get('select/:id')
    @ApiParam({ name: 'id', description: 'ID of the survey to retrieve', type: Number })
    @ApiCreatedResponse({
        description: 'The survey with the given ID.',
        type: SurveyTable,
    })
    @ApiNotFoundResponse({
        description: 'Survey not found.',
    })
    async findOne(@Param('id') id: string) {
        return this.surveyService.findOne(+id);
    }

    @Patch('update/:id')
    @ApiParam({ name: 'id', description: 'ID of the survey to update', type: Number })
    @ApiBody({ type: UpdateSurveyDto })
    @ApiOkResponse({
        description: 'The survey has been successfully updated.',
        type: SurveyTable,
    })
    @ApiNotFoundResponse({
        description: 'Survey not found.',
    })
    async update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
        return this.surveyService.update(+id, updateSurveyDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'ID of the survey to delete', type: Number })
    @ApiOkResponse({
        description: 'The survey has been successfully deleted.',
    })
    @ApiNotFoundResponse({
        description: 'Survey not found.',
    })
    async remove(@Param('id') id: string) {
        return this.surveyService.remove(+id);
    }
}
