# Scentora Backend API

## Overview
Production-ready NestJS backend for Scentora perfume e-commerce platform.

## Stack
- **Framework**: NestJS 10.3.0
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Security**: Helmet, bcrypt

## Project Structure
```
backend/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── common/                 # Global exception filters, interceptors, pipes
│   ├── config/                 # Configuration and database setup
│   ├── modules/                # Feature modules
│   │   ├── health/             # Health check endpoints
│   │   ├── auth/               # Authentication
│   │   ├── users/              # User management
│   │   ├── products/           # Product catalog
│   │   ├── categories/         # Product categories
│   │   ├── brands/             # Product brands
│   │   ├── cart/               # Shopping cart
│   │   ├── wishlist/           # User wishlists
│   │   ├── orders/             # Order management
│   │   ├── inventory/          # Stock management
│   │   └── reviews/            # Product reviews
│   └── shared/                 # Shared utilities
│       ├── decorators/         # Custom decorators
│       ├── dto/                # Data transfer objects
│       ├── exceptions/         # Custom exceptions
│       ├── guards/             # Auth guards
│       └── utils/              # Utility functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Database seeding
│   └── migrations/             # Database migrations
├── docker-compose.yml          # Development environment
├── Dockerfile                  # Production container
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
└── .env.example                # Environment template
```

## Features
- **Users Module**: User management with roles and permissions
- **Authentication**: JWT-based authentication with refresh tokens
- **Catalog**: Complete product catalog with categories and brands
- **Shopping**: Shopping cart and wishlist functionality
- **Orders**: Order management with tracking
- **Inventory**: Stock management with reservation system
- **Reviews**: Product reviews and ratings
- **Security**: Role-based access control (RBAC)
- **API Documentation**: Auto-generated Swagger docs
- **Error Handling**: Global exception handling
- **Validation**: Request validation with DTOs

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` from `.env.example`:
```bash
cp .env.example .env
```

3. Setup database:
```bash
npm run db:migrate:dev
npm run db:seed
```

4. Start development server:
```bash
npm run start:dev
```

### Docker Setup

Start development environment with Docker:
```bash
docker-compose up
```

## Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start in debug mode

# Production
npm build                  # Build for production
npm run start:prod         # Start production server

# Database
npm run db:generate        # Generate Prisma client
npm run db:migrate:dev     # Run migrations in dev
npm run db:migrate:prod    # Run migrations in production
npm run db:seed            # Seed database
npm run db:reset           # Reset database

# Quality
npm run lint               # Run ESLint
npm run format             # Format code
npm test                   # Run tests
npm run test:cov           # Run tests with coverage
```

## API Documentation

Swagger documentation available at: `http://localhost:3001/api/docs`

### Endpoints

#### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/me` - Get current user

#### Users
- `GET /api/v1/users` - List users
- `POST /api/v1/users` - Create user
- `GET /api/v1/users/:id` - Get user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

#### Products
- `GET /api/v1/products` - List products
- `POST /api/v1/products` - Create product
- `GET /api/v1/products/:id` - Get product
- `GET /api/v1/products/slug/:slug` - Get product by slug
- `GET /api/v1/products/search?q=` - Search products
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

#### Categories
- `GET /api/v1/categories` - List categories
- `GET /api/v1/categories/:id` - Get category

#### Brands
- `GET /api/v1/brands` - List brands
- `GET /api/v1/brands/:id` - Get brand

#### Cart (Protected)
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart/items` - Add to cart
- `DELETE /api/v1/cart/items/:productId` - Remove from cart
- `DELETE /api/v1/cart` - Clear cart

#### Wishlist (Protected)
- `GET /api/v1/wishlist` - Get user wishlist
- `POST /api/v1/wishlist/items/:productId` - Add to wishlist
- `DELETE /api/v1/wishlist/items/:productId` - Remove from wishlist

#### Orders (Protected)
- `GET /api/v1/orders` - List user orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/:id` - Get order

#### Reviews
- `GET /api/v1/reviews/product/:productId` - Get product reviews
- `POST /api/v1/reviews` - Create review (Protected)
- `GET /api/v1/reviews/user/my-reviews` - Get my reviews (Protected)

#### Health
- `GET /api/v1/health` - Health check
- `GET /api/v1/health/ready` - Readiness check

## Database Schema

The database includes the following models:

### Users
- User, Role, Permission, UserRole, RolePermission, UserPreference

### Catalog
- Product, Category, Brand, ProductImage, ProductAttribute

### Inventory
- Inventory

### Shopping
- Cart, CartItem, Wishlist, WishlistItem

### Orders
- Order, OrderItem, Address, Payment, Shipping

### Reviews & Notifications
- Review, Notification

### Business
- Coupon

## Environment Variables

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/scentora_dev
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d
API_PREFIX=/api/v1
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:3000
```

## Authentication

### JWT Flow
1. User logs in with email/password
2. Server returns JWT token
3. Client sends token in Authorization header: `Bearer {token}`
4. Server validates token on protected routes

### Roles & Permissions
- ADMIN: Full system access
- USER: Customer access
- VENDOR: Seller access (placeholder)

## Security Features
- Helmet middleware for HTTP headers
- bcrypt for password hashing
- JWT token validation
- CORS enabled
- Request validation with DTOs
- Soft delete support
- Role-based access control

## Performance Optimizations
- Pagination support on list endpoints
- Database indexes on frequently queried fields
- Lazy-loaded relationships
- Query optimization

## Error Handling

Global exception filter handles:
- HTTP exceptions
- Database errors
- Validation errors
- Unauthorized access
- Not found errors

## Future Enhancements
- Rate limiting
- Caching layer (Redis)
- Email notifications
- Payment gateway integration
- Admin dashboard
- Analytics
- Recommendation engine
- Inventory sync
- Order tracking updates
