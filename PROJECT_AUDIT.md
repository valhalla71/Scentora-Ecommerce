# Scentora Project Technical Audit & Execution Plan

## Document Purpose

This document is the technical source of truth for Cursor and future development decisions.

Purpose:

- Prevent duplicate implementation
- Prevent unnecessary refactoring
- Preserve existing architecture
- Protect completed work
- Reduce AI token waste
- Avoid conflicting solutions

Cursor MUST read this document before making changes.

---

# Current Project Status

## Overall Completion

Estimated completion: ~50%

| Area | Status |
|---|---|
| Frontend UI | Completed |
| Frontend Architecture | Completed |
| Backend Foundation | Mostly Completed |
| Database Foundation | Mostly Completed |
| Authentication Foundation | Implemented, requires verification |
| API Documentation | Available |
| Frontend Backend Integration | Not Started |
| RBAC Enforcement | Not Completed |
| Admin Capabilities | Not Completed |
| Production Testing | Not Completed |


IMPORTANT:

Completion percentage refers to implementation progress.

It does NOT mean the project is production ready.

---

# Current Development Phase

The current phase is:

# Backend Stabilization & Architecture Repair


The goal of this phase:

- Verify backend architecture
- Fix security issues
- Correct authorization behavior
- Stabilize APIs
- Prepare backend for future integration


During this phase:

DO NOT:

- Start frontend integration
- Add new business features
- Redesign frontend
- Rebuild existing modules


---

# Priority Order

Cursor decisions must follow:

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

Frontend is considered stable from:

- UI perspective
- Component architecture perspective
- Design system perspective


Current reality:

Completed:

- Next.js application
- TypeScript configuration
- Tailwind CSS
- shadcn/ui
- Responsive layouts
- Luxury perfume ecommerce design system
- Persian / English localization
- RTL / LTR support
- Fonts configuration
- Homepage
- Product UI
- Cart UI
- Wishlist UI
- User dashboard UI
- Authentication pages
- Checkout UI


IMPORTANT:

Frontend currently uses mock data.

Frontend backend integration has NOT started.

Do not redesign frontend.

Future frontend changes should mainly be:

- API integration
- Data connection
- Required bug fixes

---

# Backend Status

Backend foundation exists.

Current stack:

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL


Completed foundation:

- NestJS architecture
- Domain based modules
- Prisma configuration
- Database connection
- Swagger documentation
- Shared infrastructure
- Authentication foundation
- User module foundation
- Product module foundation
- Category module foundation
- Brand module foundation
- Cart module foundation
- Wishlist module foundation
- Orders module foundation
- Reviews module foundation
- Inventory foundation


IMPORTANT:

Backend foundation exists but production readiness is not confirmed.

Do not assume:

- Security is complete
- Authorization is complete
- APIs are fully verified
- Commerce logic is complete


---

# Database Status

Database foundation exists.

Completed:

- Prisma schema
- Relations
- Migrations
- Seed system
- Role definitions


Before database changes:

Always verify:

- Existing schema
- Existing migrations
- Existing relations
- Constraints
- Indexes


Never:

- Create duplicate tables
- Create duplicate relations
- Modify schema without migration planning


---

# Authentication Status

Authentication foundation exists.

Verified:

- Register endpoint
- Login endpoint
- JWT generation
- /auth/me


Requires verification:

- JWT guards
- Token lifecycle
- Refresh token behavior
- Logout invalidation
- Route protection
- Error handling


IMPORTANT:

Do not replace current authentication architecture.

Extend existing implementation only.


---

# Authorization & RBAC Status

Current issue:

Roles and permissions exist but enforcement requires verification.


Required:

Roles:

- USER
- ADMIN
- VENDOR


Must verify:

- Roles decorator
- Roles guard
- JWT guard integration
- Protected routes
- Admin permissions
- Vendor permissions


Expected behavior:


Guest:

Can:

- Browse products
- Browse categories
- Browse brands


Cannot:

- Access user resources
- Modify data


User:

Can:

- Cart
- Wishlist
- Orders
- Reviews


Cannot:

- Manage products
- Manage users


Admin:

Can:

- Manage products
- Manage users
- Manage orders
- Manage inventory


Vendor:

Only vendor-approved permissions.


---

# Current Critical Problems

## 1. Backend Authorization Stabilization

Priority: VERY HIGH


Missing or requiring verification:

- Route protection
- RBAC enforcement
- Public route configuration
- Admin protection


---

## 2. API Consistency

Current issue:

Frontend and backend data structures are not synchronized.


Before integration:

Review:

- DTOs
- Response formats
- Error formats
- Data contracts


Do not randomly change existing API responses.


---

## 3. Error Handling Review

Review:

- Exception filters
- Validation pipes
- DTO validation
- Prisma errors


Requirements:

- Clean validation responses
- No sensitive database information exposure


---

## 4. Frontend Backend Integration

Priority:

AFTER backend stabilization


Current state:

Frontend uses mock data.

Future requirements:

- API client layer
- Authentication state
- Token handling
- Real product data
- Cart synchronization
- Wishlist synchronization


Do not start until backend stabilization is completed.


---

# Admin Capabilities

Admin functionality is incomplete.

Required future capabilities:

- Product management
- User management
- Order management
- Inventory management
- Analytics foundation


IMPORTANT:

Do not create a separate Admin module unless existing architecture requires it.

Prefer extending existing domains.


---

# Development Roadmap


## Phase 1 — Backend Stabilization (CURRENT)

Tasks:

- Audit backend modules
- Verify authentication
- Fix authorization issues
- Implement proper RBAC enforcement
- Verify public/protected routes
- Review API consistency
- Review error handling
- Review database safety
- Run backend tests


No feature development.


---

## Phase 2 — Frontend Backend Integration

After stabilization:


Create:

- API client layer
- Authentication integration
- Token handling
- User session management


Connect gradually:

- Authentication
- Products
- Categories
- Cart
- Wishlist


---

## Phase 3 — Ecommerce Completion

Complete:

- Product discovery
- Cart logic
- Inventory validation
- Reviews
- Orders
- Checkout


---

## Phase 4 — Admin System

Implement:

- Admin APIs
- Management tools
- Dashboard functionality


---

# Forbidden Changes

Cursor MUST NOT:

- Rewrite frontend architecture
- Replace Next.js structure
- Replace NestJS architecture
- Replace Prisma
- Create duplicate modules
- Create duplicate components
- Create unnecessary abstractions
- Remove working features
- Modify database relations without planning
- Add unnecessary dependencies


---

# Development Rules

Before any task:

1. Read this document.
2. Read AGENT_CONTEXT.md.
3. Inspect existing implementation.
4. Confirm feature does not already exist.
5. Modify only required files.
6. Preserve backward compatibility.


---

# Completion Criteria

A task is complete only when:

- Code builds successfully
- TypeScript errors resolved
- Existing features still work
- Security requirements satisfied
- API behavior verified
- Documentation updated when necessary


---

# Current Recommended Next Task

The next task is:

## Backend Stabilization & Architecture Repair


Required outputs:

- BACKEND_STABILIZATION_REPORT.md
- API_RESPONSE_STANDARD.md
- DATABASE_REVIEW.md


Only after successful stabilization:

Proceed to frontend backend integration.