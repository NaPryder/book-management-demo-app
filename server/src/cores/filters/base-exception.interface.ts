import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';

export interface BaseExceptionFilterResponseBody {
  data: ErrorDetailsResponse;
}

export interface ErrorDetailsResponse {
  error: string;
  details: {
    code: string;
    causes?: string[];
  };
}

export abstract class BaseExceptionFilterAbstract implements ExceptionFilter {
  abstract readonly logger: Logger;

  abstract catch(exception: any, host: ArgumentsHost): any;

  abstract getHttpStatusCode(exception?: any): number;

  abstract getReponseBody(exception: any): BaseExceptionFilterResponseBody;
}
