import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({
    example: 'cmrmtae2w0019momggub76njx',
    description: 'Product ID (شناسه محصول)',
  })
  @IsString()
  productId!: string;

  @ApiProperty({
    example: 1,
    description: 'Quantity of product (تعداد محصول)',
  })
  @IsNumber()
  @Min(1)
  quantity!: number;
}