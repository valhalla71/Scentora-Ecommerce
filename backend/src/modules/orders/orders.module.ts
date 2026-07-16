import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '@config/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    AuthModule,
    InventoryModule,
  ],
  providers: [
    OrdersService,
    PrismaService,
  ],
  controllers: [
    OrdersController,
  ],
  exports: [
    OrdersService,
  ],
})
export class OrdersModule {}