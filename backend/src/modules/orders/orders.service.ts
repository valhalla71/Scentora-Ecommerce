import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';
import { OrderStatus, CartStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';

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
      throw new NotFoundException(
        'Cart is empty',
      );
    }


    const subtotal = cart.items.reduce(
      (sum, item) =>
        sum + Number(item.product.price) * item.quantity,
      0,
    );


    const tax = 0;

    const shippingCost = 0;

    const total =
      subtotal + tax + shippingCost;


    const orderNumber =
      `ORD-${Date.now()}`;


    return this.prisma.$transaction(
      async (tx) => {

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
      },
    );
  }


  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ) {
    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  }
}