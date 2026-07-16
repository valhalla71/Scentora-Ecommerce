# Scentora AI Context

## Project Identity

Project Name:

Scentora

Type:

Luxury perfume ecommerce platform

Goal:

Build a portfolio-grade premium ecommerce platform focused on perfume discovery, personalization, storytelling, and luxury shopping experience.

---

# Current Development Status

## Current Phase

Backend Foundation Completed

Current checkpoint:

Backend API is running successfully and initial endpoints have been tested.

---

# Tech Stack

## Backend

Framework:

NestJS

Language:

TypeScript

ORM:

Prisma

Database:

PostgreSQL

Runtime:

Node.js 22

Architecture:

Domain-based modular architecture

---



## Frontend

Framework:

Next.js 16

Language:

TypeScript

Styling:

Tailwind CSS

UI:

shadcn/ui

Features prepared:

- Persian / English i18n
- RTL / LTR support
- Luxury theme system
- Component-based architecture

---



# Backend Completed Modules

The following modules exist:

✅ Auth Module

Responsibilities:

- Register
- Login
- JWT authentication
- Protected routes

✅ Users Module

Completed:

- User creation
- User profile
- User update
- User preferences
- User addresses

✅ Products Module

Completed:

- Product listing
- Product search
- Product details
- Product slug lookup
- Product update/delete routes

✅ Categories Module

Completed:

- Category listing
- Category details

✅ Brands Module

Completed:

- Brand listing
- Brand details

✅ Cart Module

Completed:

- Get cart
- Add item
- Remove item
- Clear cart

✅ Wishlist Module

Completed:

- Get wishlist
- Add item
- Remove item

✅ Orders Module

Completed:

- Create order
- Get orders
- Get order details

✅ Reviews Module

Completed:

- Product reviews
- Create review
- User reviews

---



# Current API Status

Backend server:

Running successfully

URL:

[http://localhost:3001/api/v1](http://localhost:3001/api/v1)

Swagger:

[http://localhost:3001/api/docs](http://localhost:3001/api/docs)

---



# Verified Tests



## Products API

Request:

GET /api/v1/products

Result:

200 OK

Response verified:

- Products returned
- Categories included
- Brands included
- Images included
- Inventory included

---



# Database Status

Database:

PostgreSQL

Prisma:

Connected successfully

Seed/Test data exists.

Existing test users:

[admin@scentora.com](mailto:admin@scentora.com)

[user@example.com](mailto:user@example.com)

[test@scentora.com](mailto:test@scentora.com)

[ali2@scentora.com](mailto:ali2@scentora.com)

---



# Current Issue / Next Task

Before moving forward:

Authentication flow needs testing.

Next steps:

1. Verify Register endpoint
2. Verify Login endpoint
3. Get JWT token
4. Test protected endpoint:
  GET /api/v1/auth/me
5. Verify guards and authentication

---



# Development Rules

IMPORTANT:

- Do not rewrite existing architecture.
- Do not replace NestJS/Prisma structure.
- Keep domain-based modules.
- Avoid unnecessary dependencies.
- Check existing implementation before creating new files.
- Maintain luxury ecommerce direction.
- Every completed milestone must update this file.

---



# Future Update Rule

After completing each major step:

Update this file with:

- What was completed
- What was tested
- Current problems
- Next action

This file is the source of truth for future AI sessions.  

---



# Update Log



## 2026-07-16



### Completed

- Backend build fixed successfully.
- NestJS server running successfully.
- Products API tested successfully.
- Product response verified with category, brand, images and inventory.
- Initial project memory system created.



### Current Status

- Backend foundation is stable.
- Authentication flow testing is the next step.



### Next Actions

- Test register endpoint.
- Test login endpoint.
- Verify JWT token.
- Verify protected routes.

---



## 2026-07-16 Backend Progress



### Authentication Testing Completed

- Backend successfully running on localhost:3001
- Swagger available at /api/docs
- Register endpoint tested successfully
- Login endpoint tested successfully
- JWT token generation works
- Swagger Authorize works
- GET /api/v1/auth/me returns authenticated user successfully

Test user:

email: [user_847291@scentora.com](mailto:user_847291@scentora.com)

role: USER

Auth flow status: COMPLETED ✅  
  
## Update - Cart Module Swagger DTO Improvement

Date: 2026-07-16

### Completed

- Added dedicated DTO for Cart item creation:

  - Path:

    `src/modules/cart/dto/add-cart-item.dto.ts`

### Reason

- Previous implementation used inline TypeScript type:

  `@Body() body: { productId: string; quantity: number }`

- Swagger could not detect runtime schema, therefore POST `/cart/items` had no request body documentation.

### New Architecture Rule

- All API request bodies should use dedicated DTO classes instead of inline object types.

- DTOs must include:

  - Swagger decorators `@ApiProperty`)

  - Validation decorators `class-validator`)

