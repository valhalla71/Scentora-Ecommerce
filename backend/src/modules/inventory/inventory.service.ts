import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';
import { BadRequestException } from '@shared/exceptions/custom.exceptions';

/**
 * Inventory Service
 *
 * Current State:
 * - Stock is decreased immediately during order creation
 * - Reserved count is tracked but not used in current flow
 *
 * Future Enhancement (Payment-based Reservation):
 * Replace current flow (Create Order → Decrease Stock) with:
 * 1. Create Order → Reserve Stock
 * 2. Create Payment (PENDING)
 * 3. Process Payment (SUCCESS) → Decrease Stock
 * 4. Payment Failed → Release Reserved Stock
 *
 * This service already has the methods needed:
 * - reserveStock(): Increments reserved count without decreasing quantity
 * - releaseReservedStock(): Decrements reserved count (for payment failures)
 * - decreaseStock(): Final step when payment succeeds
 *
 * The checkAvailability method accounts for reserved qty:
 * availableQuantity = quantity - reserved
 */

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getInventory(productId: string) {
    return this.prisma.inventory.findUnique({
      where: { productId },
    });
  }

  async checkAvailability(productId: string, quantity: number) {
    const inventory = await this.getInventory(productId);

    if (!inventory) {
      throw new BadRequestException(
        `Inventory not found for product ${productId}`,
      );
    }

    const availableQuantity = inventory.quantity - inventory.reserved;

    if (availableQuantity < quantity) {
      throw new BadRequestException(
        `Insufficient stock for product ${productId}`,
      );
    }

    return true;
  }

  async decreaseStock(productId: string, quantity: number) {
    return this.prisma.inventory.update({
      where: { productId },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });
  }

  async updateStock(productId: string, quantity: number) {
    return this.prisma.inventory.update({
      where: { productId },
      data: { quantity },
    });
  }

  async reserveStock(productId: string, quantity: number) {
    await this.checkAvailability(productId, quantity);

    return this.prisma.inventory.update({
      where: { productId },
      data: {
        reserved: {
          increment: quantity,
        },
      },
    });
  }

  async releaseReservedStock(productId: string, quantity: number) {
    return this.prisma.inventory.update({
      where: { productId },
      data: {
        reserved: {
          decrement: quantity,
        },
      },
    });
  }
}