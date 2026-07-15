# Scentora Database Schema & ERD

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          USER MANAGEMENT SYSTEM                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────┐  1    M   ┌──────────────┐  1    M   ┌─────────────────┐│
│  │   Role       │◄──────────│  UserRole    │──────────►│  User            ││
│  ├──────────────┤           ├──────────────┤           ├─────────────────┤│
│  │ id (PK)      │           │ id (PK)      │           │ id (PK)          ││
│  │ name (UQ)    │           │ roleId (FK)  │           │ email (UQ)       ││
│  │ description  │           │ userId (FK)  │           │ password         ││
│  └──────────────┘           └──────────────┘           │ firstName        ││
│         │                                               │ lastName         ││
│         │ 1              M                              │ phone            ││
│         └────────────────────┐                          │ status (ENUM)    ││
│                              │                          │ createdAt        ││
│  ┌────────────────────────────▼─────────────────────┐  │ updatedAt        ││
│  │  RolePermission                                  │  │ deletedAt (Soft) ││
│  ├──────────────────────────────────────────────────┤  └────────┬────────┬┘│
│  │ id (PK)                                          │           │        │  │
│  │ roleId (FK) ────→ Role                           │           │        │  │
│  │ permissionId (FK) ────→ Permission               │    1      │  1    │  │
│  └──────────────────────────────────────────────────┘           │        │  │
│                                                                  │        │  │
│  ┌──────────────────────────────────────────────────┐           │        │  │
│  │  Permission                                      │           │        │  │
│  ├──────────────────────────────────────────────────┤      M   │   M    M  │
│  │ id (PK)                                          │           │        │  │
│  │ name (UQ)                                        │    ┌──────┘        │  │
│  │ resource (idx)                                   │    │               │  │
│  │ action                                           │    │               │  │
│  │ (resource, action) UQ                            │    │               │  │
│  └──────────────────────────────────────────────────┘    │               │  │
│                                                            │               │  │
│                                                    ┌───────▼──┐           │  │
│                                                    │UserPref. │           │  │
│                                                    ├──────────┤           │  │
│                                                    │ userId   │           │  │
│                                                    │ language │           │  │
│                                                    │ theme    │           │  │
│                                                    └──────────┘           │  │
│                                                                           │  │
│                    ┌──────────────────────────────────────┐               │  │
│                    │  Address                             │               │  │
│                    ├──────────────────────────────────────┤        M     │  │
│                    │ id (PK)                              │               │  │
│                    │ userId (FK) ──────────────────────────┘               │  │
│                    │ type (ENUM: BILLING/SHIPPING)                        │  │
│                    │ fullName                                             │  │
│                    │ phone (idx)                                          │  │
│                    │ address                                              │  │
│                    │ city                                                 │  │
│                    │ state                                                │  │
│                    │ zipCode                                              │  │
│                    │ country                                              │  │
│                    │ isDefault                                            │  │
│                    └──────────────────────────────────────┘               │  │
│                                                                           │  │
│                                                                    M     │  │
│                                        ┌──────────────────────────────┬──┘  │
│                                        │                              │     │
│    ┌───────────────────┐              ┌──────────────────┐           │     │
│    │  Wishlist         │◄─────1────M──│  WishlistItem    │           │     │
│    ├───────────────────┤               ├──────────────────┤           │     │
│    │ id (PK)           │               │ id (PK)          │           │     │
│    │ userId (FK, UQ)   │               │ wishlistId (FK)  │           │     │
│    │ createdAt         │               │ productId (FK)   │           │     │
│    │ updatedAt         │               │ addedAt          │           │     │
│    └───────────────────┘               │ (wishlistId,     │           │     │
│                                        │  productId) UQ   │           │     │
│                                        └──────────────────┘           │     │
│                                                                       │     │
│    ┌──────────────────────────────────────────────────────────────┐  │     │
│    │  Cart                                                    │◄───┘     │
│    ├──────────────────────────────────────────────────────────┤          │
│    │ id (PK)                                                  │          │
│    │ userId (FK, idx)                                         │          │
│    │ status (ENUM)                                            │          │
│    │ createdAt                                                │          │
│    │ updatedAt                                                │          │
│    └──────────┬───────────────────────────────────────────────┘          │
│              │                                                            │
│              │ 1                M                                         │
│              └────────────────────────┐                                   │
│                                       │                                   │
│                        ┌──────────────▼──────────────┐                    │
│                        │  CartItem                   │                    │
│                        ├─────────────────────────────┤                    │
│                        │ id (PK)                     │                    │
│                        │ cartId (FK)                 │                    │
│                        │ productId (FK)              │                    │
│                        │ quantity                    │                    │
│                        │ addedAt                     │                    │
│                        │ (cartId, productId) UQ      │                    │
│                        └─────────────────────────────┘                    │
│                                                                           │
│    ┌──────────────────────────────────────────────────────────────────┐  │
│    │  Order                                                       1   │  │
│    ├──────────────────────────────────────────────────────────────────┤  │
│    │ id (PK)                                                          │  │
│    │ userId (FK, idx)◄─────────────────────────────────────────────────┘  │
│    │ orderNumber (UQ)                                                 │     │
│    │ status (ENUM: PENDING, CONFIRMED, SHIPPED, etc.)                │     │
│    │ subtotal                                                         │     │
│    │ tax                                                              │     │
│    │ shippingCost                                                     │     │
│    │ total                                                            │     │
│    │ createdAt (idx)                                                  │     │
│    │ updatedAt                                                        │     │
│    │ deletedAt (Soft delete)                                          │     │
│    └──────────────┬────────────────────────────────────────────────────┐   │
│                   │                                                    │   │
│              M    │ 1                              1    M              │   │
│    ┌──────────────▼──────────────┐  ┌────────────────────────────┐   │   │
│    │  OrderItem                   │  │  Payment                   │   │   │
│    ├───────────────────────────────┤ ├────────────────────────────┤   │   │
│    │ id (PK)                       │ │ id (PK)                    │   │   │
│    │ orderId (FK, idx)             │ │ orderId (FK, UQ)           │   │   │
│    │ productId (FK, idx)           │ │ method (ENUM)              │   │   │
│    │ quantity                      │ │ status (ENUM)              │   │   │
│    │ price                         │ │ transactionId              │   │   │
│    │ total                         │ │ amount                     │   │   │
│    └───────────────────────────────┘ └────────────────────────────┘   │   │
│                                                                        │   │
│                          ┌──────────────────────────────────┐          │   │
│                          │  Shipping                        │          │   │
│                          ├──────────────────────────────────┤         │   │
│                          │ id (PK)                          │         │   │
│                          │ orderId (FK, UQ)                 │         │   │
│                          │ method (ENUM)                    │         │   │
│                          │ cost                             │         │   │
│                          │ estimatedDate                     │         │   │
│                          │ actualDate                       │         │   │
│                          │ trackingNumber                   │         │   │
│                          └──────────────────────────────────┘         │   │
│                                                                        │   │
│                                                    ┌───────────────────┘   │
│                                                    │                       │
└────────────────────────────────────────────────────┼───────────────────────┘
                                                     │
