# Scentora Project Completion Report

**Generated:** July 16, 2026  
**Repository:** `C:\Users\Ariyan_co\Desktop\Scentora`  
**Analysis Type:** Read-only codebase audit (no source files modified)

---

## 1. Project Overview

### Current Status

| Layer | Estimate |
|-------|----------|
| Frontend UI/UX | ~70% |
| Frontend–Backend Integration | ~0% |
| Backend API | ~55% |
| Database Schema | ~85% |
| **Overall Project** | **~48%** |

The project has a polished, bilingual frontend shell and a functional NestJS backend foundation, but the two layers are entirely disconnected. The frontend runs on static mock data; the backend exposes REST APIs that no frontend code calls.

### Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend (Next.js 16 App Router)                           │
│  /frontend/app/[locale]/(routes)/…                          │
│  Mock data in /frontend/lib/*                               │
│  i18n: en + fa (RTL)                                        │
└──────────────────────────┬──────────────────────────────────┘
                           │  ❌ No API client / no fetch calls
┌──────────────────────────▼──────────────────────────────────┐
│  Backend (NestJS 10)                                        │
│  /backend/src/modules/*                                     │
│  Global prefix: /api/v1                                     │
│  Swagger: /api/docs                                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│  PostgreSQL via Prisma ORM                                  │
│  /backend/prisma/schema.prisma                              │
│  1 migration applied                                        │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack Confirmation

| Area | Confirmed Stack |
|------|-----------------|
| Frontend framework | Next.js 16.2.10 (App Router) |
| Frontend UI | React 19, Tailwind CSS 4, shadcn/ui, Base UI, Lucide icons |
| Frontend i18n | Custom dictionary system (`frontend/i18n/`) — en, fa |
| Backend framework | NestJS 10.3 |
| ORM | Prisma 5.7 |
| Database | PostgreSQL |
| Auth | JWT (access + refresh tokens), bcrypt, Passport |
| API docs | Swagger/OpenAPI at `/api/docs` |
| DevOps | Docker (`backend/Dockerfile`, `backend/docker-compose.yml`) |

---

## 2. Frontend Analysis

### Completed Modules

| Module / Area | Status | Notes |
|---------------|--------|-------|
| Home page | 🟡 Partial | Full layout; mock product data |
| Catalog listing | 🟡 Partial | Client-side filter/sort on mock data |
| Product detail | 🟡 Partial | Rich UI; mock data; buttons non-functional |
| Cart | 🟡 Partial | Static mock cart; qty/remove buttons inert |
| Checkout | 🟡 Partial | Multi-step form UI; no order submission |
| Order success | 🟡 Partial | Static confirmation page |
| Wishlist | 🟡 Partial | Mock data display |
| Login / Register | 🟡 Partial | Form UI only; simulates submit with timeout |
| Account dashboard | 🟡 Partial | Mock user stats and navigation |
| Account orders | 🟡 Partial | Mock order history |
| Profile | 🟡 Partial | Mock user profile display |
| About | ✅ Complete | Static content, i18n-ready |
| Contact | 🟡 Partial | Form UI; no backend submission |
| Admin dashboard | 🟡 Partial | Mock metrics and tables |
| Admin products | 🟡 Partial | Lists mock products; create/edit forms are shells |
| Admin orders | 🟡 Partial | Mock data table |
| Admin users | 🟡 Partial | Mock data table |
| Admin inventory | 🟡 Partial | Mock stock data |
| Admin analytics | 🟡 Partial | Mock charts/metrics |
| Blog | ⏳ Not Started | Components exist; no routes |
| Account settings | ⏳ Not Started | Linked from account page but route missing |
| Password reset | ⏳ Not Started | Link points to `#` |

### Components Breakdown

**Total components created:** 58 `.tsx` files in `frontend/components/`

| Category | Count | Representative Paths | Status |
|----------|-------|----------------------|--------|
| UI (shadcn/base) | 13 | `frontend/components/ui/*` | ✅ Complete |
| Layout | 5 | `frontend/components/layout/*` | ✅ Complete |
| Home / Marketing | 8 | `frontend/components/home/*`, `marketing/` | 🟡 Partial (mock data) |
| Catalog | 4 | `frontend/components/catalog/*` | 🟡 Partial |
| Product | 7 | `frontend/components/product/*` | 🟡 Partial |
| Checkout | 4 | `frontend/components/checkout/*` | 🟡 Partial |
| Account | 3 | `frontend/components/account/*` | 🟡 Partial |
| Admin | 3 | `frontend/components/admin/*` | 🟡 Partial |
| Auth | 1 | `frontend/components/auth/auth-form.tsx` | 🟡 Partial |
| Commerce | 1 | `frontend/components/commerce/order-tracking.tsx` | 🟡 Partial |
| System (loading/error) | 3 | `frontend/components/system/*` | ✅ Complete |
| Theme / i18n / Providers | 5 | `theme/`, `i18n/`, `providers/` | ✅ Complete |
| Blog / Contact | 2 | `blog/`, `contact/` | 🟡 Partial (no blog route) |
| Showcase (dev) | 1 | `frontend/components/showcase.tsx` | ⏳ Dev artifact |

### Pages Breakdown

**Desktop routes (locale-prefixed):** 22 user-facing + 7 admin = **29 routes**

| Route | Functionality Level |
|-------|---------------------|
| `/[locale]` | 🟡 Partial — full homepage, mock products |
| `/[locale]/catalog` | 🟡 Partial — interactive filters on mock data |
| `/[locale]/catalog/[id]` | 🟡 Partial — detail view, no cart/wishlist actions |
| `/[locale]/cart` | 🟡 Partial — display only |
| `/[locale]/checkout` | 🟡 Partial — form validation UI, no API |
| `/[locale]/order-success` | 🟡 Partial — static page |
| `/[locale]/wishlist` | 🟡 Partial — display only |
| `/[locale]/login` | 🟡 Partial — UI shell |
| `/[locale]/register` | 🟡 Partial — UI shell |
| `/[locale]/account` | 🟡 Partial — mock dashboard |
| `/[locale]/account/orders` | 🟡 Partial — mock history |
| `/[locale]/profile` | 🟡 Partial — mock profile |
| `/[locale]/about` | ✅ Complete |
| `/[locale]/contact` | 🟡 Partial — form without backend |
| `/[locale]/admin` | 🟡 Partial — mock dashboard |
| `/[locale]/admin/analytics` | 🟡 Partial — mock metrics |
| `/[locale]/admin/orders` | 🟡 Partial — mock table |
| `/[locale]/admin/users` | 🟡 Partial — mock table |
| `/[locale]/admin/inventory` | 🟡 Partial — mock stock |
| `/[locale]/admin/products` | 🟡 Partial — mock list |
| `/[locale]/admin/products/create` | ⏳ Skeleton — form prevents default only |
| `/[locale]/admin/products/[id]/edit` | ⏳ Skeleton — form prevents default only |

**Pages with full functionality:** 1 (About — static content)  
**Pages with partial functionality:** 20  
**Pages that are skeletons only:** 2 (admin product create/edit forms)

### Frontend Features

| Feature | Status | Details |
|---------|--------|---------|
| Internationalization (i18n) | 🟡 Partial | en + fa locales; dictionaries for `common`, `layout`, `home` only; many admin/account strings hardcoded in English |
| Responsive design | ✅ Complete | Tailwind breakpoints used throughout header, catalog, admin layout |
| Accessibility | 🟡 Partial | Semantic landmarks, `aria-label` on nav; forms lack comprehensive ARIA; no skip links; contrast/theming via CSS variables |
| Authentication UI | 🟡 Partial | Login/register forms exist; no session, no token storage, no protected routes |
| Shopping flow UI | 🟡 Partial | Catalog → cart → checkout → success flow exists visually; no state persistence or API |
| Account management UI | 🟡 Partial | Profile, orders, addresses components exist; all mock; settings page missing |
| Admin UI | 🟡 Partial | Sidebar, tables, forms scaffolded; no role gating; all mock data |

### Frontend Issues

**Known issues**
- Zero API integration — no `fetch`, no `NEXT_PUBLIC_*` env vars, no API client layer
- Auth forms reset on submit without authentication (`frontend/components/auth/auth-form.tsx`)
- Cart quantity +/- and remove buttons have no handlers (`frontend/app/[locale]/(routes)/cart/page.tsx`)
- Admin product create/edit forms call `e.preventDefault()` only
- `/account/settings` linked but route does not exist
- Forgot password links to `#`
- Blog components (`frontend/components/blog/`) have no corresponding app routes

**Incomplete features**
- Real authentication and session management
- Persistent cart/wishlist (local or server)
- Payment processing UI wired to backend
- Product image display (placeholder gradients only)
- Search in header is non-functional
- Admin role protection on frontend routes

**Performance concerns**
- All product data loaded client-side from large static arrays
- No image optimization (no product images configured)
- No data caching strategy (React Query/SWR not present)

**Accessibility gaps**
- Hardcoded English strings on several pages (admin dashboard, account quick actions)
- Form error announcements not tied to ARIA live regions
- Mobile menu lacks focus trap
- Product tables may have accessibility issues on small screens (horizontal scroll without guidance)

---

## 3. Backend Analysis

### Completed Modules

| Module | Path | Status | What's Implemented |
|--------|------|--------|-------------------|
| Auth | `backend/src/modules/auth/` | 🟡 Partial | Register, login, refresh, logout, change-password, me |
| Users | `backend/src/modules/users/` | 🟡 Partial | CRUD, profile, preferences, full address CRUD |
| Products | `backend/src/modules/products/` | 🟡 Partial | CRUD, search, find by ID/slug |
| Categories | `backend/src/modules/categories/` | 🟡 Partial | Read-only list and by ID |
| Brands | `backend/src/modules/brands/` | 🟡 Partial | Read-only list and by ID |
| Cart | `backend/src/modules/cart/` | 🟡 Partial | Get cart, add/remove items, clear |
| Wishlist | `backend/src/modules/wishlist/` | 🟡 Partial | Get, add item, remove item |
| Orders | `backend/src/modules/orders/` | 🟡 Partial | List user orders, get by ID, create order |
| Reviews | `backend/src/modules/reviews/` | 🟡 Partial | Product reviews (public read), create, user reviews |
| Inventory | `backend/src/modules/inventory/` | 🟡 Partial | Service only — no controller/endpoints |
| Health | `backend/src/modules/health/` | ✅ Complete | Health and readiness checks |

**Not implemented as modules (schema exists):**
- Coupons — ⏳ Not Started
- Notifications — ⏳ Not Started
- Password reset — ⏳ Not Started
- Email verification — ⏳ Not Started
- Payment gateway — ⏳ Not Started
- File/image upload — ⏳ Not Started
- Wallet — ⏳ Not Started (mentioned in `PROJECT_CONTEXT.md`, not in schema)

### Database Schema

**Models implemented (22):** User, Role, Permission, UserRole, RolePermission, UserPreference, RefreshToken, PasswordResetToken, EmailVerificationToken, Address, Product, Category, Brand, ProductImage, ProductAttribute, Inventory, Cart, CartItem, Wishlist, WishlistItem, Order, OrderItem, Review, Notification, Coupon, Payment, Shipping

| Aspect | Status | Notes |
|--------|--------|-------|
| Relations verified | ✅ Yes | Foreign keys and cascades defined in `backend/prisma/schema.prisma` |
| Indexes present | ✅ Yes | Indexes on email, slug, status, foreign keys, composite uniques |
| Constraints present | ✅ Yes | Unique constraints, enums, `@db` types, soft-delete fields |
| Migrations | 🟡 Partial | 1 migration: `20260715230121_initial_identity_platform` |
| Seed data | ✅ Complete | `backend/prisma/seed.ts` — roles, permissions, categories, brands, products, users |

**Scalability assessment:** Schema is well-normalized with appropriate indexes for an e-commerce MVP. Missing: full-text search index, read replicas config, partitioning strategy, audit logs. Adequate for portfolio/MVP scale.

### Backend Features

| Feature | Status | Details |
|---------|--------|---------|
| Authentication | 🟡 Partial | JWT + refresh tokens work; password reset/email verify not exposed |
| Authorization (RBAC) | ⏳ Not Started | Roles/permissions seeded; `RolesGuard`/`PermissionsGuard`/`AdminGuard` exist but are not registered or used |
| User management | 🟡 Partial | Full user CRUD and addresses; no admin-only enforcement |
| Product catalog | 🟡 Partial | CRUD + search; no image upload; slug route ordering bug (see Issues) |
| Shopping cart | 🟡 Partial | Basic add/remove/clear; no guest cart; no quantity update endpoint |
| Order management | 🟡 Partial | User-scoped create/read; `updateOrderStatus` in service but no controller endpoint |
| Inventory | ⏳ Not Started | Service methods exist; no HTTP API; not integrated with order creation |

### Backend Issues

**Missing endpoints (estimated ~30 needed for full feature set)**
- Inventory management (GET/PUT stock, reserve/release)
- Admin order status updates
- Coupon CRUD and validation
- Notification CRUD
- Password reset request/confirm
- Email verification
- Payment intent/confirmation
- Category/Brand admin CRUD
- Product image upload
- Cart item quantity update (PATCH)
- Review moderation (approve/reject)
- Admin analytics aggregation

**Incomplete implementations**
- `OrdersService.createOrder` accepts untyped `data: any`; does not create Payment/Shipping records or decrement inventory
- Product create does not auto-create Inventory record
- JWT payload does not include roles — RBAC guards would fail even if enabled
- `ProductsController`: `@Get(':id')` is registered before `@Get('slug/:slug')`, making the slug route unreachable

**Security gaps**
- **Critical:** Global `JwtAuthGuard` applied in `app.module.ts`, but public catalog endpoints (products, categories, brands, health, reviews read) lack `@Public()` decorator — they incorrectly require authentication
- `GET /users` and `GET /users/:id` have no role restrictions — any authenticated user can list all users
- Default JWT secret fallback in `backend/src/config/configuration.ts`
- No rate limiting
- No CSRF protection (acceptable for pure API with Bearer tokens)
- Roles/permissions guards defined but unused

**Performance concerns**
- Product search uses `contains` without full-text index
- No caching layer (Redis)
- No pagination on categories/brands list endpoints

**API documentation gaps**
- Swagger configured but incomplete tag coverage (Categories, Brands, Inventory missing)
- `API_ENDPOINTS.md` at repo root documents auth/users only — incomplete vs actual API
- Duplicate doc file: `backend/API_ENDPOINTS.md`

---

## 4. Integration Status

| Aspect | Status |
|--------|--------|
| Frontend–Backend connection | ⏳ Not Started — zero HTTP calls from frontend |
| API endpoints ready | **47** implemented |
| API endpoints needed (MVP) | **~15** additional (public access fixes, cart qty, order completion, inventory) |
| API endpoints needed (full) | **~30** additional |
| Data contract definition | ⏳ Not Started — frontend types (`price: string`) differ from backend (`Decimal`) |
| Error handling contracts | 🟡 Partial — backend has `AllExceptionsFilter` + `ResponseInterceptor`; frontend has `ErrorState` components but no API error handling |

**Backend response envelope:**
```json
{ "statusCode": 200, "message": "Success", "data": {}, "timestamp": "...", "path": "..." }
```
Frontend has no client code aware of this format.

---

## 5. Duplicate Implementations

| Duplicate | Locations | Recommendation |
|-----------|-----------|----------------|
| User mock data | `frontend/lib/user.ts`, `frontend/lib/user-account.ts` | Consolidate into single user domain module when API client is built |
| Order mock data | `frontend/lib/orders.ts`, `frontend/lib/admin.ts` | Single source with admin extending user orders |
| Product mock data | `frontend/lib/products.ts`, `frontend/lib/products-advanced.ts` | Merge into one products module with optional extended fields |
| User registration | `POST /auth/register`, `POST /users` | Use auth/register as canonical; restrict or remove public `POST /users` |
| API documentation | `API_ENDPOINTS.md`, `backend/API_ENDPOINTS.md` | Single source of truth; auto-generate from Swagger |
| RBAC guards | `roles.guard.ts` contains both `RolesGuard` and `AdminGuard` | Register one guard globally; include roles in JWT payload |
| Category definitions | Frontend hardcoded `PRODUCT_CATEGORIES` vs backend `Category` model | Drive frontend categories from API |
| Auth guard redundancy | Global guard + per-route `@UseGuards(JwtAuthGuard)` | Keep global guard; use `@Public()` consistently |

---

## 6. Files That Should Not Be Changed

These files form critical infrastructure and should remain stable unless a deliberate architectural change is planned:

| File | Reason |
|------|--------|
| `backend/prisma/schema.prisma` | Database contract — changes require migrations |
| `backend/prisma/migrations/*` | Immutable migration history |
| `backend/src/app.module.ts` | Root module wiring |
| `backend/src/config/configuration.ts` | Central config shape |
| `backend/src/config/prisma.service.ts` | Database connection singleton |
| `backend/src/common/common.module.ts` | Global filter/interceptor registration |
| `backend/src/shared/guards/jwt-auth.guard.ts` | Auth baseline |
| `backend/src/shared/decorators/index.ts` | `@Public`, `@CurrentUser`, `@Roles` contracts |
| `backend/src/main.ts` | Bootstrap, CORS, Swagger, validation pipe |
| `frontend/i18n/config.ts` | Central locale definition — all routing derives from this |
| `frontend/middleware.ts` | Locale detection and redirect logic |
| `frontend/next.config.ts` | Next.js configuration |
| `frontend/components.json` | shadcn/ui configuration |
| `.cursor/rules/scentora.mdc` | Project agent rules |
| `frontend/AGENTS.md`, `frontend/CLAUDE.md` | Next.js 16 agent guidance |

**Locked/stable patterns to preserve:**
- Locale-based routing: `/[locale]/…`
- API prefix: `/api/v1`
- Response envelope via `ResponseInterceptor`
- Dictionary namespace structure: `common`, `layout`, `home`

---

## 7. Completion Status by Domain

### User Experience Domain

| Metric | Value |
|--------|-------|
| Pages completed (visual) | 21 / 22 (~95% UI coverage) |
| Features completed | Homepage, about, contact form UI, theme toggle, locale switch, responsive layout |
| **Status** | **~65%** |

### Commerce Domain

| Metric | Value |
|--------|-------|
| Pages completed | 5 (cart, checkout, order-success, wishlist, account/orders) |
| Features completed | Cart display, checkout form UI, order tracking component (mock) |
| Backend endpoints | 10 (cart: 4, wishlist: 3, orders: 3) |
| **Status** | **~35%** |

### Product Discovery Domain

| Metric | Value |
|--------|-------|
| Pages completed | 2 (catalog, product detail) |
| Features completed | Client-side search/filter/sort (mock), category nav, related products UI |
| Backend endpoints | 11 (products: 7, categories: 2, brands: 2) |
| **Status** | **~50%** |

### Admin Domain

| Metric | Value |
|--------|-------|
| Pages completed | 7 |
| Features completed | Dashboard, product list, mock CRUD forms, inventory/analytics views |
| Backend endpoints | 0 admin-specific (uses generic product/user endpoints without RBAC) |
| **Status** | **~30%** |

### Security/Auth Domain

| Metric | Value |
|--------|-------|
| Features completed | Backend JWT auth, refresh tokens, password hashing, global guard |
| Endpoints implemented | 6 auth + 15 user/profile/address |
| **Status** | **~45%** (backend auth works; RBAC and frontend auth absent) |

---

## 8. Recommended Next Development Order

### High Priority (Needed for MVP)

1. **Fix backend public endpoint access** — Add `@Public()` to health, product reads, category/brand reads, review reads; fix product slug route ordering
2. **Create frontend API client layer** — `frontend/lib/api/` with typed fetch wrapper, env-based base URL, token management
3. **Wire authentication end-to-end** — Connect login/register to backend; store tokens; protect account/admin routes
4. **Connect product catalog to backend** — Replace `frontend/lib/products.ts` mock usage in catalog and detail pages
5. **Implement cart and checkout flow** — Connect cart CRUD, order creation, inventory decrement
6. **Enable RBAC** — Include roles in JWT; register `RolesGuard`; protect admin product/user endpoints

**Rationale:** Without public API access and a frontend API layer, no feature can function. Auth and catalog are prerequisites for any commerce flow. Cart/checkout completes the MVP purchase path.

### Medium Priority (Enhancements)

1. Inventory HTTP module and admin stock management UI
2. Admin order status management (backend endpoint + admin UI)
3. Review submission and display from API
4. Address management wired to backend on profile/checkout
5. Product image upload and display
6. Expand i18n dictionaries for admin, account, checkout strings
7. Guest cart or session-based cart before login

### Low Priority (Polish/Future)

1. Blog pages and CMS integration
2. Coupon system
3. Notification center backed by API
4. Password reset and email verification flows
5. Payment gateway integration (Stripe, etc.)
6. Wallet feature (requires schema design)
7. Telegram bot, SMS integrations (per `PROJECT_CONTEXT.md`)
8. E2E and unit tests (none exist currently)
9. Performance: caching, image CDN, full-text search

---

## 9. Critical Gaps

### Blocking Production Deployment

- No frontend–backend integration
- Global JWT guard blocks public catalog access without `@Public()` fixes
- Default JWT secret in configuration
- No HTTPS/production environment configuration documented
- No automated tests (0 test files found)
- No CI/CD pipeline evident
- Admin routes unprotected on frontend and backend

### Required for MVP

- API client + auth session on frontend
- Public product/category browsing without login
- Functional cart (add, update quantity, remove)
- Checkout creating real orders with inventory checks
- Basic admin product CRUD connected to API
- RBAC for admin operations
- Environment variable documentation (`.env.example` not present)

### Required for Full Feature Set

- Payment processing
- Coupon system
- Email notifications (verification, order confirmation, password reset)
- Review moderation
- Analytics backend
- Wallet/balance system
- Third-party integrations (Telegram, SMS, payment gateway)
- Comprehensive test coverage
- Production monitoring and logging

---

## 10. Recommendations

### Immediate Actions

1. Add `@Public()` decorator to all read-only catalog and health endpoints
2. Fix `ProductsController` route order (`slug/:slug` before `:id`)
3. Create `frontend/lib/api/client.ts` and `NEXT_PUBLIC_API_URL` env variable
4. Add `.env.example` files for both frontend and backend
5. Include user roles in JWT payload at token generation time
6. Register and apply `RolesGuard` for admin-only routes

### Architecture Improvements

1. Introduce a shared types package or OpenAPI-generated client for data contract alignment
2. Add React Query or SWR for server state on the frontend
3. Split admin into a route group with middleware-based auth check
4. Create dedicated admin controller module rather than overloading user/product endpoints
5. Consolidate duplicate mock data files before API migration

### Performance Optimizations

1. Server-side product fetching with pagination in catalog page
2. Next.js `Image` component with real product image URLs
3. PostgreSQL full-text search or dedicated search service
4. Redis caching for catalog reads

### Security Enhancements

1. Remove default JWT secret fallback in production
2. Add rate limiting on auth endpoints
3. Restrict `GET /users` to ADMIN role
4. Remove or protect public `POST /users` (duplicate of register)
5. Add input sanitization review on review/order creation DTOs
6. Implement CSRF-safe cookie strategy if moving to cookie-based auth

---

## Appendix: Endpoint Inventory

### Implemented Backend Endpoints (47 total)

| Module | Method | Path | Auth |
|--------|--------|------|------|
| Health | GET | `/health` | Should be public (currently blocked) |
| Health | GET | `/health/ready` | Should be public (currently blocked) |
| Auth | POST | `/auth/register` | Public |
| Auth | POST | `/auth/login` | Public |
| Auth | POST | `/auth/refresh` | Public |
| Auth | POST | `/auth/logout` | Required |
| Auth | POST | `/auth/change-password` | Required |
| Auth | GET | `/auth/me` | Required |
| Users | POST | `/users` | Public |
| Users | GET | `/users` | Required |
| Users | GET | `/users/profile/me` | Required |
| Users | GET | `/users/preferences/me` | Required |
| Users | PUT | `/users/preferences/me` | Required |
| Users | GET | `/users/addresses/me` | Required |
| Users | POST | `/users/addresses` | Required |
| Users | GET | `/users/addresses/:id` | Required |
| Users | PUT | `/users/addresses/:id` | Required |
| Users | DELETE | `/users/addresses/:id` | Required |
| Users | PUT | `/users/addresses/:id/default` | Required |
| Users | GET | `/users/:id` | Required |
| Users | PUT | `/users/:id` | Required |
| Users | DELETE | `/users/:id` | Required |
| Products | POST | `/products` | Required |
| Products | GET | `/products` | Should be public (currently blocked) |
| Products | GET | `/products/search` | Should be public (currently blocked) |
| Products | GET | `/products/:id` | Should be public (currently blocked) |
| Products | GET | `/products/slug/:slug` | Unreachable route bug |
| Products | PUT | `/products/:id` | Required |
| Products | DELETE | `/products/:id` | Required |
| Categories | GET | `/categories` | Should be public (currently blocked) |
| Categories | GET | `/categories/:id` | Should be public (currently blocked) |
| Brands | GET | `/brands` | Should be public (currently blocked) |
| Brands | GET | `/brands/:id` | Should be public (currently blocked) |
| Cart | GET | `/cart` | Required |
| Cart | POST | `/cart/items` | Required |
| Cart | DELETE | `/cart/items/:productId` | Required |
| Cart | DELETE | `/cart` | Required |
| Wishlist | GET | `/wishlist` | Required |
| Wishlist | POST | `/wishlist/items/:productId` | Required |
| Wishlist | DELETE | `/wishlist/items/:productId` | Required |
| Orders | GET | `/orders` | Required |
| Orders | GET | `/orders/:id` | Required |
| Orders | POST | `/orders` | Required |
| Reviews | GET | `/reviews/product/:productId` | Should be public (currently blocked) |
| Reviews | POST | `/reviews` | Required |
| Reviews | GET | `/reviews/user/my-reviews` | Required |

---

*End of report.*