### Next Required Step

- Replace inline cart body type in:

  `src/modules/cart/cart.controller.ts`

with:

`AddCartItemDto`

so Swagger automatically generates request body schema.

## 2026-07-16 - Cart Module Completed

### Changes
- Created AddCartItemDto for cart item creation.
- Updated CartController to use AddCartItemDto instead of inline body object.
- Cart endpoints tested successfully through Swagger.

### Verified Endpoints
- POST /api/v1/cart/items
  - Add product to cart ✅
  - Existing product quantity increments instead of creating duplicate CartItem ✅

- GET /api/v1/cart
  - Returns active user cart with items and product relation ✅

- DELETE /api/v1/cart/items/:productId
  - Removes only selected product from cart ✅
  - Other cart items remain unchanged ✅

### Test Results
- JWT authentication working with Cart module ✅
- User → Cart → CartItem → Product relation verified ✅
- Soft delete field (`deletedAt: null`) behavior confirmed for active products ✅

## 2026-07-16 - Orders Module Progress

### Completed

- Reviewed existing Orders module architecture.
- Confirmed existing Orders module structure:
src/modules/orders
- orders.controller.ts
- orders.service.ts
- orders.module.ts

- Confirmed Prisma schema already contains required order infrastructure:
  - Order
  - OrderItem
  - Payment
  - Shipping
  - Address

### Create Order DTO Added

Created:

src/modules/orders/dto/create-order.dto.ts

Changes:

- Removed unsafe usage of `any` for order creation input.
- POST /orders no longer accepts complete order data from frontend.

Frontend cannot control:
- subtotal
- tax
- shipping cost
- total
- product prices
- order items

Backend is responsible for calculating order data.

### Orders Controller Updated

Updated:

src/modules/orders/orders.controller.ts

Changes:

- Added CreateOrderDto.
- Updated POST /orders endpoint.
- Order creation now receives DTO instead of raw object.

### Orders Service Updated

Updated:

src/modules/orders/orders.service.ts

New order creation flow:

User
↓
Find ACTIVE Cart
↓
Validate Cart Items
↓
Read Product Prices From Database
↓
Calculate Subtotal
↓
Create Order
↓
Create OrderItems
↓
Save Product Price Snapshot
↓
Convert Cart Status
ACTIVE → CONVERTED

### Order Pricing Logic

Order price calculation is now backend controlled.

Example:

Current product price:
150$

If product price changes later:
200$

Previous orders keep the original purchase price through OrderItem price snapshot.

### Transaction Safety

Order creation uses:

prisma.$transaction()

Reason:

Order creation and cart conversion must succeed together.

If one operation fails:
- Order creation rolls back.
- Cart status remains unchanged.

### Build Verification

Verified:

npm run build

Result:

- Backend build successful ✅

### Current Status

Completed:
- Orders DTO created ✅
- Orders Controller updated ✅
- Orders Service refactored ✅
- Cart-based order creation implemented ✅
- Transaction handling added ✅
- Backend compilation successful ✅

### Next Steps

1. Fix Swagger/API connection issue if needed.
2. Test POST /api/v1/orders.
3. Verify:
   - Order creation
   - OrderItems creation
   - Cart status change ACTIVE → CONVERTED
4. Continue Payment module implementation.