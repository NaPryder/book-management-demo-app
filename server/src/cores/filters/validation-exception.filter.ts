import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { omit } from 'radash';

import {
  BaseExceptionFilterAbstract,
  BaseExceptionFilterResponseBody,
} from './base-exception.interface';
import { ExceptionCode } from '../exceptions/exception.interface';

@Catch(ValidationError)
export class ValidationExceptionFilter extends BaseExceptionFilterAbstract {
  readonly logger = new Logger(ValidationExceptionFilter.name);

  readonly exceptionCode = ExceptionCode.INVALID_REQUEST;

  catch(exception: ValidationError, host: ArgumentsHost) {
    this.logger.error(omit(exception, ['value']));

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const httpStatus = this.getHttpStatusCode();
    const responseBody = this.getReponseBody(exception);

    return response.status(httpStatus).send(responseBody);
  }

  getHttpStatusCode(): number {
    return this.exceptionCode.statusCode;
  }

  getReponseBody(exception: ValidationError): BaseExceptionFilterResponseBody {
    return {
      data: {
        error: this.exceptionCode.message,
        details: {
          code: this.exceptionCode.code,
          causes: Object.values(exception.constraints),
        },
      },
    };
  }
}
