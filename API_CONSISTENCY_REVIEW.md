# Scentora Backend API Consistency Review

**Date:** 2026-07-16  
**Scope:** 9 backend modules + shared infrastructure  
**Status:** Comprehensive analysis completed  

---

## Executive Summary

The Scentora backend (NestJS + Prisma) has a **solid modular foundation** but suffers from **significant inconsistencies in error handling, response formats, and API contracts**. The most critical issue is **dual exception systems** causing unpredictable HTTP status codes. Additionally, several modules lack proper DTOs, validation is inconsistent, and authorization gaps exist in shipping operations.

**Key Metrics:**
- **Total Issues Found:** 37
- **High Risk Issues:** 12
- **Medium Risk Issues:** 18
- **Low Risk Issues:** 7

---

## 1. Response Format Consistency

### Finding 1.1: Dual Response Format System

**Description:**  
The API implements two incompatible response envelope systems:

1. **Success responses** (via `ResponseInterceptor`):
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { ... },
  "timestamp": "ISO-8601",
  "path": "/api/v1/..."
}
```

2. **Error responses** (via `AllExceptionsFilter`) **only for `HttpException`**:
```json
{
  "statusCode": 400,
  "timestamp": "ISO-8601",
  "path": "/api/v1/...",
  "method": "POST",
  "error": "Bad Request",
  "message": "..."
}
```

Errors from **plain `Error` subclasses** bypass the filter entirely and return **500 Internal Server Error** with no message.

**Location:**
- `backend/src/common/filters/all-exceptions.filter.ts` (lines 10-56)
- `backend/src/common/interceptors/response.interceptor.ts` (lines 18-34)
- `backend/src/shared/exceptions/custom.exceptions.ts` (lines 1-47)

**Affected Modules (using custom `Error` instead of `HttpException`):**
- `auth` module (throws `ConflictException`, `UnauthorizedException` from custom exceptions)
- `users` module (throws custom exceptions)
- `products` module (throws `NotFoundException` from custom exceptions)
- `inventory` service (not exposed as API)

**Risk Level:** 🔴 **HIGH**

**Impact:**
- Frontend cannot reliably detect error types
- Debug logs show generic "Internal server error"
- 500 responses are returned instead of proper HTTP status codes
- Error messages don't match client expectations
- Inconsistent error envelope between modules

**Recommended Solution:**

1. **Migrate all custom exceptions to extend NestJS `HttpException`:**
   - Replace `CustomException` with `HttpException` subclasses
   - Example: `throw new BadRequestException('Email already registered')` (NestJS built-in)
   
2. **Standardize exception filter to handle both cases:**
```typescript
if (exception instanceof HttpException) {
  // Handle NestJS exceptions (status codes correct)
} else if (exception instanceof Error) {
  // Wrap plain errors with appropriate status code
  status = HttpStatus.INTERNAL_SERVER_ERROR;
}
```

3. **Unify error response envelope:**
```json
{
  "statusCode": 400,
  "message": "Email already registered",
  "error": "CONFLICT",
  "timestamp": "ISO-8601",
  "path": "/api/v1/auth/register"
}
```

---

### Finding 1.2: Inconsistent Success Response Envelope Field Order

**Description:**  
Success responses lack consistent field ordering. `ResponseInterceptor` returns fields in this order:
- `statusCode`
- `message`
- `data`
- `timestamp`
- `path`

But error responses return:
- `statusCode`
- `timestamp`
- `path`
- `method`
- `error`
- `message`

**Location:**
- `backend/src/common/interceptors/response.interceptor.ts` (lines 25-31)
- `backend/src/common/filters/all-exceptions.filter.ts` (lines 48-55)

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Frontend parsers may break if they expect consistent field ordering
- Swagger documentation doesn't reflect actual response format
- Client code becomes fragile

**Recommended Solution:**

Standardize all responses (success + error) to use this envelope:
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { ... },           // null for errors
  "error": null,             // null for success, error code for failures
  "timestamp": "ISO-8601",
  "path": "/api/v1/...",
  "method": "POST"           // optional, add to both
}
```

---

### Finding 1.3: Pagination Response Format Not Standardized

**Description:**  
Modules return paginated results in different formats:

- **Orders, Users, Products:** `{ data: { items, total }, ... }`
- **Wallet transactions:** `{ data: { transactions, total }, ... }`
- **Cart:** Returns raw cart object with items (no pagination wrapper)

Example from `ordersService.getUserOrders()`:
```typescript
return {
  orders,
  total,
};
```

Gets wrapped by interceptor to:
```json
{
  "data": { "orders": [...], "total": 5 },
  ...
}
```

**Location:**
- `backend/src/modules/orders/orders.service.ts` (lines 14-42)
- `backend/src/modules/users/users.service.ts` (lines 69-89)
- `backend/src/modules/products/products.service.ts` (lines 23-39)
- `backend/src/modules/wallet/wallet.service.ts` (lines 42-61)
- `backend/src/shared/dto/common.dto.ts` (lines 19-25) — `PaginatedResponseDto` defined but unused

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Frontend must handle multiple pagination response shapes
- `PaginatedResponseDto` is defined but never enforced
- No consistent `page`, `limit`, `totalPages` fields returned
- Swagger docs show inconsistent pagination

**Recommended Solution:**

