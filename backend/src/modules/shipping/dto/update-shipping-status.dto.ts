import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ShippingStatus } from '@prisma/client';

export class UpdateShippingStatusDto {
  @ApiProperty({ description: 'New shipping status', enum: ShippingStatus })
  @IsEnum(ShippingStatus)
  @IsNotEmpty()
  status!: ShippingStatus;

  @ApiProperty({ description: 'Tracking number (optional)', required: false })
  @IsString()
  @IsOptional()
  trackingNumber?: string;
}
