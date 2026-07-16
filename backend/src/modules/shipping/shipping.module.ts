import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { PrismaService } from '@config/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ShippingService, PrismaService],
  controllers: [ShippingController],
  exports: [ShippingService],
})
export class ShippingModule {}
