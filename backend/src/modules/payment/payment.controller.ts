import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, ProcessPaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { CurrentUser } from '@shared/decorators';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create payment for order' })
  createPayment(
    @CurrentUser() user: any,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.createPayment(user.id, createPaymentDto);
  }

  @Post('process')
  @ApiOperation({ summary: 'Process payment' })
  processPayment(
    @CurrentUser() user: any,
    @Body() processPaymentDto: ProcessPaymentDto,
  ) {
    return this.paymentService.processPayment(user.id, processPaymentDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  getPaymentById(
    @CurrentUser() user: any,
    @Param('id') paymentId: string,
  ) {
    return this.paymentService.getPaymentById(paymentId, user.id);
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get payment for order' })
  getOrderPayment(
    @CurrentUser() user: any,
    @Param('orderId') orderId: string,
  ) {
    return this.paymentService.getOrderPayment(orderId, user.id);
  }

  @Post(':id/retry')
  @ApiOperation({ summary: 'Retry failed payment' })
  retryPayment(
    @CurrentUser() user: any,
    @Param('id') paymentId: string,
  ) {
    return this.paymentService.retryPayment(paymentId, user.id);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel pending payment' })
  cancelPayment(
    @CurrentUser() user: any,
    @Param('id') paymentId: string,
  ) {
    return this.paymentService.cancelPayment(paymentId, user.id);
  }

  @Get('order/:orderId/history')
  @ApiOperation({ summary: 'Get payment history for order' })
  getOrderPaymentHistory(
    @CurrentUser() user: any,
    @Param('orderId') orderId: string,
  ) {
    return this.paymentService.getOrderPaymentHistory(orderId, user.id);
  }
}
