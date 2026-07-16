import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@config/prisma.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdatePreferencesDto,
  CreateAddressDto,
  UpdateAddressDto,
} from './dto/create-user.dto';
import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@shared/exceptions/custom.exceptions';

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

    return this.prisma.user.create({
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

    return this.prisma.user.update({
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
  }

  /**
   * Admin user update
   * Protected by ADMIN role in controller
   */
  async updateAsAdmin(
    id: string,
    updateUserDto: UpdateUserDto,
    adminId: string,
  ) {
    if (id === adminId) {
      throw new ForbiddenException(
        'Cannot modify your own admin account through admin management',
      );
    }

    return this.update(id, updateUserDto);
  }

  async updatePreferences(
    userId: string,
    updatePreferencesDto: UpdatePreferencesDto,
  ) {
    return this.prisma.userPreference.update({
      where: { userId },
      data: updatePreferencesDto,
    });
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

  async createAddress(
    userId: string,
    createAddressDto: CreateAddressDto,
  ) {
    await this.findById(userId);

    return this.prisma.address.create({
      data: {
        ...createAddressDto,
        userId,
      },
    });
  }

  async getAddresses(userId: string) {
    await this.findById(userId);

    return this.prisma.address.findMany({
      where: { userId },
    });
  }

  async getAddressById(userId: string, addressId: string) {
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      throw new ForbiddenException(
        'You do not have access to this address',
      );
    }

    return address;
  }

  async updateAddress(
    userId: string,
    addressId: string,
    updateAddressDto: UpdateAddressDto,
  ) {
    await this.getAddressById(userId, addressId);

    return this.prisma.address.update({
      where: { id: addressId },
      data: updateAddressDto,
    });
  }

  async deleteAddress(userId: string, addressId: string) {
    await this.getAddressById(userId, addressId);

    await this.prisma.address.delete({
      where: { id: addressId },
    });

    return {
      message: 'Address deleted successfully',
    };
  }

  async setDefaultAddress(userId: string, addressId: string) {
    const address = await this.getAddressById(userId, addressId);

    await this.prisma.address.updateMany({
      where: {
        userId,
        type: address.type,
      },
      data: {
        isDefault: false,
      },
    });

    return this.prisma.address.update({
      where: { id: addressId },
      data: {
        isDefault: true,
      },
    });
  }

  async remove(id: string) {
    await this.findById(id);

    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      message: 'User deleted successfully',
    };
  }

  /**
   * Admin delete user
   */
  async removeAsAdmin(id: string, adminId: string) {
    if (id === adminId) {
      throw new ForbiddenException(
        'Cannot delete your own account',
      );
    }

    return this.remove(id);
  }
}