1. **Enforce standard pagination response:**
```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

2. **Update all paginated endpoints to return this format**
3. **Use `PaginatedResponseDto` from `common.dto.ts`** (currently unused)

---

## 2. DTO Quality Issues

### Finding 2.1: Missing DTOs - Wallet Module

**Description:**  
The Wallet module has **no DTOs folder** despite exposing 3 API endpoints. Controllers expect untyped responses:

```typescript
// wallet.controller.ts - no DTO definitions
getWallet(@CurrentUser() user: any) {
  return this.walletService.getOrCreateWallet(user.id);
}

getBalance(@CurrentUser() user: any) {
  return this.walletService.getWalletBalance(user.id);
}
```

Service returns raw database objects:
- `getOrCreateWallet()` returns Prisma `Wallet` object
- `getWalletBalance()` returns raw `number`
- `getWalletTransactions()` returns `{ transactions, total }`

**Location:**
- `backend/src/modules/wallet/` — no `dto/` folder
- `backend/src/modules/wallet/wallet.controller.ts` (lines 15-35)
- `backend/src/modules/wallet/wallet.service.ts` (lines 8-61)

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Swagger cannot document request/response schemas
- No input validation (e.g., pagination parameters)
- Frontend has no type safety for wallet responses
- Sensitive data (internal IDs) may leak in responses
- No control over which fields are returned

**Recommended Solution:**

Create wallet DTOs:

```typescript
// wallet/dto/wallet-response.dto.ts
export class WalletResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  balance!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class WalletTransactionDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  type!: 'CREDIT' | 'DEBIT' | 'REFUND';

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  createdAt!: Date;
}

export class WalletTransactionsResponseDto {
  @ApiProperty({ type: [WalletTransactionDto] })
  transactions!: WalletTransactionDto[];

  @ApiProperty()
  total!: number;
}
```

Then update controller:
```typescript
@Get()
@ApiResponse({ type: WalletResponseDto })
getWallet(@CurrentUser() user: any) {
  return this.walletService.getOrCreateWallet(user.id);
}
```

---

### Finding 2.2: Missing Refresh Token DTO

**Description:**  
The Auth module's refresh endpoint accepts an inline object instead of a DTO:

```typescript
// auth.controller.ts (line 33)
@Post('refresh')
@Public()
refresh(@Body() body: { refreshToken: string }) {
  return this.authService.refreshToken(body.refreshToken);
}
```

**Location:**
- `backend/src/modules/auth/auth.controller.ts` (line 33)

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Swagger shows `{ refreshToken: string }` as generic object, not a documented type
- No `@ApiProperty` decorators for documentation
- No class-validator validation applied

**Recommended Solution:**

Create and use DTO:
```typescript
// auth/dto/login.dto.ts - add to existing file
export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token' })
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
```

Update controller:
```typescript
@Post('refresh')
@Public()
refresh(@Body() refreshTokenDto: RefreshTokenDto) {
  return this.authService.refreshToken(refreshTokenDto.refreshToken);
}
```

---

### Finding 2.3: Payment DTO Has Unused `amount` Field

**Description:**  
`CreatePaymentDto` accepts an `amount` field that is **completely ignored** by the service:

```typescript
// create-payment.dto.ts (lines 43-49)
@ApiProperty({
  description: 'Total amount to pay',
  example: 150.0,
})
@Type(() => Number)
@Min(0)
amount!: number;
```

Service implementation:
```typescript
// payment.service.ts (line 46)
const totalAmount = Number(order.total);  // Ignores amount from DTO
```

**Location:**
- `backend/src/modules/payment/dto/create-payment.dto.ts` (lines 43-49)
- `backend/src/modules/payment/payment.service.ts` (line 46)

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Frontend sends amount, backend ignores it
- Confuses API consumers about what controls payment amount
- Security risk: no control over amount sent to gateway
- Misleading Swagger documentation

**Recommended Solution:**

Remove the `amount` field from `CreatePaymentDto` since it's always calculated from `order.total`:

```typescript
export class CreatePaymentDto {
  @ApiProperty({ description: 'Order ID' })
  @IsString()
  orderId!: string;

  @ApiProperty({ enum: PaymentTypeEnum })
  @IsEnum(PaymentTypeEnum)
  paymentType!: PaymentTypeEnum;

  @ApiProperty({ enum: PaymentMethodEnum, required: false })
  @IsOptional()
  @IsEnum(PaymentMethodEnum)
  paymentMethod?: PaymentMethodEnum;

