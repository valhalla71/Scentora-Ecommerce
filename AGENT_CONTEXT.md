# Scentora Agent Context

## Project

Scentora is a portfolio-grade perfume e-commerce platform.

---

# Business Identity

Scentora is a luxury perfume ecommerce platform.

Future decisions must consider:

- Premium shopping experience
- Perfume discovery
- Recommendation systems
- Customer personalization
- Product storytelling
- Brand presentation

Avoid building a generic ecommerce system.

---

# Technology Stack

## Frontend

- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn/ui


## Backend

- NestJS
- TypeScript
- Prisma ORM


## Database

- PostgreSQL
- Prisma schema created

---

# Current Active Phase

Current development phase:

## Luxury UI Upgrade — Phase 1 (Design System Foundation) — VERIFIED COMPLETE

Objective:

- Establish reusable luxury design tokens and refine shared primitives only.
- Preserve all completed API integration, routing, and page structure.
- No homepage redesign; no new pages; no business-logic changes.

Completed in this phase:

✅ Luxury display serif (`Cormorant Garamond`) wired to the existing but
  previously-unused `--font-heading` token for LTR headings; RTL headings keep
  Vazirmatn (no reliable luxury Persian serif without added risk)
✅ Added reusable soft "luxury" shadow scale (`shadow-luxury-sm/md/lg`,
  warm-tinted, dark-mode aware) and a shared `ease-luxury` easing curve
✅ Added `tracking-luxury` letter-spacing token and an `eyebrow` typography
  variant (uppercase small-caps kicker label, a common luxury editorial
  pattern) to `lib/design-system/typography.ts`
✅ Base `--radius` nudged 8px → 10px for a slightly softer, more premium
  curvature; cascades consistently through the existing radius scale
✅ Refined `Button`, `Card` (elevated variant), and `Input` primitives to use
  the new shadow/easing tokens — variant/size APIs unchanged, no breaking
  changes for existing callers
✅ Extracted a new reusable `ProductCard` primitive
  (`components/ui/product-card.tsx`) from duplicated markup previously
  inlined in the homepage showcase and related-products sections; adopted in
  both without changing their visual output or behavior
✅ Refined header navigation (logo wordmark now uses the heading font; nav
  link/logo hover transitions use the shared luxury easing)
✅ Added a minimal, reduced-motion-aware `.hover-lift` utility for the one
  reusable transform+shadow hover pattern (used by `ProductCard` and the
  `Card` "elevated" variant)

Explicitly not done in this phase (by design):

- Homepage layout/content redesign
- Catalog listing card (`catalog-content.tsx`) was left untouched — it owns
  live cart actions and is considered integration-sensitive; it still
  benefits from the global token changes (radius, shadow, easing) with zero
  code changes
- Color palette was reviewed but not changed; the existing espresso/champagne
  gold/ivory palette was already luxury-oriented from a prior phase

Build verification status: FINAL — Luxury UI Phase 1 verified complete.

✅ `npx tsc --noEmit` — passed with zero errors. Luxury UI Phase 1 introduced
  no TypeScript regressions.
⚠️ `npm run lint` — ESLint surfaced pre-existing issues elsewhere in the
  frontend, unrelated to Luxury UI Phase 1. Per explicit instruction, these
  were NOT fixed as part of this phase and Phase 1 files were NOT modified.
  They remain open, pre-existing technical debt for a separate, dedicated
  cleanup task.
✅ `npm run build` — passed.

Luxury UI Phase 1 files are unchanged since their original implementation.

Status: Luxury UI Phase 1 is verified and complete. Ready to begin Luxury UI
Upgrade — Phase 2: Homepage Transformation.

## Luxury UI Upgrade — Phase 2 (Homepage Transformation) — VERIFIED COMPLETE

Objective:

- Transform the homepage into a premium luxury perfume brand experience by
  adding storytelling and discovery sections and reordering existing sections.
- Reuse Phase 1 design tokens/primitives only; no new design-system tokens.
- No backend, API contract, or Prisma changes.

New homepage flow: Hero → Brand Story → Discovery (Fragrance Families) →
Featured Collections → Features ("Why Scentora") → Testimonials → CTA.

Completed in this phase:

✅ New `BrandStorySection` (server component) — philosophy/storytelling copy
  in a two-column layout with a pull-quote card (`Card` "elevated" variant)
