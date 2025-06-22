import { HttpStatus } from '@nestjs/common';

export interface ExceptionConstants {
  code: string;
  message: string;
  statusCode: number;
}

export const ExceptionCode: Record<string, ExceptionConstants> = {
  INVALID_CREDENTIAL: {
    code: 'INVALID_CREDENTIAL',
    message: 'Invalid credential',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  INVALID_REQUEST: {
    code: 'INVALID_REQUEST',
    message: 'Invalid request format',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  INVALID_PERMISSION: {
    code: 'INVALID_PERMISSION',
    message: 'Invalid permission',
    statusCode: HttpStatus.FORBIDDEN,
  }
};