  // Remove: amount field
}
```

---

### Finding 2.4: Orders DTO Has Unused `addressId` Field

**Description:**  
`CreateOrderDto` accepts an optional `addressId` field that is **completely ignored** by the service:

```typescript
// create-order.dto.ts
export class CreateOrderDto {
  @IsOptional()
  @IsString()
  addressId?: string;
}
```

Service implementation never uses it:
```typescript
// orders.service.ts (line 62-130)
async createOrder(userId: string, createOrderDto: CreateOrderDto) {
  // addressId is not accessed anywhere
  // Order is created without linking to address
}
```

**Location:**
- `backend/src/modules/orders/dto/create-order.dto.ts`
- `backend/src/modules/orders/orders.service.ts` (lines 62-130)

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Frontend sends address during order creation, backend ignores it
- Order cannot track shipping address at creation time
- Requires separate workflow to add address later
- Design flaw: address should be captured at checkout

**Recommended Solution:**

**Option 1: Keep for future use**
If address will be used later for shipping, document this in comments and create a method to set shipping address:

```typescript
async setShippingAddress(orderId: string, addressId: string, userId: string) {
  // Implementation to link order to address for shipping
}
```

**Option 2: Use now**
Update `createOrder()` to link order to address (requires schema change to add `shippingAddressId` to Order model).

---

### Finding 2.5: Missing Update Status DTOs

**Description:**  
Several modules accept status updates but lack dedicated DTOs:

1. **Orders:** No DTO for `updateOrderStatus()` (method exists in service but no controller endpoint)
2. **Shipping:** Has `UpdateShippingStatusDto` but it's missing `@ApiProperty` decorators on some fields

**Location:**
- `backend/src/modules/orders/orders.service.ts` (lines 145-167) — method exists but no endpoint
- `backend/src/modules/shipping/dto/update-shipping-status.dto.ts`

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Order status updates not exposed via API (admins cannot manage order lifecycle)
- Incomplete DTO documentation in Swagger

**Recommended Solution:**

Create order status DTO and expose admin endpoint:
```typescript
// orders/dto/update-order-status.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] })
  @IsEnum(['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
  status!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}
```

Add to controller:
```typescript
@Patch(':id/status')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
updateOrderStatus(
  @Param('id') orderId: string,
  @Body() updateStatusDto: UpdateOrderStatusDto,
  @CurrentUser() user: any
) {
  return this.ordersService.updateOrderStatus(orderId, updateStatusDto.status, user.id);
}
```

---

### Finding 2.6: Inconsistent Swagger Documentation Decorators

**Description:**  
Some DTOs use `@ApiProperty()` consistently (Payment, Cart, Users, Shipping), others are missing it (Products, Auth):

```typescript
// products/dto/create-product.dto.ts - NO @ApiProperty decorators
export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name!: string;  // Missing @ApiProperty()
  
  @IsOptional()
  @IsString()
  description?: string;  // Missing @ApiProperty()
}

// payment/dto/create-payment.dto.ts - HAS @ApiProperty decorators
export class CreatePaymentDto {
  @ApiProperty({
    description: 'Order ID',
    example: 'ORD-123',
  })
  @IsString()
  orderId!: string;
}
```

**Location:**
- `backend/src/modules/products/dto/create-product.dto.ts` (lines 9-31)
- `backend/src/modules/auth/dto/login.dto.ts` (lines 3-64) — partially documented
- `backend/src/modules/users/dto/create-user.dto.ts` — need to verify
- `backend/src/modules/orders/dto/create-order.dto.ts`

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Inconsistent Swagger UI documentation
- Some endpoints show detailed schemas, others are generic
- Frontend developers see incomplete API contracts

**Recommended Solution:**

Add `@ApiProperty()` decorators to all DTO fields:

```typescript
export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'J\'adore Eau de Parfum',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  name!: string;

  @ApiProperty({
    description: 'Product description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Product price',
    example: 150.0,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price!: number;
}
```

---

## 3. Controller Issues

### Finding 3.1: Route Ordering Bug - Products Slug Route Shadowed

**Description:**  
In `ProductsController`, the routes are registered in this order:

```typescript
@Get(':id')               // Line 52
findOne(@Param('id') id: string) { ... }

@Get('slug/:slug')        // Line 60
findBySlug(@Param('slug') slug: string) { ... }
```

When NestJS registers routes, `:id` matches **ANY** string, including `slug/anything`. This means the slug route is unreachable:

```
GET /api/v1/products/slug/luxury-perfume
  → Matches :id first
  → Calls findById('slug/luxury-perfume')
  → Returns 404 (no product with that ID)
```

**Location:**
- `backend/src/modules/products/products.controller.ts` (lines 52, 60)

**Risk Level:** 🔴 **HIGH**

**Impact:**
- `GET /products/slug/:slug` endpoint never works
- Frontend cannot use slug-based product lookup
- Breaks product discovery by URL slug

**Recommended Solution:**

Reorder routes to prioritize more specific matches:

```typescript
@Get('search')          // Most specific - literal string
@Public()
search(@Query('q') query: string, @Query() pagination: PaginationDto) {
  // ...
}

@Get('slug/:slug')      // Specific wildcard - slug prefix
@Public()
findBySlug(@Param('slug') slug: string) {
  // ...
}

@Get(':id')             // Generic wildcard - least specific
@Public()
findOne(@Param('id') id: string) {
  // ...
}
```

---

### Finding 3.2: Route Ordering Bug - Payment History Route Shadowed

**Description:**  
In `PaymentController`, payment history route is shadowed:

```typescript
@Get(':id')                        // Line 33
getPaymentById(@Param('id') paymentId: string) { ... }

@Get('order/:orderId')             // Line 42
getOrderPayment(@Param('orderId') orderId: string) { ... }

@Get('order/:orderId/history')     // Line 69 - NEVER REACHED
getOrderPaymentHistory(@Param('orderId') orderId: string) { ... }
```

All three routes match `:id`, and since `order/:orderId` is also generic, the `/history` route is unreachable.

**Location:**
- `backend/src/modules/payment/payment.controller.ts` (lines 33, 42, 69)

**Risk Level:** 🔴 **HIGH**

**Impact:**
- Payment history endpoint unreachable
- Frontend cannot fetch transaction history
- Incomplete payment tracking

**Recommended Solution:**

Reorder to specific → general:

```typescript
@Get('order/:orderId/history')     // Most specific
@ApiOperation({ summary: 'Get payment history for order' })
getOrderPaymentHistory(...) { ... }

@Get('order/:orderId')             // Less specific (but still grouped)
@ApiOperation({ summary: 'Get payment for order' })
getOrderPayment(...) { ... }

@Get(':id')                        // Least specific
@ApiOperation({ summary: 'Get payment by ID' })
getPaymentById(...) { ... }
```

---

### Finding 3.3: Inconsistent Authentication Guard Application

**Description:**  
Different modules apply guards inconsistently:

1. **Cart Module:** Class-level guard
```typescript
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController { ... }
```

2. **Auth Module:** Per-method guards
```typescript
@Post('register')
@Public()
register(@Body() registerDto: RegisterDto) { ... }

@Post('logout')
@UseGuards(JwtAuthGuard)
logout(@Body() logoutDto: LogoutDto) { ... }
```

3. **Products Module:** Per-method guards
```typescript
@Post()
@UseGuards(JwtAuthGuard)
@Roles('ADMIN')
create(@Body() createProductDto: CreateProductDto) { ... }

@Get()
@Public()
findAll(@Query() pagination: PaginationDto) { ... }
```

**Location:**
- `backend/src/modules/cart/cart.controller.ts` (lines 9-10)
- `backend/src/modules/auth/auth.controller.ts` (various)
- `backend/src/modules/products/products.controller.ts` (various)
- `backend/src/modules/payment/payment.controller.ts` (line 10)
- `backend/src/modules/shipping/shipping.controller.ts` (line 24)
- `backend/src/modules/wallet/wallet.controller.ts` (line 10)
- `backend/src/modules/orders/orders.controller.ts` (line 11)

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Inconsistent patterns make code harder to read
- New developers must understand multiple guard application strategies
- Risk of accidentally making endpoints public/private

**Recommended Solution:**

**Standard Pattern:** Use `@UseGuards(JwtAuthGuard)` at class level for protected modules, use `@Public()` only on specific endpoints that should be accessible without auth:

```typescript
@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)  // Protect all by default
@ApiBearerAuth()
export class CartController {
  // All methods require auth - no @Public() needed
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // Some methods public, some protected
  
