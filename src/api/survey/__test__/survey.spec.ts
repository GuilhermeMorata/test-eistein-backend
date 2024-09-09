import { Test, TestingModule } from '@nestjs/testing';
import { CreateSurveyDto, UpdateSurveyDto } from '../dto/survey.dto';
import { SurveyController } from '../survey.controller';
import { SurveyService } from '../survey.service';
import { surveys_status } from '../../../database/interface/survey.interface';


describe('SurveyController', () => {
    let controller: SurveyController;
    let service: SurveyService;

    const mockSurveyService = {
        create: jest.fn().mockResolvedValue({
            status: 200,
            data: { surveys_id: 1, surveys_title: 'Test Survey' },
            message: { success: 'Created successfully!' },
        }),
        findAll: jest.fn().mockResolvedValue({
            status: 200,
            data: [{ surveys_id: 1, surveys_title: 'Test Survey' }],
        }),
        findOne: jest.fn().mockResolvedValue({
            status: 200,
            data: { surveys_id: 1, surveys_title: 'Test Survey' },
        }),
        update: jest.fn().mockResolvedValue({
            status: 200,
            data: { surveys_id: 1, surveys_title: 'Updated Survey' },
            message: { success: 'Updated successfully!' },
        }),
        remove: jest.fn().mockResolvedValue({
            status: 200,
            data: { surveys_id: 1, surveys_title: 'Test Survey' },
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SurveyController],
            providers: [
                { provide: SurveyService, useValue: mockSurveyService },
            ],
        }).compile();

        controller = module.get<SurveyController>(SurveyController);
        service = module.get<SurveyService>(SurveyService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new survey', async () => {
            const createSurveyDto: CreateSurveyDto = {
                surveys_title: 'Test Survey',
                surveys_description: '',
                surveys_status: surveys_status.ACTIVE,
                surveys_limit_date: undefined
            };

            const result = await controller.create(createSurveyDto);

            expect(result.status).toBe(200);
            expect(result.data.surveys_title).toBe('Test Survey');
            expect(result.message.success).toBe('Created successfully!');
            expect(service.create).toHaveBeenCalledWith(createSurveyDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of surveys', async () => {
            const result = await controller.findAll();

            expect(result.status).toBe(200);
            expect(result.data.length).toBeGreaterThan(0);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a survey by ID', async () => {
            const result = await controller.findOne('1');

            expect(result.status).toBe(200);
            expect(result.data.surveys_id).toBe(1);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should update a survey by ID', async () => {
            const updateSurveyDto: UpdateSurveyDto | any = {
                surveys_title: 'Updated Survey',
            };

            const result = await controller.update('1', updateSurveyDto);

            expect(result.status).toBe(200);
            expect(result.data.surveys_title).toBe('Updated Survey');
            expect(result.message.success).toBe('Updated successfully!');
            expect(service.update).toHaveBeenCalledWith(1, updateSurveyDto);
        });
    });

    describe('remove', () => {
        it('should delete a survey by ID', async () => {
            const result = await controller.remove('1');

            expect(result.status).toBe(200);
            expect(result.data.surveys_id).toBe(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
