import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export interface PaginationQuery {
  page: number;
  limit: number;
  skip: number;
}

@Injectable()
export class PaginationPipe implements PipeTransform<any, PaginationQuery> {
  transform(value: any, metadata: ArgumentMetadata): PaginationQuery {
    const page = parseInt(value.page, 10) || 1;
    const limit = parseInt(value.limit, 10) || 10;

    if (page < 1) {
      throw new BadRequestException('Page must be greater than 0');
    }

    if (limit < 1 || limit > 100) {
      throw new BadRequestException('Limit must be between 1 and 100');
    }

    return {
      page,
      limit,
      skip: (page - 1) * limit,
    };
  }
}
