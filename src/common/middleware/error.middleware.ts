import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LogErrorTable } from '../../database/entity/logErro.entitie';
import { ILogErrorTable } from '../../database/interface/logError.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    async catch(exception: unknown | any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const { getRequest, getResponse } = host.switchToHttp();
        const request = getRequest();

        const httpStatus: any =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {};

        const error_params = JSON.stringify({ ...request.body, ...request.query });
        console.log('ERROR::', exception);

        const registerError: ILogErrorTable = {
            error_route: request?.url ? request?.url : 'não registrado',
            error_method: request?.method ? request?.method : 'não registrado',
            error_message: exception instanceof HttpException ? exception.message : 'Internal server error',
            error_name: exception?.name ? exception?.name : 'não registrado',
            error_params: error_params ? error_params : 'não registrado',
        };

        try {
            await LogErrorTable.create({ ...registerError });
        } catch (error) {
            console.log('Erro insert logErro table ::', error)
        }


        this.httpAdapterHost.httpAdapter.reply(
            ctx.getResponse(),
            responseBody,
            httpStatus,
        );
    }
}