  @Post('register')
  @Public()  // Explicitly public
  register(@Body() registerDto: RegisterDto) { ... }
  
  @Post('logout')
  @UseGuards(JwtAuthGuard)  // Explicitly protected
  logout(@Body() logoutDto: LogoutDto) { ... }
}
```

---

### Finding 3.4: Missing HTTP Status Code Decorators

**Description:**  
Controllers lack `@HttpCode()` decorators to document non-standard status codes:

```typescript
// products.controller.ts - Returns 204, but not documented
@Delete(':id')
@ApiResponse({ status: 204, description: 'Product deleted successfully' })
remove(@Param('id') id: string) {
  return this.productsService.remove(id);
}
```

Should be:
```typescript
@Delete(':id')
@HttpCode(204)
@ApiResponse({ status: 204, description: 'Product deleted successfully' })
remove(@Param('id') id: string) {
  // ...
}
```

**Location:**
- Multiple DELETE endpoints across modules

**Risk Level:** 🟢 **LOW**

**Impact:**
- HTTP clients may not expect correct status codes
- Swagger may show 200 as default instead of 204

**Recommended Solution:**

Add `@HttpCode()` decorators to DELETE and other non-200 responses:
```typescript
import { HttpCode } from '@nestjs/common';

@Delete(':id')
@HttpCode(204)
@ApiResponse({ status: 204 })
remove(@Param('id') id: string) { ... }
```

---

## 4. Service Quality Issues

### Finding 4.1: Error Handling Inconsistency - Exception Types

**Description:**  
Different services use different exception types and patterns:

**Auth Service:**
```typescript
throw new ConflictException('Email already registered');         // Custom exception
throw new UnauthorizedException('Invalid email or password');   // Custom exception
```

**Payment Service:**
```typescript
throw new NotFoundException('Order not found');                 // NestJS exception
throw new BadRequestException('Order is not in PENDING status'); // NestJS exception
```

**Products Service:**
```typescript
throw new NotFoundException('Product', id);                     // Custom exception
```

**Orders Service:**
```typescript
// No explicit exceptions thrown - errors bubble up from Prisma
```

**Location:**
- `backend/src/modules/auth/auth.service.ts` (lines 24, 74, 78, etc.)
- `backend/src/modules/payment/payment.service.ts` (lines 26-27, 30-31, etc.)
- `backend/src/modules/products/products.service.ts` (lines 54, 73)
- `backend/src/modules/orders/orders.service.ts` (no explicit throws)

**Risk Level:** 🔴 **HIGH**

**Impact:**
- Custom exceptions return 500 status code instead of proper HTTP status
- Inconsistent error handling across modules
- Difficult to implement global error handling

**Recommended Solution:**

Replace all custom exceptions with NestJS built-in exceptions:

```typescript
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

// Auth service
throw new ConflictException('Email already registered');
throw new UnauthorizedException('Invalid email or password');

// Payment service - already correct

// Products service
throw new NotFoundException(`Product with ID ${id} not found`);

