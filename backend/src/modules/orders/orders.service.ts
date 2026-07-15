import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getUserOrders(userId: string, skip: number, take: number) {
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        skip,
        take,
        include: {
          items: { include: { product: true } },
          payment: true,
          shipping: true,
        },
      }),
      this.prisma.order.count({ where: { userId } }),
    ]);

    return { orders, total };
  }

  async getOrderById(orderId: string, userId: string) {
    return this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: { include: { product: true } },
        payment: true,
        shipping: true,
      },
    });
  }

  async createOrder(userId: string, data: any) {
    const orderNumber = `ORD-${Date.now()}`;

    return this.prisma.order.create({
      data: {
        userId,
        orderNumber,
        subtotal: data.subtotal,
        tax: data.tax,
        shippingCost: data.shippingCost,
        total: data.total,
        status: 'PENDING',
        items: {
          create: data.items,
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}
