import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';
import { OrderStatus, CartStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  NotFoundException,
  BadRequestException,
} from '@shared/exceptions/custom.exceptions';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
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
    const order = await this.prisma.order.findFirst({
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

    if (!order) {
      throw new NotFoundException('Order', orderId);
    }

    return order;
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
      throw new NotFoundException('Cart', userId);
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

      /**
       * Atomic inventory validation + decrease
       * Prevents overselling caused by concurrent order creation
       */
      for (const item of cart.items) {
        const inventory = await tx.inventory.findUnique({
          where: {
            productId: item.productId,
          },
        });

        if (!inventory) {
          throw new BadRequestException(
            `Inventory not found for product ${item.productId}`,
          );
        }

        const availableQuantity =
          inventory.quantity - inventory.reserved;

        if (availableQuantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${item.productId}`,
          );
        }

        await tx.inventory.update({
          where: {
            productId: item.productId,
          },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

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
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        ...(userId && { userId }),
      },
    });

    if (!order) {
      throw new NotFoundException('Order', orderId);
    }

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

  private validateStatusTransition(
    currentStatus: OrderStatus,
    newStatus: OrderStatus,
  ) {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [
        OrderStatus.CONFIRMED,
        OrderStatus.CANCELLED,
      ],

      [OrderStatus.CONFIRMED]: [
        OrderStatus.PROCESSING,
        OrderStatus.CANCELLED,
      ],

      [OrderStatus.PROCESSING]: [
        OrderStatus.SHIPPED,
        OrderStatus.CANCELLED,
      ],

      [OrderStatus.SHIPPED]: [
        OrderStatus.DELIVERED,
        OrderStatus.CANCELLED,
      ],

      [OrderStatus.DELIVERED]: [
        OrderStatus.RETURNED,
      ],

      [OrderStatus.CANCELLED]: [],

      [OrderStatus.RETURNED]: [],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
}