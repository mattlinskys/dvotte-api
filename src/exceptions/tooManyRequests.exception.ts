import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyRequestsException extends HttpException {
  constructor(data: Record<string, any> = {}) {
    super(
      {
        message: 'Too Many Requests',
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        ...data,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
