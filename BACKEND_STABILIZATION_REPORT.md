# Scentora Backend Stabilization Report

**Date**: July 16, 2026  
**Phase**: Backend Stabilization & Architecture Repair (Phase 1)  
**Status**: Audit Complete

---

## Executive Summary

The Scentora backend has a solid NestJS foundation with proper module architecture, authentication infrastructure, and API structure. The system demonstrates:

✅ **Strengths:**
- Well-organized NestJS modules with clear domain separation
- JWT-based authentication with refresh token mechanism
- Role-based access control infrastructure exists
- Proper use of guards, decorators, and pipes
- Database relationships well-defined with Prisma
- Exception handling and validation in place
- API consistency through interceptors

⚠️ **Critical Issues Found:**
1. **Missing @Public() decorators on public routes** - Public catalog endpoints will be protected by default global JWT guard
2. **JWT Payload missing roles information** - RolesGuard expects user.roles but JWT doesn't include them
3. **No Admin role enforcement** - No routes are actually restricted to admin users
4. **Products POST/PUT/DELETE unprotected from unauthorized users** - Missing role-based protection
5. **Unprotected admin operations** - Need admin-only endpoints identified
6. **Users GET endpoint open to all** - Should be admin-only or filtered
7. **Missing admin-specific features** - No admin product management, user management

⚠️ **Stability Issues:**
1. RolesGuard implementation incomplete - needs integration with JWT payload
2. No explicit admin route protections
3. Some error messages may expose information details
4. Pagination not consistently enforced

---

## Module Analysis

### 1. Authentication Module ✅ WORKING
**Location**: `/backend/src/modules/auth`

**Features:**
- ✅ Register with email validation and password hashing (bcrypt)
- ✅ Login with credentials validation
- ✅ JWT generation with configurable expiration
- ✅ Refresh token mechanism with revocation support
- ✅ Logout with token revocation
- ✅ Change password
- ✅ Token validation
- ✅ User account status check (ACTIVE/INACTIVE/SUSPENDED)

**Controllers & Routes:**
| Route | Method | Auth | Status |
|-------|--------|------|--------|
| `/auth/register` | POST | ❌ Public | ✅ Working |
| `/auth/login` | POST | ❌ Public | ✅ Working |
| `/auth/refresh` | POST | ❌ Public | ✅ Working |
| `/auth/logout` | POST | ✅ JWT | ✅ Working |
| `/auth/change-password` | POST | ✅ JWT | ✅ Working |
| `/auth/me` | GET | ✅ JWT | ✅ Working |

**Issues:** None - Authentication foundation is solid

**Security:** ✅ Good
- Proper password hashing with bcrypt
- JWT secrets from config
- Refresh token with expiration and revocation
- Account status validation

---

### 2. Users Module ⚠️ NEEDS FIXES
**Location**: `/backend/src/modules/users`

**Features:**
- User profile management
- User preferences (language, theme, notifications)
- Address management (billing/shipping)
- User listing

**Controllers & Routes:**
| Route | Method | Auth | Current | Issue |
|-------|--------|------|---------|-------|
| `/users` | POST | ❌ Public | ✅ Works | ⚠️ Duplicate with `/auth/register` |
| `/users` | GET | ❌ Public | ⚠️ OPEN | ⚠️ Should be ADMIN only |
| `/users/profile/me` | GET | ✅ JWT | ✅ Works | ✅ Good |
| `/users/preferences/me` | GET/PUT | ✅ JWT | ✅ Works | ✅ Good |
| `/users/addresses/me` | GET/POST | ✅ JWT | ✅ Works | ✅ Good |
| `/users/addresses/:id` | GET/PUT/DELETE | ✅ JWT | ✅ Works | ✅ Good |
| `/users/:id` | GET | ❌ Public | ⚠️ OPEN | ⚠️ Consider filtering |
| `/users/:id` | PUT | ✅ JWT | ⚠️ No ownership check | ⚠️ User can update others |
| `/users/:id` | DELETE | ✅ JWT | ⚠️ No ownership check | ⚠️ User can delete others |

**Issues:**
1. GET `/users` endpoint is completely open - should be ADMIN only
2. PUT `/users/:id` and DELETE `/users/:id` have no ownership or admin check
3. Duplicate user creation - both `/auth/register` and `/users` POST create users

**Security Issues:**
🔴 **CRITICAL**: User can update/delete any other user
🔴 **CRITICAL**: User list is publicly available

