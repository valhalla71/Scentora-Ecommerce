import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from '@config/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  providers: [
    ReviewsService,
    PrismaService,
  ],
  controllers: [
    ReviewsController,
  ],
  exports: [
    ReviewsService,
  ],
})
export class ReviewsModule {}