✅ New `DiscoverySection` (client component) — fragrance-family tiles driven
  by live categories from `useCommerce()`; skeleton state while loading,
  renders nothing on error/empty so a failed fetch never breaks the homepage
✅ Discovery tiles link to `/catalog?category=<slug>` (not name) for stable,
  SEO-friendly, localization-safe URLs
✅ `catalog-content.tsx` updated to resolve an incoming `category` query
  value against loaded categories by slug OR name, then filter by the
  resolved category name — the only change to this previously "integration-
  sensitive" file, and it does not touch cart logic or API calls
✅ Hero section restructured to a two-column layout on `lg+` (copy left,
  reserved empty visual slot right) for a future 3D/interactive perfume
  visualization; single-column on mobile/tablet, CTA/text alignment now
  responsive (centered on mobile, start-aligned on `lg+`)
✅ `ProductShowcase` ("Featured Collections") gained an eyebrow label for
  visual consistency with the other new sections; no other changes
✅ Added `brandStory` and `discovery` to `HomeDictionary`; added `showcase.eyebrow`;
  translated for both `en` and `fa`

Explicitly not done in this phase (by design):

- No new imagery/assets; category tiles use a dark-gradient overlay so text
  stays legible whether or not a category has a real image
- No changes to product data fetching, cart, auth, or any non-homepage route
  beyond the `catalog-content.tsx` slug-resolution addition
- Testimonials, Features, and CTA sections were only reordered, not redesigned

Build verification status: FINAL — Luxury UI Phase 2 verified complete.

✅ `npx tsc --noEmit` — passed with zero errors.
✅ `npm run build` — passed. `✓ Compiled successfully`, all 44 pages generated.
⚠️ Middleware-to-proxy deprecation warning remains — pre-existing, unrelated
  to Phase 2, tracked as separate maintenance item.

Files changed/created:

- New: `frontend/components/home/brand-story-section.tsx`,
  `frontend/components/home/discovery-section.tsx`
- Changed: `frontend/app/[locale]/(routes)/page.tsx`,
  `frontend/components/home/hero-section.tsx`,
  `frontend/components/home/product-showcase.tsx`,
  `frontend/components/home/index.ts`,
  `frontend/app/[locale]/(routes)/catalog/catalog-content.tsx`,
  `frontend/i18n/types.ts`,
  `frontend/i18n/dictionaries/en/home.json`,
  `frontend/i18n/dictionaries/fa/home.json`

Next recommended UI phase: Luxury UI Upgrade — Phase 3. Candidates: catalog
grid card polish (`catalog-content.tsx` product cards still use the pre-Phase-1
inline markup, not the shared `ProductCard`), product detail page, and cart/
checkout visual polish.

## Luxury UI Upgrade — Phase 3 (Luxury Product Experience) — VERIFIED COMPLETE

Objective:

- Upgrade the product detail page into a premium purchase experience,
  reusing Phase 1/2 tokens and primitives only.
- No backend, API contract, or Prisma changes.

Completed in this phase:

✅ Product detail experience upgraded (`app/[locale]/(routes)/catalog/[id]/page.tsx`)
✅ Product gallery/image support implemented (`components/product/product-gallery.tsx`)
  — main image + thumbnail strip, with a reserved `data-slot` hook for a
  future 3D/AR visualization
✅ Fragrance storytelling section added — product description presented as a
  pull-quote plus a curated/crafted/concierge positioning strip
✅ Purchase experience polished (`components/product/purchase-actions.tsx`)
  — quantity stepper, add-to-cart, wishlist toggle, share action
✅ Related products experience improved — now uses the shared `ProductCard`
  primitive (from Phase 1) instead of separate inline markup

Build verification status: FINAL — Luxury UI Phase 3 verified complete.

✅ `npx tsc --noEmit` — passed.
✅ `npm run build` — passed.
⚠️ Middleware-to-proxy deprecation warning remains — pre-existing, unrelated
  to Phase 3, non-blocking maintenance item.

Next recommended phase: Final Commerce Polish — catalog experience, product
cards (align `catalog-content.tsx` grid cards with the shared `ProductCard`),
cart, and checkout visual polish.

## Product Visual Assets Integration — COMPLETE

Product visual assets integration completed.

Objective:

- Connect luxury product visuals to the existing product system. No backend,
  API contract, or Prisma changes; no refactor of existing commerce UI.

