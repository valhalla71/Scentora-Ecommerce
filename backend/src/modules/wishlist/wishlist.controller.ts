import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { CurrentUser } from '@shared/decorators';

@ApiTags('Wishlist')
@Controller('wishlist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'Get user wishlist' })
  getWishlist(@CurrentUser() user: any) {
    return this.wishlistService.getWishlistByUserId(user.id);
  }

  @Post('items/:productId')
  @ApiOperation({ summary: 'Add item to wishlist' })
  addToWishlist(@CurrentUser() user: any, @Param('productId') productId: string) {
    return this.wishlistService.addToWishlist(user.id, productId);
  }

  @Delete('items/:productId')
  @ApiOperation({ summary: 'Remove item from wishlist' })
  removeFromWishlist(@CurrentUser() user: any, @Param('productId') productId: string) {
    return this.wishlistService.removeFromWishlist(user.id, productId);
  }
}
