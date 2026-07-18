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

## Backend API Verification & Production Readiness


Objective:

- Verify existing backend flows
- Fix production blockers
- Improve API consistency
- Validate security boundaries
- Prepare backend for frontend integration


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
- UI changes
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


During backend stabilization phase:

DO NOT MODIFY FRONTEND.


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

Backend stabilization is completed.

Remaining tasks:

1. API integration testing
2. Complete customer journey verification
3. Production environment preparation
4. Monitoring and deployment readiness


Frontend integration starts only after backend verification completion.


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

## API Integration Testing


Goal:

Verify complete customer journey:


Register

↓

Login

↓

Get Profile

↓

Browse Products

↓

Add Cart Item

↓

Create Order

↓

Create Payment

↓

Process Payment

↓

Create Shipping

↓

Complete Delivery


After successful verification:

Prepare backend for frontend integration.


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