Completed:

✅ Added six luxury visual assets under `frontend/public/images/products/`:
  `oriental.webp`, `fresh.webp`, `floral.webp`, `amber.webp`, `woody.webp`
  (one per fragrance family used by the mock catalog), and `placeholder.webp`
  (neutral fallback)
✅ New `frontend/lib/product-images.ts` helper — `resolveCategoryImage`
  (fragrance-family visual or placeholder) and `resolveProductImage` (prefers
  a real product image, falls back to the category visual, then the
  placeholder; never returns empty)
✅ `frontend/lib/products.ts` — every mock product now resolves an `image`
  via `resolveProductImage` instead of leaving the field unset
✅ `frontend/components/ui/product-card.tsx` — always renders a resolved
  image (real photo → category visual → placeholder) instead of a blank
  muted tile when no `image` prop is supplied
✅ `frontend/app/[locale]/(routes)/catalog/catalog-content.tsx` — grid card
  image block now uses the same resolver/fallback instead of a blank tile
✅ `frontend/components/product/product-gallery.tsx` verified unchanged and
  working — now reliably receives a resolved image from the mock catalog

Explicitly not done (by design):

- No backend, API contract, or Prisma changes
- `frontend/lib/api/commerce.ts` (backend mapper) untouched — real backend
  product images pass through unchanged; `ProductCard`'s own fallback
  covers backend products with no image without needing a mapper change
- `frontend/components/home/product-showcase.tsx` untouched — it already
  passes `category` to `ProductCard`, so it now gets a fallback visual for
  free through the card's internal resolver

Build verification status: FINAL — verified complete.

✅ `npx tsc --noEmit` — passed with zero errors.
✅ `npm run build` — passed, all 44 pages generated.

## Frontend Commerce Flow API Integration


Objective:

- Connect the frozen frontend incrementally to verified backend v1 contracts
- Preserve completed UI and existing mock data during migration
- Operate products, categories, authentication, cart, and profile against backend v1


Completed in this phase:

✅ Shipping module completed and verified  
✅ Order fulfillment flow verified  
✅ Order lifecycle & status transitions implemented  
✅ Payment-Order integration verified  
✅ Commerce security review completed  
✅ Runtime verification completed  
✅ Critical production issues fixed  
✅ High-risk production issues fixed  
✅ API consistency improvements completed  
✅ Backend v1 final verification completed  
✅ Isolated end-to-end customer journey runtime verified
✅ Frontend products/categories/auth/cart/profile integration completed


Important:

Do not rewrite completed modules.

Extend existing architecture only.

Preserve:

- Domain boundaries
- Existing APIs
- Database integrity
- Current business logic


Do NOT start:

- Broad business API integration
- UI redesigns
- New domains
- Architecture rewrite


---

# Priority Order

When making technical decisions follow this order:

1. Security
2. Stability
3. Backward compatibility
4. Existing architecture preservation
5. Code quality
6. New features


---

# Frontend Status

## Current State

Frontend UI implementation is completed and audited.

The UI layer is considered stable and frozen.

Important:

The first frontend business integration slice is complete. Catalog listing and
detail, categories, authentication/session surfaces, cart, and current-user
profile now use verified backend v1 contracts.

Current reality:

- UI completed
- UI audited
- UI frozen
- Unrelated orders, addresses, admin, wishlist, reviews, and content mocks retained
- Typed API client, explicit envelope contracts/mappers, and React commerce state available
- Remaining business domains pending incremental integration

Final frontend integration review (2026-07-19):

- Verified the frontend contracts against the auth, users, products, categories,
  and cart controllers/services/DTOs plus the global response interceptor.
- Fixed session cleanup after failed refresh, shared refresh work across all
  callers, stale refresh/login races, and logout revocation when the access
  token has expired.
- Cart mutations are serialized to prevent stale GET-after-mutation races.
- Account and profile now use an optimistic client gate while session state is
  restored. This hides and redirects unauthenticated UI, but it is not
  server-side route enforcement because `sessionStorage` is unavailable to the
  server. Protected backend data remains secured by JWT guards.
- Catalog category query links now initialize the category filter, localized
  detail breadcrumbs stay in-locale, mapped backend images are rendered, and
  zero-stock detail state is accurate.
- Cart mapping now matches the backend's intentionally shallow product include:
  category/image/inventory are not present in `GET /cart`, so the frontend no
  longer invents an "Uncategorized" label.