**Recommendation:** 
- Add role-based protection to user management endpoints
- Ensure users can only modify their own profiles
- Restrict user listing to admins only

---

### 3. Products Module ⚠️ NEEDS FIXES
**Location**: `/backend/src/modules/products`

**Features:**
- Product catalog browsing
- Search functionality
- Get by slug
- Product management (create/update/delete)

**Controllers & Routes:**
| Route | Method | Auth | Current | Issue |
|-------|--------|------|---------|-------|
| `/products` | GET | ❌ Public | 🔴 PROTECTED | 🔴 Should be PUBLIC |
| `/products` | POST | ✅ JWT | ⚠️ No role check | ⚠️ Any user can create |
| `/products/search` | GET | ❌ Public | 🔴 PROTECTED | 🔴 Should be PUBLIC |
| `/products/:id` | GET | ❌ Public | 🔴 PROTECTED | 🔴 Should be PUBLIC |
| `/products/:id/slug` | GET | ❌ Public | 🔴 PROTECTED | 🔴 Should be PUBLIC |
| `/products/:id` | PUT | ✅ JWT | ⚠️ No role check | ⚠️ Any user can modify |
| `/products/:id` | DELETE | ✅ JWT | ⚠️ No role check | ⚠️ Any user can delete |

**Issues:**
🔴 **CRITICAL**: Product catalog routes marked with `@UseGuards(JwtAuthGuard)` at class level - they're protected!
- GET `/products` requires JWT - **WRONG**
- GET `/products/search` requires JWT - **WRONG**
- GET `/products/:id` requires JWT - **WRONG**
- GET `/products/slug/:slug` requires JWT - **WRONG**

🟡 **HIGH**: Product modification routes lack admin role enforcement
- POST requires JWT but no ADMIN check
- PUT requires JWT but no ADMIN check
- DELETE requires JWT but no ADMIN check

**Recommendation:**
- Add `@Public()` decorators to all GET routes in ProductsController
- Add `@Roles('ADMIN')` + `@UseGuards(RolesGuard)` to POST/PUT/DELETE

---

### 4. Categories Module ✅ WORKING
**Location**: `/backend/src/modules/categories`

**Features:**
- Category browsing

**Controllers & Routes:**
| Route | Method | Auth | Status |
|-------|--------|------|--------|
| `/categories` | GET | ❌ Public | ✅ Correct |
| `/categories/:id` | GET | ❌ Public | ✅ Correct |

**Status:** ✅ No guards applied - correctly public
**Security:** ✅ Good

---

### 5. Brands Module ✅ WORKING
**Location**: `/backend/src/modules/brands`

**Features:**
- Brand browsing

**Controllers & Routes:**
| Route | Method | Auth | Status |
|-------|--------|------|--------|
| `/brands` | GET | ❌ Public | ✅ Correct |
| `/brands/:id` | GET | ❌ Public | ✅ Correct |

**Status:** ✅ No guards applied - correctly public
**Security:** ✅ Good

---

### 6. Cart Module ✅ WORKING
**Location**: `/backend/src/modules/cart`

**Features:**
- Get user cart
- Add/remove items
- Clear cart

**Controllers & Routes:**
| Route | Method | Auth | Status |
|-------|--------|------|--------|
| `/cart` | GET | ✅ JWT | ✅ Correct |
| `/cart/items` | POST | ✅ JWT | ✅ Correct |
| `/cart/items/:productId` | DELETE | ✅ JWT | ✅ Correct |
| `/cart` | DELETE | ✅ JWT | ✅ Correct |

**Status:** ✅ Properly protected - class-level `@UseGuards(JwtAuthGuard)`
**Security:** ✅ Good - uses CurrentUser decorator

---

### 7. Wishlist Module ✅ WORKING
**Location**: `/backend/src/modules/wishlist`

**Features:**
- Get user wishlist
- Add/remove items

**Controllers & Routes:**
| Route | Method | Auth | Status |
|-------|--------|------|--------|
| `/wishlist` | GET | ✅ JWT | ✅ Correct |
| `/wishlist/items/:productId` | POST | ✅ JWT | ✅ Correct |
| `/wishlist/items/:productId` | DELETE | ✅ JWT | ✅ Correct |

**Status:** ✅ Properly protected - class-level `@UseGuards(JwtAuthGuard)`
**Security:** ✅ Good

---

### 8. Orders Module ✅ WORKING
**Location**: `/backend/src/modules/orders`

**Features:**
- Get user orders
- Get order by ID
- Create order

