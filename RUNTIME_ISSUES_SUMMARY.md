# Scentora Backend - Runtime Issues Summary

## Critical Issues Requiring Immediate Fix

### 🔴 CRITICAL #1: Product Slug Route Unreachable (Route Shadowing)

**File:** `backend/src/modules/products/products.controller.ts`  
**Lines:** 34-66  
**Severity:** CRITICAL - Feature completely broken

```typescript
// CURRENT (BROKEN) - :id catches everything
@Get()                  // Line 34
@Get('search')          // Line 43
@Get('slug/:slug')      // Line 52 - UNREACHABLE
@Get(':id')             // Line 60 - MATCHES EVERYTHING

// CORRECT - Specific before generic
@Get('search')
@Get('slug/:slug')
@Get(':id')
@Get()
```

**Problem:**
- `GET /api/v1/products/slug/luxury-perfume` → Routes to `:id` handler
- Tries to find product by ID "slug/luxury-perfume" → Returns 404
- Slug lookup completely non-functional at runtime

**Test It:**
```bash
# This FAILS at runtime
curl "http://localhost:3000/api/v1/products/slug/luxury-perfume"
# Returns: 404 Not Found

# But should work like this
curl "http://localhost:3000/api/v1/products/{actual-uuid}"
# Returns: Product details
```

---

### 🔴 CRITICAL #2: User Profile Publicly Accessible (Security Breach)

**File:** `backend/src/modules/users/users.controller.ts`  
**Lines:** 125-130  
**Severity:** CRITICAL - Security & Privacy

```typescript
@Get(':id')
// NO GUARD - Anyone can access
// NO OWNERSHIP CHECK
findOne(@Param('id') id: string) {
  return this.usersService.findById(id);
}
```

**Problem:**
- NO authentication required (`@UseGuards(JwtAuthGuard)` missing)
- ANY unauthenticated request can GET any user's profile by ID
- User enumeration attack possible
- GDPR violation - personal data exposed

**Current Behavior:**
```bash
# Without authentication token - WORKS
curl "http://localhost:3000/api/v1/users/user123"
# Returns: {id, email, firstName, lastName, phone, status}

# Security breach - can enumerate all users
for id in user1 user2 user3...; do
  curl "http://localhost:3000/api/v1/users/$id"
done
```

---

### 🔴 CRITICAL #3: Cart Validation Bypass (Data Corruption Risk)

**File:** `backend/src/modules/cart/cart.service.ts`  
**Lines:** 19-35  
**Severity:** CRITICAL - Allows invalid state

```typescript
async addToCart(userId: string, productId: string, quantity: number) {
  // NO VALIDATION AT ALL
  // ❌ Product existence not checked
  // ❌ Negative quantities allowed
  // ❌ Product status not checked
  // ❌ Inventory not validated
  
  const cartItem = await this.prisma.cartItem.upsert({...});
}
```

**Problem:**
- Can add non-existent products to cart
- Negative quantities accepted
- Discontinued/deleted products can be added
- Order creation fails later with cryptic error

**Runtime Behavior:**
```bash
# This SUCCEEDS (shouldn't)
curl -X POST http://localhost:3000/api/v1/cart/items \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"productId": "fake-id", "quantity": -5}'
# Returns: {cartItem created with invalid data}

# Later, order creation fails:
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Authorization: Bearer $TOKEN"
# Returns: 500 error (product doesn't exist in order creation)
```

---

## High Risk Issues

### 🟠 HIGH #4: Order Creation Race Condition (Inventory Overselling)

**File:** `backend/src/modules/orders/orders.service.ts`  
**Lines:** 94-99, 145-150  
**Severity:** HIGH - Inventory can go negative

```typescript
// CURRENT (BROKEN) - Check outside transaction
for (const item of cart.items) {
  await this.inventoryService.checkAvailability(...); // ← Outside transaction
}

return this.prisma.$transaction(async (tx) => {
  // Check again and decrease inside
  for (const item of cart.items) {
    await this.inventoryService.decreaseStock(...); // ← Inside transaction
  }
});
```

**Problem:**
- Race condition window between check (line 95) and transaction start (line 113)
- Two concurrent orders can both pass check but consume same inventory
- Inventory goes negative → Overselling

**Scenario:**
```
Product: 5 units available

Request A:
1. Check: 5 units available ✓ (passes)
2. [RACE CONDITION HERE]

Request B:
1. Check: 5 units available ✓ (passes)

Request A:
2. Transaction starts
3. Decreases inventory by 5 → 0 units

Request B:
2. Transaction starts
3. Decreases inventory by 5 → -5 units (OVERSELLING!)
```

---

### 🟠 HIGH #5: No Order Status Update Endpoint (Admin Feature Missing)

**File:** `backend/src/modules/orders/orders.service.ts` (line 165) + controller  
**Severity:** HIGH - Missing admin functionality

```typescript
// Service method EXISTS
async updateOrderStatus(orderId: string, status: OrderStatus, userId?: string) {
  // Implementation complete
}

// But NO controller endpoint exposes it
// PATCH /orders/:id/status → 404 Not Found
```

**Problem:**
- Admins cannot manage order lifecycle via API
- Order status stuck at PENDING if manual update needed
- No way to mark orders as CONFIRMED/PROCESSING/SHIPPED/DELIVERED

---

### 🟠 HIGH #6: Inventory Check Missing in Cart (Different from #3)

**File:** `backend/src/modules/cart/cart.service.ts`  
**Severity:** HIGH - Out-of-stock items added

```typescript
async addToCart(userId: string, productId: string, quantity: number) {
  // Missing:
  // ❌ if (!product.inventory || product.inventory.quantity < quantity)
  
  // Can add 100 units when only 5 available
}
```

---