## Frontend Rules

Do not:

- recreate pages
- redesign components
- replace architecture
- create duplicate components
- modify completed UI flows


Allowed frontend changes in future:

- API integration
- Backend connection
- Required bug fixes only


During frontend integration:

Only modify API/data boundaries and UI code strictly required to connect an
approved flow. Preserve the current design system and page structure.

## Luxury UI Foundation (Phase 1)

Design direction: premium perfume-house — elegant, timeless, warm (espresso /
champagne gold / ivory), a serif display face for headings only, and very
restrained motion (one easing curve, one hover-lift pattern).

Files changed:

- `frontend/lib/fonts.ts` — added `Cormorant_Garamond` (LTR heading serif)
- `frontend/app/globals.css` — `--font-heading-active` per `[dir]`; added
  `--shadow-luxury-sm/md/lg` (light + dark), `--ease-luxury`,
  `--tracking-luxury`; bumped `--radius` 0.5rem → 0.625rem; added `.hover-lift`
  reduced-motion-aware utility
- `frontend/lib/design-system/tokens.ts` — added `motion.easing.luxury` and a
  `shadow.luxury` export for the rare inline-style case
- `frontend/lib/design-system/typography.ts` — headings now use `font-heading`;
  added an `eyebrow` (uppercase kicker) variant
- `frontend/lib/design-system/index.ts` — exported the new `shadow` token
- `frontend/components/ui/button.tsx` — default variant gets a soft luxury
  shadow that deepens on hover; shared easing curve
- `frontend/components/ui/card.tsx` — "elevated" variant uses the luxury
  shadow scale + `.hover-lift`
- `frontend/components/ui/input.tsx` — shared easing curve on focus/hover
  transitions
- `frontend/components/ui/product-card.tsx` — new reusable product card
  primitive (image, eyebrow category, heading-font title, price/rating)
- `frontend/components/ui/index.ts` — exported `ProductCard`
- `frontend/components/home/product-showcase.tsx` — now renders `ProductCard`
  instead of inlined duplicate markup (same visual output)
- `frontend/components/product/related-products.tsx` — same deduplication,
  now also passes `image`/`rating` since this card is a real link
- `frontend/components/layout/header.tsx` — wordmark uses the heading font;
  nav/logo hover use the shared luxury easing

Deliberately untouched: `catalog-content.tsx` (live cart integration), color
palette, spacing scale, container widths, all page content/copy, all routes.

Verification status: FINAL. `npx tsc --noEmit` passed with zero errors. `npm
run lint` surfaced pre-existing issues unrelated to Phase 1 (left unfixed by
explicit instruction; Phase 1 files unmodified). `npm run build` passed.

Next recommended UI phase: Luxury UI Upgrade — Phase 2 (Homepage
Transformation) — apply the foundation to the homepage hero/sections and the
catalog grid card. Phase 1 is verified and ready.

## Frontend Integration Foundation

Implemented in `frontend/lib/api/`:

- `config.ts`: `NEXT_PUBLIC_API_BASE_URL` with the repository-supported local
  default `http://localhost:3001/api/v1`
- `client.ts`: typed requests, Bearer auth, JSON/no-content handling, and a
  concurrency-safe single refresh attempt
- `error.ts`: normalized status/code/message/details without retaining raw
  responses, headers, or request secrets
- `auth.ts`: envelope-aware login/register/refresh/logout plus memory and isolated
  session-scoped token stores; logout always clears local state
- `contracts.ts`: explicit global response envelope and unwrapping
- `commerce.ts`: product/category/cart contracts and backend-to-view-model mappers
- `users.ts`: protected `/users/profile/me` profile contract
- `index.ts`: public exports and reusable foundation factory

Commerce integration files:

- `frontend/components/providers/commerce-provider.tsx`
- `frontend/components/providers/app-providers.tsx`
- `frontend/components/auth/auth-form.tsx`
- `frontend/components/layout/header.tsx`
- `frontend/components/cart/add-to-cart-button.tsx`
- `frontend/components/account/profile-identity.tsx`
- `frontend/app/[locale]/(routes)/catalog/page.tsx`
- `frontend/app/[locale]/(routes)/catalog/catalog-content.tsx`
- `frontend/app/[locale]/(routes)/catalog/[id]/page.tsx`
- `frontend/app/[locale]/(routes)/catalog/[id]/loading.tsx`
- `frontend/app/[locale]/(routes)/cart/page.tsx`
- `frontend/app/[locale]/(routes)/cart/cart-content.tsx`
- `frontend/app/[locale]/(routes)/profile/page.tsx`
- `frontend/app/[locale]/(routes)/account/page.tsx`
- `frontend/lib/products.ts`
- `frontend/lib/cart.ts`

