import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateShippingDto {
  @ApiProperty({ description: 'Order ID' })
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @ApiProperty({ description: 'Street address', example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  street!: string;

  @ApiProperty({ description: 'City', example: 'New York' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ description: 'State/Province', example: 'NY' })
  @IsString()
  @IsNotEmpty()
  state!: string;

  @ApiProperty({ description: 'Postal/Zip code', example: '10001' })
  @IsString()
  @IsNotEmpty()
  zipCode!: string;

  @ApiProperty({ description: 'Country', example: 'USA' })
  @IsString()
  @IsNotEmpty()
  country!: string;

  @ApiProperty({ description: 'Tracking number', required: false })
  @IsString()
  @IsOptional()
  trackingNumber?: string;

  @ApiProperty({ description: 'Estimated delivery date', required: false })
  @IsDateString()
  @IsOptional()
  estimatedDeliveryDate?: string;
}
