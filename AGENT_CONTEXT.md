# Scentora Agent Context

## Project
Scentora is a portfolio-grade perfume e-commerce platform.

## Stack
Frontend:
- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend:
- NestJS (not started)

Database:
- PostgreSQL
- Prisma (not started)

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

## Current Stage

Frontend ecommerce experience development.

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

Working correctly:
- Build successful
- Git clean
- Changes committed and pushed

## Next Task

Create frontend production polish and finalization epic.

Scope:

Design System:
- Review component consistency
- Improve spacing system
- Improve typography hierarchy
- Improve color usage
- Improve button variants
- Improve card patterns
- Improve form components

Navigation:
- Complete desktop navigation
- Complete mobile navigation
- Improve user menu
- Add breadcrumb system
- Improve footer experience

Product Experience:
- Improve product gallery
- Add image placeholders
- Add product badges
- Add availability states
- Add product quick actions
- Improve product comparison
- Improve related products

Shopping Experience:
- Improve cart UX
- Improve checkout UX
- Improve order success UX
- Improve order tracking UX
- Add coupon states
- Add shipping states

User Experience:
- Improve profile experience
- Improve account navigation
- Add settings UI
- Add address management UI
- Improve notification center

System:
- Create loading components
- Create skeleton components
- Improve error pages
- Improve 404 page
- Create reusable empty states
- Add confirmation dialogs

SEO and Performance:
- Prepare metadata structure
- Prepare OpenGraph structure
- Improve image handling
- Optimize route loading
- Cleanup components

Responsive:
- Improve mobile experience
- Improve tablet experience
- Improve accessibility
- Improve keyboard navigation
- Improve ARIA states
- Improve focus states


## Development Rules

- Keep tasks domain-focused
- Combine related features into one task
- Do not inspect unrelated files
- Do not modify architecture
- Do not create unnecessary files
- Use existing components
- TypeScript only
- Commit after each completed domain task