Latest frontend stabilization files:

- `frontend/lib/products.ts`
- `frontend/components/catalog/product-sort.tsx`
- `frontend/components/checkout/checkout-form.tsx`
- `frontend/components/system/index.ts`
- `frontend/components/ui/index.ts`
- `frontend/app/[locale]/(routes)/not-found.tsx`
- `AGENT_CONTEXT.md`
- `.project-memory/AI_CONTEXT.md`

Frontend validation baseline:

- `npx tsc --noEmit` passes.
- `npm run build` passes and generates all 44 static pages.
- Focused ESLint on all reviewed integration TypeScript files passes with zero
  errors or warnings.
- `git diff --check` passes with expected LF-to-CRLF notices.
- Public runtime product checks were attempted, but localhost:3001 was
  unavailable; contracts were verified statically against controllers,
  services, DTOs, the Prisma schema, and the response interceptor.
- No frontend build blockers remain. The build still reports the existing
  Next.js `middleware`-to-`proxy` deprecation warning.

Stabilization contract decision:

- The current catalog still uses a retained mock `Product` view model, so
  `stock: number` was added to that mock contract and its fixtures.
- The backend Product API remains unchanged: stock is
  `data.inventory.quantity` inside the global response envelope, not a direct
  Product entity field. A future API mapper must translate that nested value
  into the catalog view model.
- Additional compiler blockers were fixed without redesign: Base UI menu
  trigger composition, boolean checkout error flags, stale barrel exports, and
  the prop-free Next.js `not-found` convention.
- Next recommended phase: resume incremental frontend API integration, starting
  with an explicit backend Product response-to-catalog view-model mapper.

Token limitation: the backend returns access and opaque refresh tokens in JSON.
The connected UI isolates them behind `AuthSessionStore` and uses
`sessionStorage` so refresh survives page reload only within the tab/session.
This remains JavaScript-readable and therefore exposed to XSS; it is not a
production-equivalent replacement for an HttpOnly-cookie/BFF contract. The API
client shares concurrent refresh work, retries once, never recursively
refreshes, and clears React user/cart state when recovery fails. Logout refreshes
an expired access token when needed so it can revoke the current refresh token,
then always clears local state.

Cart limitation: backend supports get, additive POST, remove, and clear, but no
exact quantity update. The UI safely supports increment and remove; decrement
is disabled and no remove/re-add emulation is used.

Meaningful mock/data-simulation locations retained:

- Catalog and product data: `lib/products.ts`, `lib/catalog.ts`,
  `components/home/product-showcase.tsx`
- Customer commerce: `lib/cart.ts`, `lib/wishlist.ts`, `lib/orders.ts`,
  `lib/reviews.ts`, `lib/commerce.ts`, `lib/products-advanced.ts`
- Account/admin: `lib/user.ts`, `lib/user-account.ts`, `lib/admin.ts`
- Content/marketing: `lib/blog.ts`
- Simulated submissions: `components/auth/auth-form.tsx`,
  `components/checkout/checkout-form.tsx`, `components/contact/contact-form.tsx`,
  and `components/home/newsletter-section.tsx`

Gradual migration roadmap:

1. Add a backend exact cart quantity-update endpoint before enabling decrement.
2. Adopt an HttpOnly-cookie/BFF token contract for production-grade persistence.
3. Migrate addresses, orders/checkout, wishlist, and reviews incrementally.
4. Connect payment, wallet, and shipping in verified lifecycle order.
5. Connect role-protected admin data after RBAC contracts are confirmed.

Keep each mock until its corresponding API mapping, loading/error behavior, and
runtime flow are verified.

Production/readiness assessment:

- Production blockers remain: JavaScript-readable refresh tokens, no
  server-readable session for authoritative Next.js route enforcement, the
  backend product list/detail contract does not exclude inactive or soft-deleted
  products, simulated gateway processing, and unintegrated checkout/order/
  address flows.
