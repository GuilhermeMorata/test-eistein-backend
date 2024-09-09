import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateSurveyQuestionDto {

    @ApiProperty({
        description: 'Title of the survey question',
        example: 'What is your overall satisfaction?',
    })
    @IsString()
    @IsNotEmpty()
    questions_title: string;

    @ApiProperty({
        description: 'Type of the survey question (e.g., multiple-choice, text)',
        example: 'multiple-choice',
    })
    @IsString()
    @IsNotEmpty()
    questions_type: string;

    @ApiProperty({
        description: 'ID of the associated survey',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    surveys_id: number;
}

export class UpdateSurveyQuestionDto {

    @ApiProperty({
        description: 'Title of the survey question',
        example: 'Updated question title',
        required: false,
    })
    @IsString()
    @IsOptional()
    questions_title?: string;

    @ApiProperty({
        description: 'Type of the survey question',
        example: 'text',
        required: false,
    })
    @IsString()
    @IsOptional()
    questions_type?: string;

    @ApiProperty({
        description: 'ID of the associated survey',
        example: 1,
        required: false,
    })
    @IsInt()
    @IsOptional()
    surveys_id?: number;
}