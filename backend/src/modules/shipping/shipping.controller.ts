import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { ShippingService } from './shipping.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { CurrentUser } from '@shared/decorators';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingStatusDto } from './dto/update-shipping-status.dto';

@ApiTags('Shipping')
@Controller('shipping')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ShippingController {
  constructor(private shippingService: ShippingService) {}

  @Post()
  @ApiOperation({ summary: 'Create shipping record for order' })
  @ApiResponse({ status: 201, description: 'Shipping record created' })
  createShipping(
    @CurrentUser() user: any,
    @Body() createShippingDto: CreateShippingDto,
  ) {
    return this.shippingService.createShipping(createShippingDto, user.id);
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get shipping info by order ID' })
  @ApiResponse({ status: 200, description: 'Shipping info retrieved' })
  getShippingByOrderId(
    @CurrentUser() user: any,
    @Param('orderId') orderId: string,
  ) {
    return this.shippingService.getShippingByOrderId(orderId, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shipping by ID' })
  @ApiResponse({ status: 200, description: 'Shipping record retrieved' })
  getShippingById(
    @CurrentUser() user: any,
    @Param('id') shippingId: string,
  ) {
    return this.shippingService.getShippingById(shippingId, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get user shipping records' })
  @ApiResponse({ status: 200, description: 'User shipping records retrieved' })
  getUserShippings(@CurrentUser() user: any) {
    return this.shippingService.getUserShippings(user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shipping status' })
  @ApiResponse({ status: 200, description: 'Shipping status updated' })
  updateShippingStatus(
    @CurrentUser() user: any,
    @Param('id') shippingId: string,
    @Body() updateStatusDto: UpdateShippingStatusDto,
  ) {
    return this.shippingService.updateShippingStatus(
      shippingId,
      updateStatusDto,
      user.id,
    );
  }
}