- The product list is capped to the first 100 backend records and exposes only
  `total`; the frozen catalog has no server pagination controls yet.
- The backend cart has no exact quantity update/decrement endpoint and its GET
  response includes a shallow product relation without category/images/
  inventory. Increment and remove are safe; decrement remains disabled.
- Luxury UI Upgrade may begin independently on public/presentational surfaces
  and already integrated loading/error/empty states. It must not be described as
  production launch readiness, and protected/checkout redesign should preserve
  space for the unresolved session and remaining API contracts.


---

# Backend Status

## Current Backend State

Backend foundation exists and is production-oriented.

Foundation:

- NestJS architecture exists
- Prisma configured
- PostgreSQL connected
- Core modules created
- Shared infrastructure exists


Completed commerce domains:

- Cart
- Orders
- Inventory Integration
- Payment
- Wallet
- Shipping


Runtime verification completed:


## Authentication

Verified:

- Register flow
- Login flow
- JWT protection
- Token lifecycle
- Logout handling


## Users

Verified:

- Profile access
- Preferences
- Address management

Security improvement completed:

- Protected user profile access
- Authorization boundaries reviewed


## Products

Verified:

- Product listing
- Search
- Product detail
- Product slug lookup


Fix completed:

- Product slug route ordering issue resolved


## Cart

Verified:

- Cart retrieval
- Add item
- Remove item
- Clear cart


Security and data integrity improvements:

- Product existence validation
- Quantity validation
- Inventory availability validation


## Orders

Verified:

- Order creation
- Order items creation
- Price snapshot
- Ownership validation


Improvements completed:

- Inventory race condition protection
- Transaction safety improvement
- Order status update endpoint
- Status transition validation


## Payment

Verified:

- Gateway payment
- Wallet payment
- Mixed payment


Verified:

- Payment creation
- Payment processing
- Wallet deduction
- Wallet transaction history


Security improvement:

- Sensitive financial information removed from error messages


## Shipping

Verified:

- Shipping creation
- Order relation
- Payment dependency
- Status transitions
- Tracking management
- Delivery completion
- Runtime behavior


Current status:

Production verification completed.


---

# Backend Modules

Existing domains:

- auth
- users
- products
- categories
- brands
- cart
- orders
- inventory
- payment
- wallet
- shipping
- reviews
- wishlist
- health


Infrastructure:

- config module
- prisma service
- common filters
- interceptors
- pipes
- guards
- decorators
- shared utilities


Admin functionality may exist inside existing domains.

Do NOT create a separate Admin module unless current architecture requires it.


---

# Authentication System

Authentication foundation exists.

Verified:

- JWT flow
- Access token generation
- Refresh token mechanism
- Password hashing
- Register endpoint
- Login endpoint
- Protected routes


Do NOT create a new authentication system.

Extend existing implementation only.


---

# Authorization & RBAC

RBAC foundation exists.

Current status:

- Guards implemented
- Roles enforced on protected routes
- Admin routes protected


Required roles:

- ADMIN
- USER
- VENDOR


Requirements:

- Public routes must remain accessible
- User routes require authentication
- Admin/vendor actions require role validation


Do not duplicate authorization systems.


---

# Current Remaining Work

Backend v1 stabilization and final verification are completed.

Remaining tasks:

1. Continue frontend integration with addresses, orders/checkout, wishlist, and reviews
2. Isolated end-to-end customer journey automation
3. Production payment gateway integration
4. Production environment preparation
5. Monitoring and deployment readiness


Known limitations:

- Inventory is deducted at order creation; reservation-based inventory is not implemented
- Gateway payment processing is currently simulated and requires a real provider integration
- The complete customer journey was runtime-verified in a temporary isolated PostgreSQL schema; a persistent automated E2E suite is not yet committed


Backend verification is complete; frontend integration is now proceeding
incrementally.


---

# Backend Development Rules

## Architecture

Must:

- Extend existing NestJS modules
- Preserve domain boundaries
- Reuse existing services
- Reuse existing guards
- Reuse existing decorators


Do not:

- rebuild modules
- create duplicate business logic
- change architecture unnecessarily


---

# Database Rules

Prisma changes require:

- Migration planning
- Relation verification
- Index verification
- Constraint verification
- Data integrity checks


Never modify schema.prisma without checking impact.


---

# API Stability Rules

Preserve existing API structure as much as possible.

