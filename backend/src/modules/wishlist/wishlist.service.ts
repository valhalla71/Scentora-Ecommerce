import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlistByUserId(userId: string) {
    return this.prisma.wishlist.findFirst({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }

  async addToWishlist(userId: string, productId: string) {
    let wishlist = await this.prisma.wishlist.findFirst({
      where: { userId },
    });

    if (!wishlist) {
      wishlist = await this.prisma.wishlist.create({
        data: { userId },
      });
    }

    return this.prisma.wishlistItem.create({
      data: { wishlistId: wishlist.id, productId },
    }).catch(() => null);
  }

  async removeFromWishlist(userId: string, productId: string) {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: { userId },
    });

    if (!wishlist) return null;

    return this.prisma.wishlistItem.delete({
      where: { wishlistId_productId: { wishlistId: wishlist.id, productId } },
    });
  }
}
