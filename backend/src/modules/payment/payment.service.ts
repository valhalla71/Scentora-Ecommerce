import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';
import { PaymentStatus, PaymentType, WalletTransactionType, OrderStatus } from '@prisma/client';
import { CreatePaymentDto, ProcessPaymentDto } from './dto/create-payment.dto';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService,
  ) {}

  async createPayment(userId: string, createPaymentDto: CreatePaymentDto) {
    // Verify order exists and belongs to user
    const order = await this.prisma.order.findFirst({
      where: {
        id: createPaymentDto.orderId,
        userId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Order is not in PENDING status');
    }

    // Get user wallet
    let wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      wallet = await this.prisma.wallet.create({
        data: { userId, balance: 0 },
      });
    }

    // Calculate amounts based on payment type
    const totalAmount = Number(order.total);
    let walletAmountUsed = 0;
    let gatewayAmount = totalAmount;

    if (createPaymentDto.paymentType === PaymentType.WALLET) {
      if (Number(wallet.balance) < totalAmount) {
        throw new BadRequestException(
          `Insufficient wallet balance. Available: ${wallet.balance}, Required: ${totalAmount}`,
        );
      }
      walletAmountUsed = totalAmount;
      gatewayAmount = 0;
    } else if (createPaymentDto.paymentType === PaymentType.MIXED) {
      walletAmountUsed = Math.min(Number(wallet.balance), totalAmount);
      gatewayAmount = totalAmount - walletAmountUsed;

      if (!createPaymentDto.paymentMethod) {
        throw new BadRequestException(
          'Payment method required for MIXED payment',
        );
      }
    } else if (createPaymentDto.paymentType === PaymentType.GATEWAY) {
      if (!createPaymentDto.paymentMethod) {
        throw new BadRequestException(
          'Payment method required for GATEWAY payment',
        );
      }
    }

    // Create payment record
    const payment = await this.prisma.payment.create({
      data: {
        orderId: createPaymentDto.orderId,
        userId,
        paymentType: createPaymentDto.paymentType,
        paymentMethod: createPaymentDto.paymentMethod || null,
        status: PaymentStatus.PENDING,
        amount: totalAmount,
        walletAmountUsed,
        gatewayAmount,
      },
    });

    return payment;
  }

  async processPayment(userId: string, processPaymentDto: ProcessPaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: processPaymentDto.paymentId },
      include: {
        order: {
          include: {
            items: true,
          },
        },
        user: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    if (payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException(`Payment is already ${payment.status}`);
    }

    return this.prisma.$transaction(async (tx) => {
      // Update payment status
      const updatedPayment = await tx.payment.update({
        where: { id: processPaymentDto.paymentId },
        data: {
          status: PaymentStatus.PROCESSING,
        },
      });

      // Handle wallet deduction if applicable
      if (Number(payment.walletAmountUsed) > 0) {
        const wallet = await tx.wallet.findUnique({
          where: { userId },
        });

        if (!wallet || Number(wallet.balance) < Number(payment.walletAmountUsed)) {
          throw new BadRequestException('Insufficient wallet balance');
        }

        // Deduct from wallet
        await tx.wallet.update({
          where: { userId },
          data: {
            balance: {
              decrement: payment.walletAmountUsed,
            },
          },
        });

        // Record wallet transaction
        await tx.walletTransaction.create({
          data: {
            walletId: wallet.id,
            type: WalletTransactionType.DEBIT,
            amount: payment.walletAmountUsed,
            description: `Payment for order ${payment.orderId}`,
            relatedPaymentId: payment.id,
          },
        });
      }

      // Simulate gateway payment success (real implementation would call actual gateway)
      // For now, mark as successful
      const finalPayment = await tx.payment.update({
        where: { id: processPaymentDto.paymentId },
        data: {
          status: PaymentStatus.SUCCESS,
          gatewayReference: processPaymentDto.gatewayToken || `GW-${Date.now()}`,
        },
      });

      // Create payment transaction record
      await tx.paymentTransaction.create({
        data: {
          paymentId: payment.id,
          type: 'PAYMENT_SUCCESS',
          status: PaymentStatus.SUCCESS,
          amount: payment.amount,
          description: `Payment processed for order ${payment.orderId}`,
        },
      });

      // Update order status to CONFIRMED
      await tx.order.update({
        where: { id: payment.orderId },
        data: {
          status: OrderStatus.CONFIRMED,
        },
      });

      return finalPayment;
    });
  }

  async getPaymentById(paymentId: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        transactions: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    return payment;
  }

  async getOrderPayment(orderId: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { orderId },
      include: {
        transactions: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    return payment;
  }

  async retryPayment(paymentId: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    if (payment.status !== PaymentStatus.FAILED && payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException(
        `Cannot retry payment in ${payment.status} status`,
      );
    }

    return this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.PENDING,
        retryCount: {
          increment: 1,
        },
      },
    });
  }

  async cancelPayment(paymentId: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    if (payment.status !== PaymentStatus.PENDING && payment.status !== PaymentStatus.PROCESSING) {
      throw new BadRequestException(
        `Cannot cancel payment in ${payment.status} status`,
      );
    }

    return this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.CANCELLED,
      },
    });
  }

  async getOrderPaymentHistory(orderId: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { orderId },
      include: {
        transactions: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found for this order');
    }

    if (payment.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    return payment;
  }
}