Avoid:

- unnecessary endpoint changes
- breaking response changes
- renaming existing contracts


---

# Error Handling Rules

Ensure:

- Exception filters work correctly
- DTO validation exists
- Prisma errors are handled
- No sensitive information is exposed


Current status:

Custom exceptions correctly extend NestJS HttpException.

Global exception filter verified.


---

# Product Domain

Current Product model is generic.

Do not replace Product model.

Future extensions may include:

- Fragrance notes
- Top notes
- Middle notes
- Base notes
- Concentration
- Volume
- Gender
- Season
- Occasion
- Longevity
- Sillage
- Advanced filtering


---

# Domain Completion Rule

A feature is NOT complete because:

- Database model exists
- Prisma schema exists


A domain is complete only when:

- Database models exist
- Business logic exists
- API endpoints exist
- Validation exists
- Verification exists


---

# Build Verification Rule

No domain is complete until:

- npm run build succeeds
- TypeScript errors resolved
- Prisma status verified
- Runtime tested
- APIs verified


Current status:

✅ npm run build successful


---

# Cursor Execution Rules

Before every task:

1. Read this file completely.
2. Inspect existing implementation first.
3. Do not recreate existing modules.
4. Do not modify frontend during backend tasks.
5. Do not create unnecessary files.
6. Do not create duplicate documentation.
7. Prefer fixing existing code over adding new code.
8. Complete current task before starting another.
9. Minimize unnecessary exploration.
10. Ask before major architectural changes.


---

# Implementation Philosophy

Priority:

Security > Stability > Compatibility > Clean code > Features


The goal is a stable production-ready architecture without unnecessary rewrites.


---

# Commerce Domain Progress

Completed backend domains:

- Auth
- Users
- Products
- Categories
- Brands
- Cart
- Orders
- Inventory Integration
- Payment
- Wallet
- Shipping


Verified commerce flow:

Auth
↓
User
↓
Product Discovery
↓
Cart
↓
Create Order
↓
Payment
↓
Shipping
↓
Delivery


---

# Inventory Architecture

Current Inventory Flow:

Inventory decreases during successful order creation transaction.


Current limitation:

Reservation-based inventory flow is not implemented yet.


Future improvement:

Move toward reservation model:

Create Order
↓
Reserve Inventory
↓
Payment Pending
↓
Payment Success
↓
Finalize Stock Deduction


Payment Failed:

Release Reservation


Important:

Do not redesign inventory flow during current stabilization phase.


---

# Current Next Phase

## Frontend API Integration — Next Slice


Goal:

Continue connecting the frozen frontend UI after the completed
products/categories/auth/cart/profile slice.


Recommended parallel verification:

- Add isolated end-to-end coverage for the complete customer journey
- Verify migration history in each target environment before deployment
- Replace simulated gateway processing before production launch


---

---

# Latest Completed Milestone

## Backend Production Readiness + Shipping Schema Alignment Completed

Completed:

✅ Health endpoint verification completed  
✅ Order flow improvements completed  
✅ Payment flow improvements completed  
✅ Shipping service improvements completed  
✅ Shipping database schema aligned with current architecture  
✅ Shipping status lifecycle finalized  
✅ Shipping alignment migration created and local history reconciled  
✅ Prisma schema and live database consistency verified  
✅ npm run build successful  
✅ Lint diagnostics clean  


Shipping Schema Updates:

Added:

- ShippingStatus enum
- Shipping status tracking
- Full shipping address fields:
  - street
  - city
  - state
  - zipCode
  - country
- Estimated delivery date
- Actual delivery date


Removed legacy shipping fields:

- method
- cost
- estimatedDate
- actualDate


Migration:

Created:

20260719094500_align_shipping_with_current_schema


Current verified backend flow:

Auth
↓
User
↓
Product Discovery
↓
Cart
↓
Create Order
↓
Payment
↓
Shipping
↓
Delivery Completion


Current Status:

Backend architecture is stable and production-oriented.

Next phase:

Customer journey verification and frontend integration preparation.

Do not modify completed commerce domains unless required by verification findings.

---

# Final Project Rule

Scentora is a portfolio-grade luxury ecommerce platform.

Future implementation decisions must maintain:

- Premium business identity
- Clean domain architecture
- Production reliability
- Security-first approach
- Incremental development

Avoid shortcuts that reduce long-term quality.