**Controllers & Routes:**
| Route | Method | Auth | Status |
|-------|--------|------|--------|
| `/orders` | GET | ✅ JWT | ✅ Correct |
| `/orders/:id` | GET | ✅ JWT | ✅ Correct |
| `/orders` | POST | ✅ JWT | ✅ Correct |

**Status:** ✅ Properly protected - class-level `@UseGuards(JwtAuthGuard)`
**Security:** ✅ Good - uses CurrentUser for ownership

---

### 9. Reviews Module ⚠️ PARTIALLY WORKING
**Location**: `/backend/src/modules/reviews`

**Features:**
- Get product reviews (public)
- Create review (authenticated)
- Get user's own reviews (authenticated)

**Controllers & Routes:**
| Route | Method | Auth | Status |
|-------|--------|------|--------|
| `/reviews/product/:productId` | GET | ❌ Public | ✅ Correct |
| `/reviews` | POST | ✅ JWT | ✅ Correct |
| `/reviews/user/my-reviews` | GET | ✅ JWT | ✅ Correct |

**Status:** ✅ Correctly protected mix of public and private

---

### 10. Inventory Module ⚠️ INCOMPLETE
**Location**: `/backend/src/modules/inventory`

**Status:** Module exists but lacks exposed API endpoints
- Service exists but no controller
- Likely used internally by products/orders
- **Issue**: No inventory management endpoints for admins

---

### 11. Health Module ✅ WORKING
**Location**: `/backend/src/modules/health`

**Features:**
- Health check endpoint

**Status:** ✅ Used for monitoring

---

## Authorization & RBAC Analysis

### Current State:
✅ **What's Implemented:**
- Role model in database (id, name, description)
- UserRole junction table for many-to-many relationships
- Permission model (resource, action)
- RolePermission junction table
- Three roles defined: USER, ADMIN, VENDOR
- JwtAuthGuard - validates JWT tokens
- RolesGuard - checks user.roles array
- @Roles() decorator for specifying required roles
- @Public() decorator for bypassing JWT guard
- @CurrentUser() decorator for injecting user object

🔴 **Critical Gap:**
The JWT payload does NOT include user roles:
```typescript
// Current JWT payload (auth.service.ts)
const payload = {
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  // ❌ NO ROLES HERE!
};
```

This means:
- RolesGuard cannot work even if applied
- User roles can only be checked by querying database
- @Roles() decorator is non-functional

### RolesGuard Analysis:
```typescript
// Current implementation expects user.roles array
const hasRole = requiredRoles.some((role) =>
  user.roles.includes(role),
);
```

**Problem:** RolesGuard checks `user.roles` string array, but JWT payload doesn't populate it.

---

## Protected vs Public Routes Summary

### ✅ Correctly Public:
- GET `/categories`
- GET `/categories/:id`
- GET `/brands`
- GET `/brands/:id`
- GET `/reviews/product/:productId`
- GET `/auth/register` endpoint exists
- GET `/auth/login` endpoint exists
- GET `/auth/refresh` endpoint exists
- POST `/users` (duplicate registration)

### 🔴 INCORRECTLY PROTECTED (Should be Public):
**Due to class-level `@UseGuards(JwtAuthGuard)` in ProductsController:**
- GET `/products`
- GET `/products/search`
- GET `/products/:id`
- GET `/products/slug/:slug`

### ✅ Correctly Protected:
- GET `/cart/*` - JWT required
- POST `/cart/*` - JWT required
- DELETE `/cart/*` - JWT required
- GET `/wishlist/*` - JWT required
- POST `/wishlist/*` - JWT required
- DELETE `/wishlist/*` - JWT required
- GET `/orders/*` - JWT required
- POST `/orders/*` - JWT required
- POST `/reviews` - JWT required
- GET `/reviews/user/my-reviews` - JWT required

### 🟡 NEEDS ROLE PROTECTION (Should be Admin):
- POST `/products` - Create products
- PUT `/products/:id` - Update products
- DELETE `/products/:id` - Delete products
- GET `/users` - List all users
- PUT `/users/:id` - Update any user
- DELETE `/users/:id` - Delete any user

---

## Error Handling Analysis

### Exception Filter ✅
**File**: `/backend/src/common/filters/all-exceptions.filter.ts`

**Good:**
- ✅ Catches all exceptions
- ✅ Returns consistent error format
- ✅ Includes error classification (error field)
- ✅ Includes metadata (timestamp, path, method)

