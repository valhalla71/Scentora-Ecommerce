import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { CurrentUser } from '@shared/decorators';
import { PaginationDto } from '@shared/dto/common.dto';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get user orders' })
  getUserOrders(@CurrentUser() user: any, @Query() pagination: PaginationDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.ordersService.getUserOrders(user.id, skip, pagination.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  getOrderById(@CurrentUser() user: any, @Param('id') orderId: string) {
    return this.ordersService.getOrderById(orderId, user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create order' })
  createOrder(@CurrentUser() user: any, @Body() orderData: any) {
    return this.ordersService.createOrder(user.id, orderData);
  }
}
