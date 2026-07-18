import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    required: false,
    description: 'Optional shipping address id (شناسه آدرس ارسال اختیاری)',
    example: 'cmrmtae2w0019momggub76njx',
  })
  @IsOptional()
  @IsString()
  addressId?: string;
}