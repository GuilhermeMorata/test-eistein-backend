import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { surveys_status } from '../../../database/interface/survey.interface';

export class CreateSurveyDto {

    @ApiProperty({
        description: 'Title of the survey',
        example: 'Customer Satisfaction Survey',
    })
    @IsString()
    @IsNotEmpty()
    surveys_title: string;

    @ApiProperty({
        description: 'Description of the survey',
        example: 'A survey to gather customer feedback on our services.',
    })
    @IsString()
    @IsNotEmpty()
    surveys_description: string;

    @ApiProperty({
        description: 'Status of the survey',
        enum: surveys_status,
        example: surveys_status.ACTIVE,
    })
    @IsEnum(surveys_status)
    surveys_status: surveys_status;

    @ApiProperty({
        description: 'Limit date for the survey responses',
        example: '2024-12-31T23:59:59.000Z',
    })
    @IsDate()
    surveys_limit_date: Date;
}

export class UpdateSurveyDto extends CreateSurveyDto {
    updated_at: string
}