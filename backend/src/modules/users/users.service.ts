import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@config/prisma.service';
import { CreateUserDto, UpdateUserDto, UpdatePreferencesDto, CreateAddressDto, UpdateAddressDto } from './dto/create-user.dto';
import { ConflictException, NotFoundException, ForbiddenException } from '@shared/exceptions/custom.exceptions';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        phone: createUserDto.phone,
        preferences: {
          create: {
            language: 'en',
            theme: 'light',
            emailNotifications: true,
          },
        },
        roles: {
          create: {
            role: {
              connect: {
                name: 'USER',
              },
            },
          },
        },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async findAll(skip: number, take: number) {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return { users, total };
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User', id);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User', userId);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findById(id);

    const updated = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updated;
  }

  async updatePreferences(userId: string, updatePreferencesDto: UpdatePreferencesDto) {
    const preferences = await this.prisma.userPreference.update({
      where: { userId },
      data: updatePreferencesDto,
    });

    return preferences;
  }

  async getPreferences(userId: string) {
    const preferences = await this.prisma.userPreference.findUnique({
      where: { userId },
    });

    if (!preferences) {
      throw new NotFoundException('Preferences', userId);
    }

    return preferences;
  }

  async createAddress(userId: string, createAddressDto: CreateAddressDto) {
    await this.findById(userId);

    const address = await this.prisma.address.create({
      data: {
        ...createAddressDto,
        userId,
      },
    });

    return address;
  }

  async getAddresses(userId: string) {
    await this.findById(userId);

    const addresses = await this.prisma.address.findMany({
      where: { userId },
    });

    return addresses;
  }

  async getAddressById(userId: string, addressId: string) {
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      throw new ForbiddenException('You do not have access to this address');
    }

    return address;
  }

  async updateAddress(userId: string, addressId: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.getAddressById(userId, addressId);

    const updated = await this.prisma.address.update({
      where: { id: addressId },
      data: updateAddressDto,
    });

    return updated;
  }

  async deleteAddress(userId: string, addressId: string) {
    await this.getAddressById(userId, addressId);

    await this.prisma.address.delete({
      where: { id: addressId },
    });

    return { message: 'Address deleted successfully' };
  }

  async setDefaultAddress(userId: string, addressId: string) {
    const address = await this.getAddressById(userId, addressId);

    await this.prisma.address.updateMany({
      where: { userId, type: address.type },
      data: { isDefault: false },
    });

    const updated = await this.prisma.address.update({
      where: { id: addressId },
      data: { isDefault: true },
    });

    return updated;
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
