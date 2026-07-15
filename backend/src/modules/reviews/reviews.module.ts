import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from '@config/prisma.service';

@Module({
  providers: [ReviewsService, PrismaService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}
