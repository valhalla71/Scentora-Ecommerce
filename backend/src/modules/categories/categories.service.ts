import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';

export class CreateCategoryDto {
  name!: string;
  description?: string;
}

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      include: { products: true },
    });
  }

  async findById(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async create(data: CreateCategoryDto) {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    return this.prisma.category.create({
      data: { ...data, slug },
    });
  }
}