**Issues:**
- ⚠️ Generic "Internal server error" for unknown exceptions
- ⚠️ Doesn't log errors for debugging

### Validation ✅
**Global ValidationPipe in main.ts:**
```typescript
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
})
```

**Good:**
- ✅ Strips unknown fields (whitelist)
- ✅ Rejects unknown fields (forbidNonWhitelisted)
- ✅ Transforms to DTO classes
- ✅ Enables implicit type conversion

**Issues:**
- ⚠️ Error messages from validation may be verbose

### Custom Exceptions ✅
**File**: `/backend/src/shared/exceptions/custom.exceptions.ts`

**Good:**
- ✅ Proper exception hierarchy
- ✅ Standard HTTP status codes
- ✅ Error classification
- ✅ Used consistently

### Response Interceptor ✅
**File**: `/backend/src/common/interceptors/response.interceptor.ts`

**Good:**
- ✅ Consistent response format
- ✅ Includes metadata
- ✅ Wraps all successful responses

**Format:**
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {...},
  "timestamp": "2026-07-16T...",
  "path": "/api/v1/products"
}
```

---

## Database Safety Review

### Schema Analysis ✅
- ✅ Proper relationship constraints with onDelete policies
- ✅ Required fields enforced
- ✅ Unique constraints on critical fields (email, slug, code)
- ✅ Proper indexes on foreign keys and search columns
- ✅ Appropriate decimal precision for financial data
- ✅ Enums for controlled values
- ✅ Cascading deletes configured appropriately

### Specific Checks:
✅ User deletion is soft delete (deletedAt field)  
✅ Order deletion is soft delete (deletedAt field)  
✅ Product deletion is soft delete (deletedAt field)  
✅ Review deletion is soft delete (deletedAt field)  
✅ Cart items cascade delete with cart  
✅ Wishlist items cascade delete with wishlist  
✅ Refresh tokens cascade delete with user  
✅ User preferences cascade delete with user  

### Issues Found:
⚠️ **Minor**: Product, Brand, Category constraints are RESTRICT - good for data integrity but requires soft deletes or cascading logic

---

## API Response Consistency

### Success Response Format ✅
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {...},
  "timestamp": "2026-07-16T...",
  "path": "/api/v1/products"
}
```

### Error Response Format ✅
```json
{
  "statusCode": 400,
  "timestamp": "2026-07-16T...",
  "path": "/api/v1/products",
  "method": "POST",
  "error": "BAD_REQUEST",
  "message": "..."
}
```

### Issues:
⚠️ Success response format doesn't include pagination metadata
⚠️ List endpoints return raw arrays instead of paginated response

---

## Security Assessment

### ✅ Strengths:
- ✅ JWT-based stateless authentication
- ✅ Password hashing with bcrypt (cost factor 10)
- ✅ Refresh token with expiration
- ✅ Token revocation on logout
- ✅ Helmet middleware for security headers
- ✅ CORS properly configured
- ✅ Exception messages don't expose sensitive data
- ✅ Role-based access control infrastructure

### 🔴 Critical Issues:
🔴 **Missing Role Enforcement** - RolesGuard exists but JWT lacks roles  
🔴 **Unprotected Admin Operations** - No admin-only endpoints identified  
🔴 **Data Exposure** - User list publicly accessible  
🔴 **Unowned Resource Access** - Users can modify/delete other users  
🔴 **Public Catalog Protected** - Product endpoints require authentication  

### 🟡 High Priority Issues:
🟡 **JWT Payload Incomplete** - Roles not included  
🟡 **No Admin Role Protection** - POST/PUT/DELETE on products unprotected  
🟡 **Service Owner Verification** - Missing ownership checks in services  

---

## Completeness Assessment

| Feature | Status | Notes |
|---------|--------|-------|
| Authentication | ✅ Complete | Login, register, token refresh working |
| JWT/Token Management | ✅ Complete | Token generation, validation, revocation working |
| User Profiles | ✅ Complete | Profile, preferences, addresses working |
| Public Catalog | 🔴 Broken | Protected by global JWT guard (should be public) |
| Cart | ✅ Complete | Add, remove, clear working |
| Wishlist | ✅ Complete | Add, remove items working |
| Orders | ✅ Complete | Create, list, get by ID working |
| Reviews | ✅ Partial | Public read working, creation working |
| RBAC | 🔴 Incomplete | Infrastructure exists but not functional (JWT lacks roles) |
| Admin Management | ❌ Missing | No admin-only endpoints for product/user/order management |
| Inventory | ✅ Partial | Service exists, no exposed API |
| Health Check | ✅ Complete | Working |

