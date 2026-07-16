import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';
import { ShippingStatus, OrderStatus, PaymentStatus } from '@prisma/client';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingStatusDto } from './dto/update-shipping-status.dto';

@Injectable()
export class ShippingService {
  constructor(private prisma: PrismaService) {}

  async createShipping(createShippingDto: CreateShippingDto, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: createShippingDto.orderId,
        userId,
      },
      include: {
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order ${createShippingDto.orderId} not found`);
    }

    // Verify order is in correct state for shipping (must be CONFIRMED)
    if (order.status !== OrderStatus.CONFIRMED) {
      throw new BadRequestException(
        `Cannot create shipping for order in ${order.status} status. Order must be CONFIRMED.`,
      );
    }

    // Verify payment is successful (order should not proceed to shipping without successful payment)
    if (!order.payment || order.payment.status !== PaymentStatus.SUCCESS) {
      throw new BadRequestException(
        'Cannot create shipping without successful payment. Order payment must be SUCCESS.',
      );
    }

    // Check if shipping already exists for this order
    const existingShipping = await this.prisma.shipping.findUnique({
      where: { orderId: createShippingDto.orderId },
    });

    if (existingShipping) {
      throw new BadRequestException(
        `Shipping already exists for order ${createShippingDto.orderId}`,
      );
    }

    return this.prisma.shipping.create({
      data: {
        orderId: createShippingDto.orderId,
        street: createShippingDto.street,
        city: createShippingDto.city,
        state: createShippingDto.state,
        zipCode: createShippingDto.zipCode,
        country: createShippingDto.country,
        trackingNumber: createShippingDto.trackingNumber,
        estimatedDeliveryDate: createShippingDto.estimatedDeliveryDate
          ? new Date(createShippingDto.estimatedDeliveryDate)
          : null,
      },
    });
  }

  async updateShippingStatus(
    shippingId: string,
    updateStatusDto: UpdateShippingStatusDto,
    userId: string,
  ) {
    const shipping = await this.prisma.shipping.findUnique({
      where: { id: shippingId },
      include: {
        order: true,
      },
    });

    if (!shipping) {
      throw new NotFoundException(`Shipping record ${shippingId} not found`);
    }

    // Ownership check
    if (shipping.order.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    // Validate status transition
    this.validateShippingStatusTransition(shipping.status, updateStatusDto.status);

    return this.prisma.shipping.update({
      where: { id: shippingId },
      data: {
        status: updateStatusDto.status,
        trackingNumber: updateStatusDto.trackingNumber || shipping.trackingNumber,
        actualDeliveryDate:
          updateStatusDto.status === ShippingStatus.DELIVERED
            ? new Date()
            : shipping.actualDeliveryDate,
      },
      include: {
        order: true,
      },
    });
  }

  private validateShippingStatusTransition(
    currentStatus: ShippingStatus,
    newStatus: ShippingStatus,
  ) {
    const validTransitions: Record<ShippingStatus, ShippingStatus[]> = {
      [ShippingStatus.PENDING]: [ShippingStatus.PROCESSING, ShippingStatus.FAILED],
      [ShippingStatus.PROCESSING]: [
        ShippingStatus.SHIPPED,
        ShippingStatus.FAILED,
      ],
      [ShippingStatus.SHIPPED]: [ShippingStatus.IN_TRANSIT, ShippingStatus.FAILED],
      [ShippingStatus.IN_TRANSIT]: [ShippingStatus.DELIVERED, ShippingStatus.FAILED],
      [ShippingStatus.DELIVERED]: [],
      [ShippingStatus.FAILED]: [ShippingStatus.PENDING],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `Invalid shipping status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }

  async getShippingByOrderId(orderId: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const shipping = await this.prisma.shipping.findUnique({
      where: { orderId },
      include: {
        order: true,
      },
    });

    if (!shipping) {
      throw new NotFoundException(`Shipping info not found for order ${orderId}`);
    }

    return shipping;
  }

  async getShippingById(shippingId: string, userId: string) {
    const shipping = await this.prisma.shipping.findUnique({
      where: { id: shippingId },
      include: {
        order: true,
      },
    });

    if (!shipping) {
      throw new NotFoundException(`Shipping record ${shippingId} not found`);
    }

    // Ownership check
    if (shipping.order.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    return shipping;
  }

  async getUserShippings(userId: string) {
    return this.prisma.shipping.findMany({
      where: {
        order: {
          userId,
        },
      },
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            total: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
