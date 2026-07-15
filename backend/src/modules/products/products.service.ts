import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@shared/exceptions/custom.exceptions';
import { SlugGenerator } from '@shared/utils';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const slug = SlugGenerator.generate(createProductDto.name);

    return this.prisma.product.create({
      data: {
        ...createProductDto,
        slug,
        status: 'ACTIVE',
      },
    });
  }

  async findAll(skip: number, take: number) {
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take,
        include: {
          category: true,
          brand: true,
          images: true,
          inventory: true,
        },
      }),
      this.prisma.product.count(),
    ]);

    return { products, total };
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: true,
        attributes: true,
        inventory: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product', id);
    }

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        images: true,
        attributes: true,
        inventory: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product', slug);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findById(id);

    const slug = updateProductDto.name
      ? SlugGenerator.generate(updateProductDto.name)
      : undefined;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        ...(slug && { slug }),
      },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async search(query: string, skip: number, take: number) {
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take,
        include: { category: true, brand: true },
      }),
      this.prisma.product.count({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return { products, total };
  }
}