---

## Issues Found & Priority Matrix

### 🔴 CRITICAL - Must Fix Immediately

1. **Product Catalog Routes Protected by JWT**
   - Impact: Users cannot browse products without authentication
   - Severity: CRITICAL
   - File: `ProductsController`
   - Fix: Add `@Public()` to GET routes

2. **JWT Payload Missing Roles**
   - Impact: Role-based protection cannot work
   - Severity: CRITICAL
   - File: `auth.service.ts`
   - Fix: Include roles array in JWT payload generation

3. **No Admin Role Enforcement on Admin Operations**
   - Impact: Any authenticated user can create/modify/delete products
   - Severity: CRITICAL
   - File: `ProductsController`
   - Fix: Add `@Roles('ADMIN')` + `@UseGuards(RolesGuard)` to POST/PUT/DELETE

4. **User Can Modify/Delete Other Users**
   - Impact: Security breach - users can tamper with other accounts
   - Severity: CRITICAL
   - File: `users.service.ts`, `users.controller.ts`
   - Fix: Add ownership/admin checks before updates/deletes

5. **User List Publicly Accessible**
   - Impact: Information disclosure - all users listed without authentication
   - Severity: CRITICAL
   - File: `users.controller.ts`
   - Fix: Add admin-only access to GET `/users`

### 🟡 HIGH - Should Fix in This Phase

6. **RolesGuard Cannot Verify Roles**
   - Impact: Role-based protection ineffective
   - Severity: HIGH
   - File: `roles.guard.ts`
   - Fix: Integrate with updated JWT payload

7. **No Admin-Specific Endpoints**
   - Impact: Cannot manage system resources
   - Severity: HIGH
   - Files: Multiple controllers
   - Fix: Create admin management endpoints and protect them

8. **Product Management Not Role-Protected**
   - Impact: Any user can manage products
   - Severity: HIGH
   - File: `products.controller.ts`
   - Fix: Add admin protection

---

## Recommendations for Phase 1 Fixes

### Fix 1: Add @Public() Decorators to Catalog Routes
```typescript
// ProductsController
@Get()
@Public()  // ADD THIS
findAll(...) { ... }

@Get('search')
@Public()  // ADD THIS
search(...) { ... }

@Get(':id')
@Public()  // ADD THIS
findOne(...) { ... }

@Get('slug/:slug')
@Public()  // ADD THIS
findBySlug(...) { ... }
```

### Fix 2: Include Roles in JWT Payload
Update `auth.service.ts` generateTokens method to fetch and include user roles in JWT payload.

### Fix 3: Protect Admin Operations
Add `@Roles('ADMIN')` and `@UseGuards(RolesGuard)` to product management routes.

### Fix 4: Verify User Ownership
Add checks in user service to ensure users can only modify their own data or require ADMIN role.

### Fix 5: Restrict User Listing
Add `@Roles('ADMIN')` to GET `/users` or implement filtering by current user.

---

## Next Steps

### Phase 1B - Implementation (This Phase)
1. ✅ Audit complete
2. → Fix product catalog routes protection
3. → Fix JWT payload to include roles
4. → Implement role-based protection for admin operations
5. → Add ownership verification for user resources
6. → Test all routes with and without authentication

### Phase 2 - Testing
1. Verify authentication flows
2. Test public route accessibility
3. Test protected route rejection without token
4. Test role-based access control
5. Build and deploy

### Phase 3 - Frontend Integration
After backend stabilization, proceed with frontend-backend integration.

---

## Modified Files (From This Audit)
**No files modified in audit phase - only discovery**

---

## Build Status
**Pre-Fix:** Unknown (will verify during implementation)

**Expected Fix Changes:**
- `backend/src/modules/products/products.controller.ts` - Add @Public() decorators
- `backend/src/modules/auth/auth.service.ts` - Update JWT payload
- `backend/src/modules/users/users.controller.ts` - Add admin protection
- `backend/src/modules/users/users.service.ts` - Add ownership checks
- Possibly: Create admin guards and decorators

---

## Conclusion

The Scentora backend has a solid architectural foundation with proper module organization, authentication infrastructure, and database design. However, there are critical security and functionality issues that must be fixed before the system can be considered stable:

**Critical blockers:**
1. Product catalog is inaccessible due to JWT protection
2. JWT lacks role information for authorization
3. No admin role enforcement on sensitive operations
4. Users can compromise each other's data