┌────────────────────────────────────────────────────┼───────────────────────┐
│                  CATALOG SYSTEM                    │                       │
├────────────────────────────────────────────────────┼───────────────────────┤
│                                                     │                       │
│  ┌──────────────────┐         ┌──────────────────┐ │                       │
│  │  Category        │         │  Brand           │ │                       │
│  ├──────────────────┤         ├──────────────────┤ │                       │
│  │ id (PK)          │         │ id (PK)          │ │                       │
│  │ name (UQ)        │         │ name (UQ)        │ │                       │
│  │ slug (UQ, idx)   │         │ slug (UQ, idx)   │ │                       │
│  │ description      │         │ description      │ │                       │
│  │ image            │         │ image            │ │                       │
│  └────────┬─────────┘         └────────┬─────────┘ │                       │
│           │                            │           │                       │
│       1   │         M                  │    1      │    M                   │
│           └──────┬──────────────────┬──┘           │                       │
│                  │                  │              │                       │
│           ┌──────▼────────────────┐ │              │                       │
│           │  Product              │ │              │                       │
│           ├──────────────────────────┤              │                       │
│           │ id (PK)                │ │              │                       │
│           │ name                   │ │              │                       │
│           │ slug (UQ, idx)         │ │              │                       │
│           │ description            │ │              │                       │
│           │ price                  │ │              │                       │
│           │ cost                   │ │              │                       │
│           │ categoryId (FK, idx) ◄─┘─┴──────────────┘                       │
│           │ brandId (FK, idx)◄─────┘                                        │
│           │ status (ENUM, idx)                                              │
│           │ createdAt (idx)                                                 │
│           │ updatedAt                                                       │
│           │ deletedAt (Soft delete)                                         │
│           └──────┬──────────────────────────────────┐                       │
│                  │                                  │                       │
│            1     │   M                          1   │   M                   │
│           ┌──────▼──────────────┐   ┌──────────────▼──────┐                │
│           │  ProductImage       │   │  ProductAttribute   │                │
│           ├─────────────────────┤   ├─────────────────────┤                │
│           │ id (PK)             │   │ id (PK)             │                │
│           │ productId (FK, idx) │   │ productId (FK, idx) │                │
│           │ url                 │   │ name                │                │
│           │ alt                 │   │ value               │                │
│           │ isPrimary (idx)     │   └─────────────────────┘                │
│           │ order               │                                           │
│           └─────────────────────┘                                           │
│                                                                              │
│           ┌──────────────────────────────┐                                  │
│           │  Inventory          1        │                                  │
│           ├──────────────────────────────┤                                  │
│           │ id (PK)                      │                                  │
│           │ productId (FK, UQ, idx)      │                                  │
│           │ quantity                     │                                  │
│           │ reserved                     │                                  │
│           └──────────────────────────────┘                                  │
│                                                                              │
│           ┌──────────────────────────────────┐                              │
│           │  Review                   M      │                              │
│           ├──────────────────────────────────┤                              │
│           │ id (PK)                          │                              │
│           │ productId (FK, idx)◄─────┐       │                              │
│           │ userId (FK, idx)         │       │                              │
│           │ rating (idx)             │       │                              │
│           │ title                    │       │                              │
│           │ content                  │       │                              │
│           │ helpful                  │       │                              │
│           │ status (ENUM, idx)       │       │                              │
│           │ createdAt                │       │                              │
│           │ deletedAt (Soft delete)  │       │                              │
│           └──────────────────────────────────┘                              │
│                                                                              │
│           ┌──────────────────────────────┐                                  │
│           │  Notification                │                                  │
│           ├──────────────────────────────┤                                  │
│           │ id (PK)                      │                                  │
│           │ userId (FK, idx)             │                                  │
│           │ type (ENUM)                  │                                  │
│           │ title                        │                                  │
│           │ message                      │                                  │
│           │ read (idx)                   │                                  │
│           │ createdAt                    │                                  │
│           └──────────────────────────────┘                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                    BUSINESS MODULE (Placeholders)                            │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   ┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐  │
│   │  Coupon          │      │  Payment         │      │  Shipping        │  │
│   ├──────────────────┤      ├──────────────────┤      ├──────────────────┤  │
│   │ id (PK)          │      │ id (PK)          │      │ id (PK)          │  │
│   │ code (UQ, idx)   │      │ orderId (FK, UQ) │      │ orderId (FK, UQ) │  │
│   │ type (ENUM)      │      │ method (ENUM)    │      │ method (ENUM)    │  │
│   │ value            │      │ status (ENUM)    │      │ cost             │  │
│   │ minPurchase      │      │ transactionId    │      │ estimatedDate    │  │
│   │ maxUses          │      │ amount           │      │ actualDate       │  │
│   │ usedCount        │      │ createdAt        │      │ trackingNumber   │  │
│   │ expiresAt (idx)  │      │ updatedAt        │      │ createdAt        │  │
│   │ createdAt        │      └──────────────────┘      │ updatedAt        │  │
│   │ updatedAt        │                                └──────────────────┘  │
│   └──────────────────┘                                                      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

