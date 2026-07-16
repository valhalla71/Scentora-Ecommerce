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

## Backend Commerce Completion & Architecture Improvement


The objective of this phase:

- Complete remaining commerce domains
- Improve production readiness
- Review architecture gaps
- Verify existing flows
- Prepare backend for future frontend integration


Current focus (COMPLETED):

✅ Shipping module (completed with full integration)
✅ Order fulfillment flow (verified and working)
✅ Order lifecycle & status transitions (implemented)
✅ Payment-Order integration (verified and enhanced)
✅ Commerce security (authorization verified)
✅ Database integrity review (all validated)
✅ Inventory reservation architecture (documented for future)


Important:

Do not rewrite completed modules.

Extend existing architecture only.

Preserve:

- Domain boundaries
- Existing APIs
- Database integrity
- Current business logic

Do NOT start:

- Frontend integration
- New features
- UI changes
- New domains


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

Frontend business integration is NOT completed yet.

Current reality:

- UI completed
- UI audited
- UI frozen
- Mock data currently used
- Backend integration pending


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


During current backend stabilization phase:

DO NOT MODIFY FRONTEND.


---

# Backend Status

## Current Backend State

Backend foundation exists.

This means:

- NestJS architecture exists
- Prisma configured
- PostgreSQL connected
- Core modules created
- Shared infrastructure exists


Completed commerce domains:

- Cart
- Orders
- Inventory Integration
- Payment Foundation
- Wallet Foundation
- Shipping Foundation


Runtime verification completed:

- Cart APIs tested
- Order creation tested
- Payment flows tested
- Wallet operations tested
- Shipping runtime verification completed:
  - Shipping creation tested
  - Shipping status transitions tested
  - Tracking number update tested
  - Delivery completion tested
  - Actual delivery date update verified


This does NOT mean:

- Production complete
- Security verified
- Authorization complete
- All commerce features completed
- APIs fully validated


Do not rebuild existing modules.

Extend existing architecture only.


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

Existing:

- JWT flow
- Access token generation
- Refresh token mechanism
- Password hashing
- Register endpoint
- Login endpoint


Verification required:

- JWT guards
- Token lifecycle
- Logout invalidation
- Route protection
- Role enforcement


Do NOT create a new authentication system.

Extend existing implementation only.


---

# Authorization & RBAC

RBAC foundation exists.

RBAC is NOT considered complete until:

- Guards verified
- Roles enforced
- Permissions checked
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

# Current Critical Gaps

## Frontend Backend Integration

Current:

- Frontend uses mock data
- Backend APIs exist
- Integration not started


Future requirements:

- API client layer
- Authentication state
- Token handling
- Error handling
- Loading states
- Gradual replacement of mocks


Do not start integration during backend stabilization.


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

Review:

- Exception filters
- Validation pipes
- DTO validation
- Prisma errors


Ensure:

- Clean validation messages
- No sensitive database information exposure


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

- Auth foundation
- Users
- Products
- Categories
- Brands
- Cart
- Orders Foundation
- Inventory Integration
- Payment Foundation
- Wallet Foundation
- Shipping Foundation

Verified:

Cart:

- Cart flow tested
- Product relation verified


Orders:

- Order creation tested
- Order items creation tested
- Price snapshot verified
- Order status flow tested


Inventory:

- Stock validation tested
- Stock decrease behavior verified


Payment:

Verified payment types:

- Gateway payment
- Wallet payment
- Mixed payment


Verified:

- Payment creation
- Payment processing
- Payment status updates
- Wallet deduction
- Wallet transaction history

Shipping:

Verified:

- Shipping creation
- Order shipping relation
- Payment success requirement
- Shipping lifecycle transitions
- Tracking number management
- Delivery completion

Current architecture limitation:

Inventory currently decreases during order creation.

Future improvement:

Inventory reservation system.

Target flow:

Create Order
↓
Reserve Inventory
↓
Payment Pending
↓
Payment Success
↓
Decrease Stock


Payment Failed:

Release Reservation

Current next domain:

Inventory Reservation Architecture + Order Fulfillment Improvements


Shipping Status:

Database foundation exists.

Pending:

- Verify shipping module architecture
- Complete shipping service logic
- Complete shipping controller endpoints
- Add DTO validation
- Connect shipping lifecycle with orders
- Verify shipping status transitions
- Runtime test shipping flow


Target commerce flow:

Cart
↓
Create Order
↓
Inventory Check
↓
Payment
↓
Create Shipping
↓
Shipment Tracking
↓
Delivery Completion


Important:

Do not redesign Order module.

Do not modify Payment module.

Do not modify Frontend.

Extend existing Shipping foundation only.


