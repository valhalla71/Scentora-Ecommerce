import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}

export class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class BaseResponseDto<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export class ErrorResponseDto {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}
