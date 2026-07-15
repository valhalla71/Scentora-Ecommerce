import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.review.deleteMany(),
    prisma.wishlistItem.deleteMany(),
    prisma.wishlist.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.cart.deleteMany(),
    prisma.shipping.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.address.deleteMany(),
    prisma.emailVerificationToken.deleteMany(),
    prisma.passwordResetToken.deleteMany(),
    prisma.refreshToken.deleteMany(),
    prisma.userPreference.deleteMany(),
    prisma.rolePermission.deleteMany(),
    prisma.userRole.deleteMany(),
    prisma.inventory.deleteMany(),
    prisma.productAttribute.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.brand.deleteMany(),
    prisma.permission.deleteMany(),
    prisma.role.deleteMany(),
    prisma.coupon.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Seed Roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      description: 'Administrator role with full access',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'USER',
      description: 'Regular user role',
    },
  });

  const vendorRole = await prisma.role.create({
    data: {
      name: 'VENDOR',
      description: 'Vendor role for sellers',
    },
  });

  // Seed Permissions
  const permissions = [
    { name: 'CREATE_USER', resource: 'users', action: 'create' },
    { name: 'READ_USER', resource: 'users', action: 'read' },
    { name: 'UPDATE_USER', resource: 'users', action: 'update' },
    { name: 'DELETE_USER', resource: 'users', action: 'delete' },
    { name: 'CREATE_PRODUCT', resource: 'products', action: 'create' },
    { name: 'READ_PRODUCT', resource: 'products', action: 'read' },
    { name: 'UPDATE_PRODUCT', resource: 'products', action: 'update' },
    { name: 'DELETE_PRODUCT', resource: 'products', action: 'delete' },
    { name: 'CREATE_ORDER', resource: 'orders', action: 'create' },
    { name: 'READ_ORDER', resource: 'orders', action: 'read' },
    { name: 'UPDATE_ORDER', resource: 'orders', action: 'update' },
  ];

  const createdPermissions = await Promise.all(
    permissions.map((p) =>
      prisma.permission.create({ data: p }).catch(() => null),
    ),
  );

  // Assign permissions to roles
  const adminPermissions = createdPermissions.filter(
    (p) => p !== null,
  );
  for (const permission of adminPermissions) {
    await prisma.rolePermission.create({
      data: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    }).catch(() => null);
  }

  // Seed Categories
  const perfumeCategory = await prisma.category.create({
    data: {
      name: 'Perfumes',
      slug: 'perfumes',
      description: 'Premium perfumes collection',
    },
  });

  const cologneCategory = await prisma.category.create({
    data: {
      name: 'Colognes',
      slug: 'colognes',
      description: 'Premium colognes collection',
    },
  });

  // Seed Brands
  const brandDior = await prisma.brand.create({
    data: {
      name: 'Dior',
      slug: 'dior',
      description: 'Luxury brand Dior',
    },
  });

  const brandGuerlain = await prisma.brand.create({
    data: {
      name: 'Guerlain',
      slug: 'guerlain',
      description: 'Luxury brand Guerlain',
    },
  });

  // Seed Admin User
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@scentora.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      status: 'ACTIVE',
      roles: {
        create: [{ roleId: adminRole.id }],
      },
      preferences: {
        create: {
          language: 'en',
          theme: 'dark',
          emailNotifications: true,
        },
      },
    },
  });

  // Seed Sample Products
  const product1 = await prisma.product.create({
    data: {
      name: 'J\'adore Eau de Parfum',
      slug: 'jadore-eau-de-parfum',
      description: 'A luxurious floral fragrance',
      price: 150.0,
      cost: 75.0,
      categoryId: perfumeCategory.id,
      brandId: brandDior.id,
      status: 'ACTIVE',
      images: {
        create: [
          {
            url: 'https://example.com/jadore-1.jpg',
            alt: 'J\'adore bottle',
            isPrimary: true,
            order: 1,
          },
        ],
      },
      attributes: {
        create: [
          { name: 'Volume', value: '75ml' },
          { name: 'Type', value: 'Eau de Parfum' },
        ],
      },
      inventory: {
        create: {
          quantity: 100,
          reserved: 0,
        },
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'La Petite Robe Noire',
      slug: 'la-petite-robe-noire',
      description: 'An elegant and sophisticated fragrance',
      price: 120.0,
      cost: 60.0,
      categoryId: perfumeCategory.id,
      brandId: brandGuerlain.id,
      status: 'ACTIVE',
      images: {
        create: [
          {
            url: 'https://example.com/robe-noire-1.jpg',
            alt: 'La Petite Robe Noire bottle',
            isPrimary: true,
            order: 1,
          },
        ],
      },
      attributes: {
        create: [
          { name: 'Volume', value: '100ml' },
          { name: 'Type', value: 'Eau de Parfum' },
        ],
      },
      inventory: {
        create: {
          quantity: 80,
          reserved: 0,
        },
      },
    },
  });

  // Seed Sample User
  const sampleUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: await bcrypt.hash('User@123', 10),
      firstName: 'John',
      lastName: 'Doe',
      phone: '+9876543210',
      status: 'ACTIVE',
      roles: {
        create: [{ roleId: userRole.id }],
      },
      preferences: {
        create: {
          language: 'en',
          theme: 'light',
          emailNotifications: true,
        },
      },
      addresses: {
        create: [
          {
            type: 'BILLING',
            fullName: 'John Doe',
            phone: '+9876543210',
            address: '123 Main St',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90001',
            country: 'USA',
            isDefault: true,
          },
        ],
      },
    },
  });

  // Seed Sample Cart
  const cart = await prisma.cart.create({
    data: {
      userId: sampleUser.id,
      status: 'ACTIVE',
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 2,
          },
        ],
      },
    },
  });

  // Seed Sample Wishlist
  const wishlist = await prisma.wishlist.create({
    data: {
      userId: sampleUser.id,
      items: {
        create: [
          {
            productId: product2.id,
          },
        ],
      },
    },
  });

  // Seed Sample Coupon
  await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10,
      minPurchase: 50,
      maxUses: 100,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
