import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getProductReviews(productId: string, skip: number, take: number) {
    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { productId, status: 'APPROVED' },
        skip,
        take,
        include: { user: true },
      }),
      this.prisma.review.count({
        where: { productId, status: 'APPROVED' },
      }),
    ]);

    return { reviews, total };
  }

  async createReview(productId: string, userId: string, data: any) {
    return this.prisma.review.create({
      data: {
        productId,
        userId,
        rating: data.rating,
        title: data.title,
        content: data.content,
        status: 'PENDING',
      },
    });
  }

  async getUserReviews(userId: string) {
    return this.prisma.review.findMany({
      where: { userId },
      include: { product: true },
    });
  }
}
