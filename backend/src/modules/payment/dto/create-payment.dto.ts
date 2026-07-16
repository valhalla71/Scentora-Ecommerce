import { IsEnum, IsDecimal, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

export enum PaymentTypeEnum {
  GATEWAY = 'GATEWAY',
  WALLET = 'WALLET',
  MIXED = 'MIXED',
}

export enum PaymentMethodEnum {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Order ID',
    example: 'ORD-123',
  })
  @IsString()
  orderId!: string;

  @ApiProperty({
    enum: PaymentTypeEnum,
    description: 'Payment type: GATEWAY, WALLET, or MIXED',
  })
  @IsEnum(PaymentTypeEnum)
  paymentType!: PaymentTypeEnum;

  @ApiProperty({
    enum: PaymentMethodEnum,
    description: 'Payment method (required for GATEWAY and MIXED)',
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentMethodEnum)
  paymentMethod?: PaymentMethodEnum;

  @ApiProperty({
    description: 'Total amount to pay',
    example: 150.0,
  })
  @Type(() => Number)
  @Min(0)
  amount!: number;
}

export class ProcessPaymentDto {
  @ApiProperty({
    description: 'Payment ID',
  })
  @IsString()
  paymentId!: string;

  @ApiProperty({
    description: 'Gateway reference token',
    required: false,
  })
  @IsOptional()
  @IsString()
  gatewayToken?: string;
}

export class PaymentResponseDto {
  id!: string;
  orderId!: string;
  paymentType!: string;
  paymentMethod?: string;
  status!: string;
  amount!: number;
  walletAmountUsed!: number;
  gatewayAmount!: number;
  retryCount!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
