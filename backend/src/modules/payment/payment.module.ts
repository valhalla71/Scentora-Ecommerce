import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from '@config/prisma.service';
import { InventoryModule } from '../inventory/inventory.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    InventoryModule,
    AuthModule,
  ],
  providers: [
    PaymentService,
    PrismaService,
  ],
  controllers: [
    PaymentController,
  ],
  exports: [
    PaymentService,
  ],
})
export class PaymentModule {}