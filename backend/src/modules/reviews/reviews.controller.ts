import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { CurrentUser } from '@shared/decorators';
import { PaginationDto } from '@shared/dto/common.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get product reviews' })
  getProductReviews(
    @Param('productId') productId: string,
    @Query() pagination: PaginationDto,
  ) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.reviewsService.getProductReviews(productId, skip, pagination.limit);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create review' })
  createReview(@CurrentUser() user: any, @Body() reviewData: any) {
    return this.reviewsService.createReview(
      reviewData.productId,
      user.id,
      reviewData,
    );
  }

  @Get('user/my-reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my reviews' })
  getUserReviews(@CurrentUser() user: any) {
    return this.reviewsService.getUserReviews(user.id);
  }
}
