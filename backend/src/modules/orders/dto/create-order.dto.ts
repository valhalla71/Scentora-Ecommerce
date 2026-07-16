import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    required: false,
    description: 'Optional shipping address id',
  })
  @IsOptional()
  @IsString()
  addressId?: string;
}