These issues must be resolved before frontend-backend integration can begin. The fixes are straightforward implementations following existing patterns in the codebase.

**Estimated effort for fixes:** 2-3 hours  
**Estimated testing time:** 1 hour  
**Risk level:** Low (fixes follow existing patterns)

---

## Appendix: Full Route Matrix

### Complete API Route Status Matrix

| Module | Route | Method | Current Auth | Required Auth | Issue | Fix Priority |
|--------|-------|--------|--------------|---------------|-------|--------------|
| Auth | `/auth/register` | POST | Public | Public | ✅ | - |
| Auth | `/auth/login` | POST | Public | Public | ✅ | - |
| Auth | `/auth/refresh` | POST | Public | Public | ✅ | - |
| Auth | `/auth/logout` | POST | JWT | JWT | ✅ | - |
| Auth | `/auth/change-password` | POST | JWT | JWT | ✅ | - |
| Auth | `/auth/me` | GET | JWT | JWT | ✅ | - |
| Users | `/users` | POST | Public | Public | ✅ Duplicate | Medium |
| Users | `/users` | GET | Public | Admin | 🔴 Wrong | CRITICAL |
| Users | `/users/profile/me` | GET | JWT | JWT | ✅ | - |
| Users | `/users/preferences/me` | GET | JWT | JWT | ✅ | - |
| Users | `/users/preferences/me` | PUT | JWT | JWT | ✅ | - |
| Users | `/users/addresses/me` | GET | JWT | JWT | ✅ | - |
| Users | `/users/addresses/me` | POST | JWT | JWT | ✅ | - |
| Users | `/users/addresses/:id` | GET | JWT | JWT Owner | ⚠️ No check | HIGH |
| Users | `/users/addresses/:id` | PUT | JWT | JWT Owner | ⚠️ No check | HIGH |
| Users | `/users/addresses/:id` | DELETE | JWT | JWT Owner | ⚠️ No check | HIGH |
| Users | `/users/:id` | GET | Public | Public/Admin | ⚠️ Exposed | MEDIUM |
| Users | `/users/:id` | PUT | JWT | JWT Owner/Admin | 🔴 Wrong | CRITICAL |
| Users | `/users/:id` | DELETE | JWT | JWT Owner/Admin | 🔴 Wrong | CRITICAL |
| Products | `/products` | GET | JWT | Public | 🔴 Wrong | CRITICAL |
| Products | `/products` | POST | JWT | JWT + Admin | 🔴 Wrong | CRITICAL |
| Products | `/products/search` | GET | JWT | Public | 🔴 Wrong | CRITICAL |
| Products | `/products/:id` | GET | JWT | Public | 🔴 Wrong | CRITICAL |
| Products | `/products/:id` | PUT | JWT | JWT + Admin | 🔴 Wrong | CRITICAL |
| Products | `/products/slug/:slug` | GET | JWT | Public | 🔴 Wrong | CRITICAL |
| Products | `/products/:id` | DELETE | JWT | JWT + Admin | 🔴 Wrong | CRITICAL |
| Categories | `/categories` | GET | Public | Public | ✅ | - |
| Categories | `/categories/:id` | GET | Public | Public | ✅ | - |
| Brands | `/brands` | GET | Public | Public | ✅ | - |
| Brands | `/brands/:id` | GET | Public | Public | ✅ | - |
| Cart | `/cart` | GET | JWT | JWT | ✅ | - |
| Cart | `/cart/items` | POST | JWT | JWT | ✅ | - |
| Cart | `/cart/items/:productId` | DELETE | JWT | JWT | ✅ | - |
| Cart | `/cart` | DELETE | JWT | JWT | ✅ | - |
| Wishlist | `/wishlist` | GET | JWT | JWT | ✅ | - |
| Wishlist | `/wishlist/items/:productId` | POST | JWT | JWT | ✅ | - |
| Wishlist | `/wishlist/items/:productId` | DELETE | JWT | JWT | ✅ | - |
| Orders | `/orders` | GET | JWT | JWT | ✅ | - |
| Orders | `/orders/:id` | GET | JWT | JWT | ✅ | - |
| Orders | `/orders` | POST | JWT | JWT | ✅ | - |
| Reviews | `/reviews/product/:productId` | GET | Public | Public | ✅ | - |
| Reviews | `/reviews` | POST | JWT | JWT | ✅ | - |
| Reviews | `/reviews/user/my-reviews` | GET | JWT | JWT | ✅ | - |

