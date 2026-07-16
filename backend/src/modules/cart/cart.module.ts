import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '@config/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  providers: [
    CartService,
    PrismaService,
  ],
  controllers: [
    CartController,
  ],
  exports: [
    CartService,
  ],
})
export class CartModule {}