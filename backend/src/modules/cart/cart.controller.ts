import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { CurrentUser } from '@shared/decorators';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  getCart(@CurrentUser() user: any) {
    return this.cartService.getCartByUserId(user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  addToCart(
    @CurrentUser() user: any,
    @Body() body: { productId: string; quantity: number },
  ) {
    return this.cartService.addToCart(user.id, body.productId, body.quantity);
  }

  @Delete('items/:productId')
  @ApiOperation({ summary: 'Remove item from cart' })
  removeFromCart(@CurrentUser() user: any, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(user.id, productId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.id);
  }
}
