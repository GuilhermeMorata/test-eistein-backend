import { IsString, IsInt, IsNotEmpty, IsEnum, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface question {
    answer_data: string,
    surveys_Id: number,
    questions_Id: number
}

export class CreateSurveyAnswerDto {
    @ApiProperty({
        description: 'The email address of the respondent',
        example: 'example@example.com',
    })
    @IsString()
    @IsNotEmpty({ message: 'Email cannot be empty' })
    email: string;

    @ApiProperty({
        description: 'The star rating given by the respondent',
        example: 4,
    })
    @IsInt()
    @IsNotEmpty({ message: 'Star rating cannot be empty' })
    @IsEnum([1, 2, 3, 4, 5], { message: 'Star rating must be between 1 and 5' })
    starRating: number;

    @ApiProperty({
        description: 'The id from survey',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty({ message: 'ID cannot be empty' })
    @IsInt()
    surveyId: number;

    @ApiProperty({
        description: 'The target audience of the survey',
        example: 'General Public',
    })
    @IsString()
    @IsNotEmpty({ message: 'Target audience cannot be empty' })
    targetAudience: string;

    @ApiProperty({
        description: 'An array of questions associated with the survey',
        example: [{ answer_data: 'This is the answer', surveys_Id: 1, questions_Id: 1 }],
    })
    @IsArray()
    @ArrayNotEmpty({ message: 'At least one question must be provided' })
    @IsNotEmpty({ message: 'Questions cannot be empty' })
    questions: question[];
}

export class UpdateSurveyAnswerDto extends CreateSurveyAnswerDto { }

export class SelectFilterSurveyAnswerDto {
    @ApiProperty({
        description: 'The target audience to filter by',
        example: 'General Public',
    })
    @IsString()
    targetAudience: string;

    @ApiPropertyOptional({
        description: 'The ID of the survey to filter by (optional)',
        example: 1,
    })
    @IsOptional()
    @IsInt()
    surveyId?: number;

    @ApiPropertyOptional({
        description: 'Order by stars, either ascending or descending',
        enum: ['ASC', 'DESC'],
        example: 'ASC',
    })
    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    orderByStars?: 'ASC' | 'DESC';
}