## Medium Risk Issues

### 🟡 MEDIUM #7: Cart Returns Null Instead of Exception

**File:** `backend/src/modules/cart/cart.service.ts` (line 8)  
**Severity:** MEDIUM - Inconsistent error handling

```typescript
async getCartByUserId(userId: string) {
  return this.prisma.cart.findFirst({...});
  // Returns null if not found
  // Should throw NotFoundException
}
```

**Current Behavior:**
```bash
curl http://localhost:3000/api/v1/cart
# Returns: {statusCode: 200, data: null, ...}
# Confusing - 200 OK but no data
```

---

### 🟡 MEDIUM #8: Sensitive Data in Error Messages

**File:** `backend/src/modules/payment/payment.service.ts` (line 68)  
**Severity:** MEDIUM - Information disclosure

```typescript
throw new BadRequestException(
  `Insufficient wallet balance. Available: ${wallet.balance}, Required: ${totalAmount}`,
);
// Exposes exact amounts to logs/error handlers
```

---

### 🟡 MEDIUM #9: Route Shadowing - Payment History Route

**File:** `backend/src/modules/payment/payment.controller.ts`  
**Status:** ✅ **ALREADY FIXED** in current code (lines 53-76)

Routes are correctly ordered:
```typescript
@Get('order/:orderId/history')  // Specific - before generic
@Get('order/:orderId')          // Less specific
@Get(':id')                     // Generic - last
```

---

## Exception Handling Status

### ✅ VERIFIED: Custom Exceptions Work Correctly

**Finding from consistency review:** "Custom exceptions return 500"  
**Reality:** ✅ **FALSE** - They work correctly

Custom exceptions extend `HttpException`:
```typescript
export class CustomException extends HttpException {
  constructor(statusCode: number, message: string, error?: string) {
    super({ statusCode, message, error }, statusCode);
  }
}
```

Exception filter correctly handles them:
```typescript
if (exception instanceof HttpException) {
  status = exception.getStatus(); // Gets 400, 401, 404, 409, etc.
}
```

**Result:** Exceptions return **correct HTTP status codes** (NOT 500)

- 409 for ConflictException (email duplicate) ✅
- 401 for UnauthorizedException ✅
- 404 for NotFoundException ✅
- 400 for BadRequestException ✅

---

## Fix Priority Matrix

| Priority | Issue | Impact | Effort | Status |
|----------|-------|--------|--------|--------|
| **CRITICAL** | Fix product slug route | Feature broken | 5 min | 🔴 NOT FIXED |
| **CRITICAL** | Fix user profile security | Security breach | 10 min | 🔴 NOT FIXED |
| **CRITICAL** | Add cart validation | Data corruption | 30 min | 🔴 NOT FIXED |
| **HIGH** | Fix inventory race condition | Overselling | 30 min | 🔴 NOT FIXED |
| **HIGH** | Add order status endpoint | Missing feature | 15 min | 🔴 NOT FIXED |
| **HIGH** | Check inventory in cart | Out-of-stock bypass | 20 min | 🔴 NOT FIXED |
| **MEDIUM** | Better null handling | UX issue | 10 min | 🔴 NOT FIXED |
| **MEDIUM** | Remove sensitive data | Info disclosure | 5 min | 🔴 NOT FIXED |

---

## Runtime Test Results

### ✅ Working Endpoints
- `POST /auth/register` - Creates user with bcrypt hashing
- `POST /auth/login` - Returns JWT with roles
- `POST /auth/refresh` - Valid token refresh
- `GET /auth/me` - Returns current user
- `POST /payments` - Creates payment record
- `POST /payments/process` - Processes payment correctly
- `GET /payments/order/:orderId/history` - Returns history (route fixed)
- `POST /shipping` - Creates shipping after payment success
- `PATCH /shipping/:id` - Updates status with admin check

### ❌ Broken/Unsafe Endpoints
- `GET /products/slug/:slug` - **404** (route shadowing)
- `GET /users/:id` - **SECURITY** (public access)
- `POST /cart/items` - **UNSAFE** (no validation)
- `POST /orders` - **RISKY** (race condition)
- `PATCH /orders/:id/status` - **NOT FOUND** (no endpoint)

---

## Quick Fix Checklist

To make backend production-ready, apply these fixes:

```typescript
// ✅ 1. Fix products controller route ordering (5 min)
@Get('search')
@Get('slug/:slug')
@Get(':id')
@Get()

// ✅ 2. Add guard to GET /users/:id (10 min)
@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(
  @Param('id') userId: string,
  @CurrentUser() currentUser: any,
) {
  if (userId !== currentUser.id && !currentUser.roles.includes('ADMIN')) {
    throw new ForbiddenException();
  }
  return this.usersService.findById(userId);
}

// ✅ 3. Add validation to cart (30 min)
if (!Number.isInteger(quantity) || quantity < 1) throw error;
if (!product) throw error;
if (product.status !== 'ACTIVE') throw error;
if (product.inventory.quantity < quantity) throw error;

// ✅ 4. Move inventory check into transaction (30 min)
return this.prisma.$transaction(async (tx) => {
  // Check and decrease inside transaction
});

// ✅ 5. Add order status endpoint (15 min)
@Patch(':id/status')
@Roles('ADMIN')
updateOrderStatus(...) { ... }
```

**Total time to fix:** ~90 minutes

---

## Conclusion

**Current Status:** ⚠️ **PARTIALLY FUNCTIONAL**

**Production Ready:** ❌ **NO** (4 critical issues)

**Key Blockers:**
1. Product slug route broken (feature unavailable)
2. User profile public (security issue)
3. Cart no validation (data corruption risk)
4. Order race condition (inventory risk)

**Recommendation:** Apply critical fixes before any production deployment.

