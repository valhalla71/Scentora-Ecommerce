# Scentora Agent Context

## Project

Scentora is a portfolio-grade perfume e-commerce platform.


# Business Identity

Scentora is a luxury perfume ecommerce platform.

Future decisions should consider:

- Premium shopping experience
- Perfume discovery
- Recommendation systems
- Customer personalization
- Product storytelling
- Brand presentation

Avoid building a generic ecommerce system.

## Stack
Frontend:
- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend:
- NestJS
- TypeScript
- Prisma ORM

Database:
- PostgreSQL
- Prisma schema created

## Completed

✅ Git repository initialized and connected to GitHub

✅ Next.js frontend created

✅ TypeScript configured

✅ Persian/English i18n architecture completed

✅ RTL/LTR support completed

✅ Fonts configured:
- Geist for English
- Vazirmatn for Persian

✅ Scentora luxury theme tokens created

✅ Container component created

✅ Header component created

✅ Footer component created

✅ SiteShell component created

✅ SiteShell connected to locale layout

✅ Homepage hero section created

✅ Homepage features section created

✅ Homepage product showcase section created

✅ Homepage testimonials section created

✅ Homepage CTA section created

✅ Catalog page created

✅ Product detail page created

✅ Shopping cart page created

✅ Authentication pages created

✅ User profile page created

✅ Wishlist page created

✅ Header authentication links integrated

✅ User account area created

✅ Shopping experience flow created

✅ Product discovery experience created

✅ Customer experience domain created

✅ Store management domain created

✅ Complete customer platform experience created

✅ Frontend production polish completed

✅ Frontend audit and freeze completed

## Current Stage

Full-stack development phase.

Frontend:
- Completed
- Audited
- Frozen

Backend:
- Foundation completed
- Feature development in progress

## Current State

Completed:
- frontend/components/layout/container.tsx
- frontend/components/layout/header.tsx
- frontend/components/layout/footer.tsx
- frontend/components/layout/site-shell.tsx
- frontend/app/[locale]/layout.tsx uses SiteShell
- frontend/components/home/hero-section.tsx
- frontend/components/home/product-showcase.tsx
- frontend/components/home/testimonials-section.tsx
- frontend/components/home/cta-section.tsx
- frontend/app/[locale]/(routes)/page.tsx uses HeroSection, FeaturesSection, ProductShowcase, TestimonialsSection, and CTASection
- frontend/app/[locale]/(routes)/catalog/
- frontend/app/[locale]/(routes)/catalog/[id]/
- frontend/lib/products.ts
- frontend/app/[locale]/(routes)/cart/
- frontend/lib/cart.ts
- frontend/app/[locale]/(routes)/login/
- frontend/app/[locale]/(routes)/register/
- frontend/components/auth/
- frontend/app/[locale]/(routes)/profile/
- frontend/lib/user.ts
- frontend/app/[locale]/(routes)/wishlist/
- frontend/lib/wishlist.ts
- frontend/components/layout/header.tsx updated
- frontend/app/[locale]/(routes)/account/
- frontend/lib/orders.ts
- frontend/app/[locale]/(routes)/checkout/
- frontend/app/[locale]/(routes)/order-success/
- frontend/components/checkout/
- frontend/app/[locale]/(routes)/catalog/catalog-content.tsx
- frontend/components/catalog/
- frontend/lib/catalog.ts
- frontend/app/[locale]/(routes)/about/
- frontend/app/[locale]/(routes)/contact/
- frontend/components/contact/
- frontend/components/home/newsletter-section.tsx
- frontend/components/home/recently-viewed.tsx
- frontend/components/home/recommendations.tsx
- frontend/components/product/
- frontend/lib/reviews.ts
- frontend/app/[locale]/(routes)/admin/
- frontend/components/admin/
- frontend/lib/admin.ts
- frontend/components/account/
- frontend/components/blog/
- frontend/components/checkout/checkout-progress.tsx
- frontend/components/checkout/index.ts
- frontend/components/checkout/shipping-payment-selector.tsx
- frontend/components/commerce/
- frontend/components/marketing/
- frontend/components/product/frequently-bought-together.tsx
- frontend/components/product/index.ts
- frontend/components/product/product-comparison.tsx
- frontend/components/product/product-faq.tsx
- frontend/components/showcase.tsx
- frontend/components/system/
- frontend/lib/blog.ts
- frontend/lib/commerce.ts
- frontend/lib/products-advanced.ts
- frontend/lib/user-account.ts
- IMPLEMENTATION_SUMMARY.md
- FRONTEND_POLISH_REPORT.md
- POLISH_EPIC_SUMMARY.md
- frontend/app/[locale]/(routes)/not-found.tsx
- frontend/components/layout/breadcrumb.tsx
- frontend/components/ui/
- frontend/components/system/
Frontend freeze status:
- 26 pages verified
- Critical issues fixed
- Production build verified
- RTL/LTR verified
- i18n verified
- Accessibility reviewed
- Audit reports generated
- Git tag: frontend-complete



# Backend Foundation Notes

## Current Backend Status

Backend foundation completed and tagged:

- Tag: backend-foundation-complete
- NestJS architecture created
- Prisma ORM configured
- PostgreSQL schema foundation created
- Core ecommerce modules created
- Common infrastructure created
- Security foundation created

Backend modules created:

- auth
- users
- products
- categories
- brands
- cart
- orders
- inventory
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

Important:
Backend foundation is not feature complete.
Future development must extend the existing architecture.
Do not rebuild existing modules.

---

# Pending Backend Roadmap

## Database Development Rules

Prisma migration:

- Create proper migrations
- Verify schema relations
- Verify indexes
- Verify constraints

Important:
Do not only modify schema.prisma.

All database changes must consider:
- Migration history
- Existing relations
- Data integrity
- Future scalability

## Authentication System

Current:
- Auth module foundation exists

Required:

- JWT authentication flow
- Access token implementation
- Refresh token implementation
- Token rotation
- Logout and token invalidation
- Password hashing
- Password validation rules
- Forgot password flow
- Password reset tokens
- Email verification foundation
- Session management

---

## User Management

Required:

- Complete user APIs
- Profile management
- Update profile
- Change password
- User preferences
- Address CRUD
- Default address management
- User session handling

---

## Authorization

Current:
- Guards foundation exists

Required:

- Complete RBAC system
- Permission checking
- Role assignment
- Admin authorization
- Protected endpoint architecture

---

## Commerce Improvements

Required:

### Cart
- Cart validation
- Stock validation
- Price validation
- Advanced calculations

### Inventory
- Inventory transaction history
- Stock movement tracking
- Reservation system
- Low stock handling

### Orders
- Complete order lifecycle
- Status transition rules
- Cancellation flow
- Return/refund foundation
- Order event tracking

### Discounts
- Coupon-order relationship
- Discount calculation engine
- Coupon validation
- Usage limits
- Expiration rules

---

# Scentora Specific Product Extensions

Scentora is a perfume ecommerce platform.

Current Product model is generic.
Future extensions required:

- Fragrance notes system
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
- Advanced perfume filtering

Do not replace Product model.
Extend existing design.

---

# Production Readiness Checklist

Before production:

Backend:
- Unit tests
- Integration tests
- API tests
- Database tests
- Logging system
- Monitoring
- Performance optimization

Infrastructure:
- CI/CD
- Deployment configuration
- Production environment setup
- Database backup strategy

---

# Development Strategy Update

Project prefers:

- Large domain-focused tasks
- Complete related features together
- Minimal architecture changes
- No duplicate implementations
- Verify existing architecture before adding new systems



Working correctly:
- Build successful
- Git clean
- Changes committed and pushed

## Next Task

Authentication and User Management Complete Backend Epic

Goal:
Implement a complete production-ready authentication, authorization, and user management domain on top of the existing backend foundation.

Important:
Do not rebuild architecture.
Use existing NestJS modules, Prisma setup, guards, services, and common infrastructure.
Extend current implementation only.

Scope:

Authentication:

- Implement JWT authentication architecture
- Create access token flow
- Create refresh token flow
- Implement refresh token rotation
- Implement logout and token invalidation
- Add secure password hashing
- Add password validation rules
- Implement register endpoint
- Complete login endpoint
- Add forgot password foundation
- Add password reset token system
- Add email verification foundation

Database:

Extend Prisma schema if required:

- RefreshToken model
- PasswordResetToken model
- EmailVerificationToken model
- Session model if architecture requires it

Keep relations clean and scalable.

Authorization:

Implement complete authorization system:

- JWT strategy
- Auth guards
- Role guards
- Permission checking
- Current user decorator
- Protected routes foundation
- Admin authorization foundation

User Management:

Create complete user domain:

- User profile endpoints
- Update profile
- Change password
- User preferences management
- Address CRUD
- Default address logic
- User session management

API Quality:

Add:

- DTO validation
- Proper error handling
- Consistent API responses
- Swagger documentation updates
- Pagination where needed

Security:

Follow production practices:

- Never store plain passwords
- Secure token handling
- Validate all inputs
- Protect sensitive endpoints

Testing foundation:

Create structure for:

- Auth tests
- User service tests
- API integration tests

Documentation:

Update:

- API documentation
- Architecture documentation
- Setup documentation

Verification:

Before finishing:

- Run production build
- Verify all routes
- Verify Prisma schema consistency
- Verify TypeScript errors
- Provide implementation summary

Do not create unnecessary files.
Do not modify frontend.
Use TypeScript only.
Commit changes after completion.

Rules:
- No frontend changes
- No payment gateway
- No external services
- Production architecture


## Development Rules

- Keep tasks domain-focused
- Combine related features into one task
- Do not inspect unrelated files
- Do not modify architecture
- Do not create unnecessary files
- Use existing components
- TypeScript only
- Commit after each completed domain task

## Critical AI Development Rules

Before creating any new module:

1. Check existing architecture first.
2. Extend existing modules whenever possible.
3. Never duplicate business logic.
4. Never create alternative implementations.
5. Never replace Prisma models without migration planning.
6. Never modify completed frontend architecture.
7. Prefer completing existing domains over creating new domains.

## Domain Completion Checklist

Before marking any domain complete:

Required:

- Build verification
- TypeScript check
- Architecture review
- Check missing dependencies
- Check database relations
- Check API consistency

## Documentation Rule

Create documentation only when it provides project value.

Rules:

- Do not create unnecessary markdown reports.
- Prefer updating existing documentation files.
- Avoid duplicate documentation.
- Keep documentation focused on long-term project maintenance.