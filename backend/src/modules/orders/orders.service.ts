import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';
import { OrderStatus, CartStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService,
  ) {}

  async getUserOrders(userId: string, skip: number, take: number) {
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        skip,
        take,
        include: {
          items: {
            include: {
              product: true,
            },
          },
          payment: true,
          shipping: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.order.count({
        where: { userId },
      }),
    ]);

    return {
      orders,
      total,
    };
  }

  async getOrderById(orderId: string, userId: string) {
    return this.prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        shipping: true,
      },
    });
  }

  async createOrder(
    userId: string,
    createOrderDto: CreateOrderDto,
  ) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
        status: CartStatus.ACTIVE,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    // Check inventory availability before creating order
    for (const item of cart.items) {
      await this.inventoryService.checkAvailability(
        item.productId,
        item.quantity,
      );
    }

    const subtotal = cart.items.reduce(
      (sum, item) =>
        sum + Number(item.product.price) * item.quantity,
      0,
    );

    const tax = 0;
    const shippingCost = 0;

    const total = subtotal + tax + shippingCost;

    const orderNumber = `ORD-${Date.now()}`;

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          orderNumber,
          subtotal,
          tax,
          shippingCost,
          total,
          status: OrderStatus.PENDING,

          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
              total:
                Number(item.product.price) *
                item.quantity,
            })),
          },
        },

        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Reduce inventory after successful order creation
      for (const item of cart.items) {
        await this.inventoryService.decreaseStock(
          item.productId,
          item.quantity,
        );
      }

      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          status: CartStatus.CONVERTED,
        },
      });

      return order;
    });
  }

  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    userId?: string,
  ) {
    // Ownership check
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        ...(userId && { userId }),
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Validate status transition
    this.validateStatusTransition(order.status, status);

    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  }

  private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus) {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
      [OrderStatus.DELIVERED]: [OrderStatus.RETURNED],
      [OrderStatus.CANCELLED]: [],
      [OrderStatus.RETURNED]: [],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new Error(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
}