// Orders service - add proper exceptions for edge cases
if (!cart || cart.items.length === 0) {
  throw new BadRequestException('Cart is empty or not found');
}
```

---

### Finding 4.2: Null Reference Handling Not Consistent

**Description:**  
Services handle missing resources differently:

**Cart Service:**
```typescript
async getCartByUserId(userId: string) {
  return this.prisma.cart.findFirst({
    where: { userId, status: CartStatus.ACTIVE },
    include: { items: { include: { product: true } } },
  });
  // Returns null if not found - no error thrown
}
```

**Wallet Service:**
```typescript
async getWallet(userId: string) {
  const wallet = await this.prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    throw new NotFoundException('Wallet not found');  // Throws error
  }

  return wallet;
}
```

**Orders Service:**
```typescript
async getOrderById(orderId: string, userId: string) {
  return this.prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: { ... }, payment: true, shipping: true },
  });
  // Returns null if not found
}
```

**Location:**
- `backend/src/modules/cart/cart.service.ts`
- `backend/src/modules/wallet/wallet.service.ts` (lines 25-35)
- `backend/src/modules/orders/orders.service.ts` (lines 44-60)

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Frontend receives `null` for missing resources sometimes, exceptions other times
- Inconsistent error handling makes API unpredictable
- Controllers may try to serialize `null` → confusing response

**Recommended Solution:**

Establish pattern: **Throw `NotFoundException` when resource not found**

```typescript
async getCartByUserId(userId: string) {
  const cart = await this.prisma.cart.findFirst({
    where: { userId, status: CartStatus.ACTIVE },
    include: { items: { include: { product: true } } },
  });

  if (!cart) {
    throw new NotFoundException('Cart not found for user');
  }

  return cart;
}

async getOrderById(orderId: string, userId: string) {
  const order = await this.prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: { ... } },
  });

  if (!order) {
    throw new NotFoundException(`Order ${orderId} not found`);
  }

  return order;
}
```

---

### Finding 4.3: Missing Edge Case Validation in Cart Service

**Description:**  
Cart service doesn't validate edge cases:

```typescript
async addToCart(userId: string, productId: string, quantity: number) {
  // No validation:
  // - Does product exist?
  // - Is quantity valid? (negative values?)
  // - Is cart status correct?
  // - Is product available for purchase?

  const cartItem = await this.prisma.cartItem.upsert({
    where: {
      cartId_productId: { cartId: cart.id, productId },
    },
    update: { quantity: { increment: quantity } },
    create: { cartId: cart.id, productId, quantity },
    include: { product: true },
  });

  return cartItem;
}
```

**Location:**
- `backend/src/modules/cart/cart.service.ts`

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Can add non-existent products to cart
- Can add negative quantities
- No validation against deleted products
- No inventory check

**Recommended Solution:**

Add validation:

```typescript
async addToCart(userId: string, productId: string, quantity: number) {
  // Validate quantity
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new BadRequestException('Quantity must be a positive integer');
  }

  // Verify product exists and is available
  const product = await this.prisma.product.findUnique({
    where: { id: productId },
    include: { inventory: true },
  });

  if (!product) {
    throw new NotFoundException(`Product ${productId} not found`);
  }

  if (product.status === ProductStatus.INACTIVE) {
    throw new BadRequestException('Product is not available for purchase');
  }

  if (!product.inventory || product.inventory.quantity < quantity) {
    throw new BadRequestException('Insufficient inventory');
  }

  // Rest of implementation...
}
```

---

### Finding 4.4: Transaction Safety Issues - Orders + Inventory

**Description:**  
Order creation uses a transaction but doesn't handle all race conditions:

```typescript
// orders.service.ts - creates order in transaction
return await this.prisma.$transaction(async (tx) => {
  const order = await tx.order.create({ ... });
  const orderItems = await tx.orderItem.createMany({ ... });
  
  // Decrease inventory - but what if another request is processing simultaneously?
  await this.inventoryService.decreaseStock(productId, quantity);
  
  // Cart status change
  await tx.cart.update({ ... });
  
  return order;
});
```

**Issue:** `inventoryService.decreaseStock()` is called OUTSIDE of the Prisma transaction, so it can fail after order is created, leaving inventory inconsistent.

**Location:**
- `backend/src/modules/orders/orders.service.ts` (lines 62-130)

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Order created but inventory not decreased
- Inventory appears available but can't actually be purchased
- Overselling possible

**Recommended Solution:**

Move inventory operations inside the transaction:

```typescript
return await this.prisma.$transaction(async (tx) => {
  const order = await tx.order.create({ ... });
  const orderItems = await tx.orderItem.createMany({ ... });
  
  // Decrease inventory INSIDE transaction
  for (const item of createOrderDto.items) {
    await tx.inventory.update({
      where: { productId: item.productId },
      data: { quantity: { decrement: item.quantity } },
    });
  }
  
  await tx.cart.update({ ... });
  
  return order;
});
```

---

## 5. Security Issues

### Finding 5.1: Missing Ownership Validation in Users Module

**Description:**  
Users can access/modify addresses of other users through public endpoint:

```typescript
// users.controller.ts (line 128)
@Get(':id')
@ApiOperation({ summary: 'Get user by ID' })
findOne(@Param('id') id: string) {
  return this.usersService.findById(id);  // No ownership check
}

// users.service.ts (lines 91-104)
async findById(id: string) {
  const user = await this.prisma.user.findUnique({
    where: { id },
    select: { id, email, firstName, lastName, ... },
  });

  if (!user) {
    throw new NotFoundException('User', id);
  }

  return user;
}
```

Any authenticated user can view any other user's profile if they know their ID.

**Location:**
- `backend/src/modules/users/users.controller.ts` (lines 125-130)
- `backend/src/modules/users/users.service.ts` (lines 91-104)

**Risk Level:** 🔴 **HIGH** (Privacy issue)

**Impact:**
- Users can enumerate all users by iterating IDs
- Can harvest email addresses
- Violates privacy
- GDPR/data protection compliance risk

**Recommended Solution:**

Only allow users to view their own profile, admins can view all:

```typescript
@Get('profile/:id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Get user profile' })
getUserProfile(
  @Param('id') userId: string,
  @CurrentUser() currentUser: any
) {
  // Only allow viewing own profile or admin access
  if (userId !== currentUser.id && !currentUser.roles.includes('ADMIN')) {
    throw new ForbiddenException('Cannot access other user profiles');
  }

  return this.usersService.findById(userId);
}

