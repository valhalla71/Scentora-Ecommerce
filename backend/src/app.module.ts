import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import configuration from '@config/configuration';
import { CommonModule } from '@common/common.module';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RolesGuard } from '@shared/guards/roles.guard';
import { HealthModule } from '@modules/health/health.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ProductsModule } from '@modules/products/products.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { BrandsModule } from '@modules/brands/brands.module';
import { CartModule } from '@modules/cart/cart.module';
import { WishlistModule } from '@modules/wishlist/wishlist.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { InventoryModule } from '@modules/inventory/inventory.module';
import { ReviewsModule } from '@modules/reviews/reviews.module';
import { PaymentModule } from '@modules/payment/payment.module';
import { WalletModule } from '@modules/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CommonModule,
    HealthModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    CartModule,
    WishlistModule,
    OrdersModule,
    InventoryModule,
    ReviewsModule,
    PaymentModule,
    WalletModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
