import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { PrismaService } from '@config/prisma.service';

@Module({
  providers: [BrandsService, PrismaService],
  controllers: [BrandsController],
  exports: [BrandsService],
})
export class BrandsModule {}
