import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';

export class CreateBrandDto {
  name!: string;
  description?: string;
}

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.brand.findMany({
      include: { products: true },
    });
  }

  async findById(id: string) {
    return this.prisma.brand.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async create(data: CreateBrandDto) {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    return this.prisma.brand.create({
      data: { ...data, slug },
    });
  }
}