Legend:
─── (1:M) One-to-Many relationship
◄── (M:1) Many-to-One relationship
UQ = Unique constraint
idx = Database index
PK = Primary Key
FK = Foreign Key
ENUM = Enumerated type
Soft delete = Records marked as deleted with timestamp
```

## Key Indexes

```sql
-- Users
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_user_status ON "User"(status);
CREATE INDEX idx_user_createdAt ON "User"("createdAt");

-- Products
CREATE INDEX idx_product_categoryId ON "Product"("categoryId");
CREATE INDEX idx_product_brandId ON "Product"("brandId");
CREATE INDEX idx_product_status ON "Product"(status);
CREATE INDEX idx_product_slug ON "Product"(slug);
CREATE INDEX idx_product_createdAt ON "Product"("createdAt");

-- Orders
CREATE INDEX idx_order_userId ON "Order"("userId");
CREATE INDEX idx_order_orderNumber ON "Order"("orderNumber");
CREATE INDEX idx_order_status ON "Order"(status);
CREATE INDEX idx_order_createdAt ON "Order"("createdAt");

-- Cart Items
CREATE INDEX idx_cartItem_cartId ON "CartItem"("cartId");
CREATE INDEX idx_cartItem_productId ON "CartItem"("productId");

-- Reviews
CREATE INDEX idx_review_productId ON "Review"("productId");
CREATE INDEX idx_review_userId ON "Review"("userId");
CREATE INDEX idx_review_rating ON "Review"(rating);
CREATE INDEX idx_review_status ON "Review"(status);

