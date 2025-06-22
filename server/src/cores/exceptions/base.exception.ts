import { HttpException } from '@nestjs/common';
import { ExceptionConstants } from './exception.interface';


export class BaseHttpException extends HttpException {
  exceptionConstant: ExceptionConstants;

  constructor(exceptionConstant: ExceptionConstants) {
    super({ message: exceptionConstant.message }, exceptionConstant.statusCode);
    this.exceptionConstant = exceptionConstant;
  }
}
