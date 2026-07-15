import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getInventory(productId: string) {
    return this.prisma.inventory.findUnique({
      where: { productId },
    });
  }

  async updateStock(productId: string, quantity: number) {
    return this.prisma.inventory.update({
      where: { productId },
      data: { quantity },
    });
  }

  async reserveStock(productId: string, quantity: number) {
    return this.prisma.inventory.update({
      where: { productId },
      data: {
        reserved: { increment: quantity },
      },
    });
  }

  async releaseReservedStock(productId: string, quantity: number) {
    return this.prisma.inventory.update({
      where: { productId },
      data: {
        reserved: { decrement: quantity },
      },
    });
  }
}