-- Inventory
CREATE INDEX idx_inventory_productId ON "Inventory"("productId");

-- Wishlist Items
CREATE INDEX idx_wishlistItem_wishlistId ON "WishlistItem"("wishlistId");
CREATE INDEX idx_wishlistItem_productId ON "WishlistItem"("productId");

-- Addresses
CREATE INDEX idx_address_userId ON "Address"("userId");
CREATE INDEX idx_address_type ON "Address"(type);

-- Notifications
CREATE INDEX idx_notification_userId ON "Notification"("userId");
CREATE INDEX idx_notification_read ON "Notification"(read);

-- Coupons
CREATE INDEX idx_coupon_code ON "Coupon"(code);
CREATE INDEX idx_coupon_expiresAt ON "Coupon"("expiresAt");
```

## Schema Statistics

- **Total Tables**: 25
- **User Tables**: 5 (User, Role, Permission, UserRole, RolePermission, UserPreference)
- **Catalog Tables**: 6 (Product, Category, Brand, ProductImage, ProductAttribute, Inventory)
- **Order Tables**: 6 (Order, OrderItem, Address, Payment, Shipping, Cart/CartItem/Wishlist/WishlistItem)
- **Review Tables**: 2 (Review, Notification)
- **Business Tables**: 3 (Coupon, Payment, Shipping)

## Data Integrity

- Foreign key constraints on all relationships
- Cascade delete for dependent records
- Unique constraints on business-critical fields
- Check constraints for enum values
- Not-null constraints on required fields

## Scalability Features

- Soft delete support for audit trails
- Pagination via limit/offset
- Database indexes on frequently queried columns
- Connection pooling via Prisma
- Query optimization potential
