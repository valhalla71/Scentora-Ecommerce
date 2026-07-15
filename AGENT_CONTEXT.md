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

## Current Stage

Frontend ecommerce pages development.

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

Working correctly:
- Build successful
- Git clean
- Changes committed and pushed

## Next Task

Create orders page only.

## Development Rules

- Small tasks only
- One feature per task
- Do not inspect unrelated files
- Do not modify architecture
- Do not create unnecessary files
- Use existing components
- TypeScript only
- Commit after each completed task