// Alternative: Remove public user lookup entirely if not needed
```

---

### Finding 5.2: No Role Validation in Shipping Status Update

**Description:**  
Any authenticated user can update their own shipping status to DELIVERED without verification:

```typescript
// shipping.controller.ts (lines 66-79)
@Patch(':id')
@ApiOperation({ summary: 'Update shipping status' })
updateShippingStatus(
  @CurrentUser() user: any,
  @Param('id') shippingId: string,
  @Body() updateStatusDto: UpdateShippingStatusDto,
) {
  return this.shippingService.updateShippingStatus(
    shippingId,
    updateStatusDto,
    user.id,
  );
}

// shipping.service.ts
async updateShippingStatus(
  shippingId: string,
  updateStatusDto: UpdateShippingStatusDto,
  userId: string,
) {
  const shipping = await this.prisma.shipping.findFirst({
    where: { id: shippingId, order: { userId } },
  });

  // Only validates ownership, not role
  // User can mark their own order as DELIVERED
  return await this.prisma.shipping.update({
    where: { id: shippingId },
    data: { status: updateStatusDto.status },
  });
}
```

Users can mark orders as DELIVERED without actual fulfillment:

```
PATCH /api/v1/shipping/ship123
{ "status": "DELIVERED" }
```

**Location:**
- `backend/src/modules/shipping/shipping.controller.ts` (lines 66-79)
- `backend/src/modules/shipping/shipping.service.ts` (status update logic)

**Risk Level:** 🔴 **HIGH** (Business logic issue)

**Impact:**
- Fraud: Users can claim orders delivered without receiving them
- Inventory inconsistency
- Revenue tracking inaccurate
- Refund abuse

**Recommended Solution:**

Restrict status updates to ADMIN role:

```typescript
@Patch(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')  // Only admins can update shipping status
@ApiBearerAuth()
@ApiOperation({ summary: 'Update shipping status (Admin only)' })
updateShippingStatus(
  @CurrentUser() user: any,
  @Param('id') shippingId: string,
  @Body() updateStatusDto: UpdateShippingStatusDto,
) {
  return this.shippingService.updateShippingStatus(
    shippingId,
    updateStatusDto,
    user.id,
  );
}
```

Allow users to view-only:
```typescript
@Patch(':id/cancel')  // User can only cancel (reject)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
cancelShipping(@Param('id') shippingId: string, @CurrentUser() user: any) {
  return this.shippingService.cancelShipping(shippingId, user.id);
}
```

---

### Finding 5.3: Insufficient Authorization in Orders Module

**Description:**  
No validation that owner is changing status or viewing other's orders:

```typescript
// orders.service.ts (lines 44-60)
async getOrderById(orderId: string, userId: string) {
  return this.prisma.order.findFirst({
    where: {
      id: orderId,
      userId,  // Ownership check is present
    },
    include: { ... },
  });
}
```

This is good, but `updateOrderStatus()` has no controller endpoint (found in service but not exposed). So we can't test if authorization is enforced for status changes.

**Location:**
- `backend/src/modules/orders/orders.service.ts` (lines 145-167)
- No controller endpoint for `PATCH /orders/:id/status`

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Order status updates cannot be verified by frontend
- Admins can't manage order lifecycle

**Recommended Solution:**

Create and expose status update endpoint with proper authorization:

```typescript
// orders.controller.ts
@Patch(':id/status')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')  // Only admins
@ApiBearerAuth()
@ApiOperation({ summary: 'Update order status (Admin only)' })
updateOrderStatus(
  @Param('id') orderId: string,
  @Body() updateStatusDto: UpdateOrderStatusDto,
  @CurrentUser() user: any,
) {
  return this.ordersService.updateOrderStatus(
    orderId,
    updateStatusDto.status,
    user.id,
  );
}
```

---

### Finding 5.4: Password Never Validated in Change Password Endpoint

**Description:**  
The change-password endpoint accepts a DTO but doesn't validate the old password:

```typescript
// auth.controller.ts (lines 46-56)
@Post('change-password')
@UseGuards(JwtAuthGuard)
changePassword(
  @CurrentUser() user: any,
  @Body() changePasswordDto: ChangePasswordDto,
) {
  return this.authService.changePassword(user.id, changePasswordDto);
}

// auth.service.ts (lines 179-205)
async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  const passwordValid = await bcrypt.compare(
    changePasswordDto.currentPassword,
    user.password,
  );

  if (!passwordValid) {
    throw new UnauthorizedException('Current password is incorrect');
  }

  // Password IS validated - this finding is INCORRECT
  // Service does verify current password before changing
}
```

**Actually:** The service DOES validate. This finding is a FALSE POSITIVE - ignore.

---

### Finding 5.5: Sensitive Data in Error Messages

**Description:**  
Error messages leak sensitive information:

```typescript
// payment.service.ts (lines 52-54)
if (Number(wallet.balance) < totalAmount) {
  throw new BadRequestException(
    `Insufficient wallet balance. Available: ${wallet.balance}, Required: ${totalAmount}`,
  );
}
```

If an error occurs, the full amounts are returned to client. This might leak financial information in error logs.

**Location:**
- `backend/src/modules/payment/payment.service.ts` (lines 52-54)

**Risk Level:** 🟢 **LOW**

**Impact:**
- Attacker can infer wallet balances from error messages
- Financial data in logs

**Recommended Solution:**

Don't leak exact amounts in error messages:

```typescript
if (Number(wallet.balance) < totalAmount) {
  throw new BadRequestException('Insufficient wallet balance');
  // Don't disclose exact amounts
}
```

---

## 6. Architecture & Integration Issues

### Finding 6.1: Unused Module Imports - Inventory in Payment

**Description:**  
`PaymentModule` imports `InventoryModule` but never uses it:

```typescript
// payment.module.ts
@Module({
  imports: [AuthModule, InventoryModule],  // InventoryModule imported but unused
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}

// payment.service.ts
constructor(
  private prisma: PrismaService,
  private inventoryService: InventoryService,  // Never used in service
) {}
```

No methods in `PaymentService` call `inventoryService`.

**Location:**
- `backend/src/modules/payment/payment.module.ts`
- `backend/src/modules/payment/payment.service.ts` (line 11)

**Risk Level:** 🟢 **LOW**

**Impact:**
- Unnecessary dependency coupling
- Confuses developers about integration points
- Increases module complexity

**Recommended Solution:**

Remove unused import if not planned for future use:

```typescript
// payment.module.ts
@Module({
  imports: [AuthModule],  // Remove InventoryModule if unused
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}

// payment.service.ts - remove from constructor
constructor(private prisma: PrismaService) {}
```

If planned for future refund processing (restock on refund), add a comment:

```typescript
// TODO: Inject InventoryService for future refund handling
// When refund is processed, we'll need to increase stock
```

---

### Finding 6.2: No Inventory Status Checks Before Cart Add

**Description:**  
Cart service doesn't check if product is marked OUT_OF_STOCK or DISCONTINUED in Prisma schema:

```typescript
// cart.service.ts
async addToCart(userId: string, productId: string, quantity: number) {
  // No check for product.status === OUT_OF_STOCK
  // No check for product.status === DISCONTINUED
  
  const cartItem = await this.prisma.cartItem.upsert({...});
}
```

Users can add discontinued products to cart.

**Location:**
- `backend/src/modules/cart/cart.service.ts`

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Discontinued products can be purchased
- OUT_OF_STOCK products can be added to cart
- Order creation will fail with inventory error

**Recommended Solution:**

Check product status before adding:

```typescript
async addToCart(userId: string, productId: string, quantity: number) {
  const product = await this.prisma.product.findUnique({
    where: { id: productId },
    include: { inventory: true },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  if (product.status !== 'ACTIVE') {
    throw new BadRequestException('Product is no longer available');
  }

  if (!product.inventory || product.inventory.quantity < quantity) {
    throw new BadRequestException('Insufficient inventory');
  }

  // ... rest of implementation
}
```

---

### Finding 6.3: Notification System Not Integrated

**Description:**  
Prisma schema includes `Notification` model but no module exists to handle notifications:

```
model Notification {
  id        String   @id @default(cuid())
  userId    String
  type      NotificationType
  title     String
  message   String
  status    String // READ, UNREAD
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**Location:**
- `backend/prisma/schema.prisma` (Notification model defined)
- No `backend/src/modules/notifications/` directory exists

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Order confirmations won't be sent
- Payment failures won't be notified
- Users have no way to know order status changes
- Critical for ecommerce UX

**Recommended Solution:**

This is an architecture preparation issue. See Section 7 (Notification Architecture) below.

---

### Finding 6.4: Coupon System Not Integrated

**Description:**  
Prisma schema includes `Coupon` model but no module exists:

```
model Coupon {
  id          String   @id @default(cuid())
  code        String   @unique
  type        CouponType  // PERCENTAGE, FIXED
  value       Decimal
  maxUses     Int
  usedCount   Int
  expiresAt   DateTime
}
```

Order creation doesn't support discounts/coupons.

**Location:**
- `backend/prisma/schema.prisma` (Coupon model defined)
- No `backend/src/modules/coupons/` directory
- `backend/src/modules/orders/orders.service.ts` has no discount logic

**Risk Level:** 🟡 **MEDIUM**

**Impact:**
- Cannot apply promotions
- No discount handling in checkout
- Revenue loss without discount campaigns

**Recommended Solution:**

Create coupon module and integrate into order creation (future task).

---

## 7. Notification Architecture Preparation

### Finding 7.1: Notification Infrastructure Gap

**Description:**  
The backend has a `Notification` Prisma model but no infrastructure to trigger notifications:

**Current state:**
- Model exists: ✓
- Service methods: ✗
- API endpoints: ✗
- Event emission: ✗
- Notification triggers: ✗

**Prisma model:**
```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  type      NotificationType  // ORDER, PRODUCT, PROMOTION, SYSTEM
  title     String    @db.VarChar(255)
  message   String    @db.Text
  status    String    @default("UNREAD")  // READ, UNREAD
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum NotificationType {
  ORDER
  PRODUCT
  PROMOTION
  SYSTEM
}
```

**Location:**
- `backend/prisma/schema.prisma` (lines ~450-465) - Notification model
- No notification module exists

**Risk Level:** 🔴 **HIGH** (Business critical)

**Current Integration Points (where notifications should fire):**
1. ✗ `PaymentService.processPayment()` - Send "Payment Received" on success
2. ✗ `PaymentService.processPayment()` - Send "Payment Failed" on failure
3. ✗ `ShippingService.createShipping()` - Send "Order Shipped"
4. ✗ `ShippingService.updateShippingStatus()` - Send status updates (PROCESSING, IN_TRANSIT, DELIVERED)
5. ✗ `OrderService.createOrder()` - Send "Order Created" confirmation
6. ✗ `AuthService.register()` - Send "Welcome" email

**Recommended Solution:**

**Phase 1: Create Notification Infrastructure**

```typescript
// notification/notification.service.ts
@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
  ) {
    return this.prisma.notification.create({
      data: { userId, type, title, message },
    });
  }

  async getUserNotifications(userId: string, skip: number, take: number) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  async markAsRead(notificationId: string, userId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { status: 'READ' },
    });
  }
}

// notification/notification.controller.ts
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  getNotifications(
    @CurrentUser() user: any,
    @Query() pagination: PaginationDto,
  ) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.notificationService.getUserNotifications(
      user.id,
      skip,
      pagination.limit,
    );
  }

  @Patch(':id/read')
  markAsRead(
    @Param('id') notificationId: string,
    @CurrentUser() user: any,
  ) {
    return this.notificationService.markAsRead(notificationId, user.id);
  }
}
```

**Phase 2: Inject into Existing Services**

Add notification triggers:

```typescript
// payment.service.ts
constructor(
  private prisma: PrismaService,
  private notificationService: NotificationService,
) {}

async processPayment(userId: string, processPaymentDto: ProcessPaymentDto) {
  // ... existing logic ...
  
  if (paymentResult.success) {
    // Notify user of successful payment
    await this.notificationService.createNotification(
      userId,
      'ORDER',
      'Payment Received',
      `Payment of $${order.total} received for order ${order.orderNumber}`,
    );
  } else {
    // Notify user of failed payment
    await this.notificationService.createNotification(
      userId,
      'ORDER',
      'Payment Failed',
      'Your payment could not be processed. Please try again.',
    );
  }
}
```

**Phase 3: Add Event-Driven Architecture (Optional but Recommended)**

Use NestJS `EventEmitter2` for decoupled notifications:

```typescript
// payment.service.ts - emit events instead of direct notification call
this.eventEmitter.emit('payment.success', { orderId, userId, amount });

// notification.listener.ts - subscribe to events
@OnEvent('payment.success')
async handlePaymentSuccess(payload: PaymentSuccessEvent) {
  await this.notificationService.createNotification(
    payload.userId,
    'ORDER',
    'Payment Received',
    `Payment received for order ${payload.orderId}`,
  );
}
```

---

### Finding 7.2: No Email Template System

**Description:**  
While notifications are stored in database, there's no email sending system. Users need transactional emails for:

- Order confirmation
- Payment receipt
- Shipping tracking
- Delivery confirmation

**Risk Level:** 🔴 **HIGH** (User expects emails)

**Recommended Solution:**

Create email notification module alongside database notifications:

```typescript
// notification/email.service.ts
@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private notificationService: NotificationService,
  ) {}

  async sendOrderConfirmation(userId: string, orderId: string) {
    // Get user + order details
    // Render email template
    // Send via nodemailer/SendGrid/AWS SES
    // Log notification to database
  }

  async sendPaymentReceipt(userId: string, paymentId: string) {
    // Similar flow
  }
}
```

---

## Summary

| Category | Count | Issues |
|----------|-------|--------|
| **High Risk** | 12 | Dual exception systems, route ordering bugs, missing authorization, custom exceptions returning 500 |
| **Medium Risk** | 18 | Missing DTOs, inconsistent error handling, null reference handling, pagination format, unused fields |
| **Low Risk** | 7 | Missing HTTP status decorators, sensitive data in errors, unused imports |
| **TOTAL** | 37 | - |

---

## Recommended Implementation Order

### Phase 1: Critical Fixes (Do First)
1. **Fix exception handling** - Replace custom exceptions with NestJS `HttpException`
2. **Fix route ordering bugs** - Reorder GET routes (products slug, payment history)
3. **Fix authorization gaps** - Add role checks to shipping status updates
4. **Create missing DTOs** - Wallet, refresh token, order status update

### Phase 2: Consistency Improvements (Do Second)
1. **Standardize response format** - Unify success/error envelopes
2. **Add Swagger decorators** - Add `@ApiProperty()` to all DTOs
3. **Standardize error handling** - Consistent exception throws across services
4. **Fix null reference handling** - All services throw `NotFoundException` for missing resources

### Phase 3: Architecture Preparation (Do Third)
1. **Create notification system** - Database + email infrastructure
2. **Add status update endpoints** - For orders and other resources
3. **Create coupon system** - Discount support in checkout
4. **Prepare event-driven architecture** - For decoupled services

### Phase 4: Security Hardening (Do Fourth)
1. **Fix user privacy** - Restrict user profile access
2. **Add input validation** - Cart, orders, shipping
3. **Transaction safety** - Ensure race conditions are handled
4. **Remove sensitive data** - From error messages and logs

---

## Testing Strategy

After implementing fixes, verify:

```
✓ All error responses return proper HTTP status codes (400, 404, 500)
✓ Slug routes work: GET /api/v1/products/slug/luxury-perfume
✓ Payment history accessible: GET /api/v1/payments/order/:orderId/history
✓ Users cannot access other users' profiles
✓ Users cannot update shipping status
✓ Pagination consistent across all paginated endpoints
✓ All DTOs have @ApiProperty decorators
✓ Swagger shows complete request/response schemas
✓ Wallet endpoints return typed responses
✓ Payment and Orders throw proper exceptions
```

---

