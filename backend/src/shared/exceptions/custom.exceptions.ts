import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    statusCode: number,
    message: string,
    error?: string,
  ) {
    super(
      {
        statusCode,
        message,
        error,
      },
      statusCode,
    );
  }
}

export class BadRequestException extends CustomException {
  constructor(message: string) {
    super(400, message, 'BAD_REQUEST');
  }
}

export class UnauthorizedException extends CustomException {
  constructor(message: string = 'Unauthorized') {
    super(401, message, 'UNAUTHORIZED');
  }
}

export class ForbiddenException extends CustomException {
  constructor(message: string = 'Forbidden') {
    super(403, message, 'FORBIDDEN');
  }
}

export class NotFoundException extends CustomException {
  constructor(resource: string, id: string) {
    super(
      404,
      `${resource} with ID ${id} not found`,
      'NOT_FOUND',
    );
  }
}

export class ConflictException extends CustomException {
  constructor(message: string) {
    super(409, message, 'CONFLICT');
  }
}

export class InternalServerErrorException extends CustomException {
  constructor(message: string = 'Internal server error') {
    super(500, message, 'INTERNAL_SERVER_ERROR');
  }
}