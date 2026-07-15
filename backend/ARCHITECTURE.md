# Scentora Backend Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                     Client Applications                         │
│                  (Web, Mobile, Admin)                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    HTTP/HTTPS
                         │
         ┌───────────────┴───────────────┐
         │                               │
    ┌────▼────────────────────────┐     │
    │   API Gateway / Reverse     │     │
    │   Proxy (Nginx/Load         │     │
    │   Balancer - Optional)      │     │
    └────┬────────────────────────┘     │
         │                               │
         ├───────────────────────────────┤
         │                               │
    ┌────▼────────────────────────┐ ┌──▼─────────────────────┐
    │    NestJS Backend Server    │ │  NestJS Backend Server │
    │   (Instance 1 - Optional)   │ │  (Instance 2 - Optional)
    │                              │ │                        │
    │ ┌──────────────────────────┐ │ │ ┌──────────────────┐   │
    │ │ Global Middleware        │ │ │ │ Global Middleware│   │
    │ │ - Helmet                 │ │ │ │ - CORS           │   │
    │ │ - CORS                   │ │ │ │ - Compression    │   │
    │ │ - Compression            │ │ │ │ - Logging        │   │
    │ └──────────────────────────┘ │ │ └──────────────────┘   │
    │                              │ │                        │
    │ ┌──────────────────────────┐ │ │ ┌──────────────────┐   │
    │ │ Request Validation       │ │ │ │ Error Handling   │   │
    │ │ & Pipes                  │ │ │ │ & Filters        │   │
    │ └──────────────────────────┘ │ │ └──────────────────┘   │
    │                              │ │                        │
    │ ┌──────────────────────────┐ │ │ ┌──────────────────┐   │
    │ │ Route Controllers        │ │ │ │ Interceptors     │   │
    │ │ (10 Modules)             │ │ │ │ - Response       │   │
    │ │ - Auth                   │ │ │ │ - Logging        │   │
    │ │ - Users                  │ │ │ │ - Transform      │   │
    │ │ - Products               │ │ │ └──────────────────┘   │
    │ │ - Orders                 │ │ │                        │
    │ │ - etc.                   │ │ │ ┌──────────────────┐   │
    │ └──────────────────────────┘ │ │ │ Authentication   │   │
    │                              │ │ │ JWT Guards       │   │
    │ ┌──────────────────────────┐ │ │ │ Role Guards      │   │
    │ │ Business Logic Services  │ │ │ └──────────────────┘   │
    │ │ (CRUD, Search, etc.)     │ │ │                        │
    │ └──────────────────────────┘ │ │ ┌──────────────────┐   │
    │                              │ │ │ Guards & RBAC    │   │
    │ ┌──────────────────────────┐ │ │ │ - JwtAuthGuard   │   │
    │ │ Data Access (Prisma)     │ │ │ │ - RolesGuard     │   │
    │ │ - ORM Queries            │ │ │ │ - AdminGuard     │   │
    │ │ - Relations              │ │ │ └──────────────────┘   │
    │ └──────────────────────────┘ │ │                        │
    └────┬────────────────────────┘ └──┬─────────────────────┘
         │                              │
         └──────────────┬───────────────┘
                        │
                 ┌──────▼──────┐
                 │  PostgreSQL │
                 │  Database   │
                 │  (Primary)  │
                 └─────────────┘
```

## Module Architecture

### 10 Core Modules

1. **Health Module**
   - Liveness probe: `/health`
   - Readiness probe: `/health/ready`

2. **Auth Module**
   - JWT generation and validation
   - Login/logout
   - Token refresh
   - User context extraction

3. **Users Module**
   - User CRUD operations
   - User preferences
   - User roles assignment
   - Profile management

4. **Products Module**
   - Product catalog CRUD
   - Product search/filter
   - Slug-based retrieval
   - Inventory relationship

5. **Categories Module**
   - Category management
   - Product categorization
   - Category hierarchy

6. **Brands Module**
   - Brand management
   - Brand-product relationship

7. **Cart Module**
   - Shopping cart operations
   - Add/remove items
   - Cart management
   - Cart persistence

8. **Wishlist Module**
   - Wishlist CRUD
   - Product favorites
   - User-specific wishlists

9. **Orders Module**
   - Order creation
   - Order tracking
   - Order status management
   - Order history

10. **Inventory Module**
    - Stock tracking
    - Reservation system
    - Quantity management

11. **Reviews Module**
    - Review creation
    - Review moderation
    - Rating aggregation

## Request Flow

```
HTTP Request
    ↓
Global Middleware (Helmet, CORS, Compression)
    ↓
Request Validation (ValidationPipe)
    ↓
Route Handler (Controller)
    ↓
Authentication Check (JwtAuthGuard if protected)
    ↓
Authorization Check (RolesGuard if needed)
    ↓
Business Logic (Service)
    ↓
Data Access (Prisma ORM)
    ↓
Database Query
    ↓
Response Transformation (ResponseInterceptor)
    ↓
HTTP Response (JSON)
```

## Layered Architecture

```
┌─────────────────────────────────────────┐
│        Presentation Layer               │
│     (Controllers, DTOs, Decorators)    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Business Logic Layer               │
│     (Services, Guards, Validators)     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Data Access Layer                  │
│     (Prisma ORM, Database Queries)     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Database Layer                     │
│     (PostgreSQL)                        │
└─────────────────────────────────────────┘
```

## Cross-Cutting Concerns

### Exception Handling
- Global exception filter catches all errors
- Custom exception classes for specific scenarios
- Consistent error response format

### Request/Response Handling
- Response interceptor wraps all successful responses
- Pagination support on list endpoints
- Request validation via DTOs

### Security
- JWT token-based authentication
- Role-Based Access Control (RBAC)
- Password hashing with bcrypt
- Helmet for HTTP headers security
- CORS configuration

### Validation
- Class-validator for request validation
- Custom validators for business logic
- Transformation pipes for data normalization

## Database Design

### Entity Relationships

```
User (1) ──────→ (M) UserRole ──────→ (1) Role
User (1) ──────→ (M) Order
User (1) ──────→ (M) Review
User (1) ──────→ (1) UserPreference
User (1) ──────→ (M) Address
User (1) ──────→ (1) Wishlist
User (1) ──────→ (1) Cart

Product (M) ──────→ (1) Category
Product (M) ──────→ (1) Brand
Product (1) ──────→ (1) Inventory
Product (1) ──────→ (M) ProductImage
Product (1) ──────→ (M) ProductAttribute
Product (1) ──────→ (M) Review
Product (M) ──────→ (M) CartItem (via Cart)
Product (M) ──────→ (M) WishlistItem (via Wishlist)

Order (1) ──────→ (M) OrderItem
Order (1) ──────→ (1) Payment
Order (1) ──────→ (1) Shipping
Order (M) ──────→ (1) User

Role (1) ──────→ (M) RolePermission ──────→ (1) Permission
```

## Deployment Architecture

```
┌────────────────────────────────────────┐
│   Docker Container (Multi-stage)       │
│                                        │
│  Stage 1: Build                        │
│  - Node.js 18 alpine                   │
│  - npm install                         │
│  - npm run build                       │
│                                        │
│  Stage 2: Production                   │
│  - Smaller base image                  │
│  - Only production dependencies         │
│  - Optimized for runtime               │
└────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│  Docker Compose (Development)          │
│  - Backend service                     │
│  - PostgreSQL service                  │
│  - Volumes for data persistence        │
│  - Health checks                       │
└────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│  Environment Configuration             │
│  - .env.development                    │
│  - .env.production                     │
│  - .env.test                           │
└────────────────────────────────────────┘
```

## Performance Considerations

1. **Database**
   - Indexes on frequently queried columns (email, slug, productId, userId)
   - Pagination to limit result sets
   - Query optimization with selective field selection

2. **API**
   - Response compression
   - JWT caching strategies
   - Connection pooling

3. **Caching (Future)**
   - Redis for session management
   - Cache invalidation strategies
   - Cache-aside pattern

## Scalability Features

1. **Horizontal Scaling**
   - Stateless service design
   - Load balancer compatible
   - Database connection pooling

2. **Vertical Scaling**
   - Async request handling
   - Non-blocking I/O
   - Resource management

## Security Layers

1. **Transport Security**
   - HTTPS (TLS/SSL)
   - CORS policy
   - Helmet headers

2. **Authentication**
   - JWT tokens
   - Token expiration
   - Secure password hashing

3. **Authorization**
   - Role-Based Access Control
   - Guard middleware
   - Permission checking

4. **Data Validation**
   - Input sanitization
   - Type checking
   - Business rule validation

## Monitoring & Observability

- Health check endpoints
- Request/response logging
- Error tracking (future)
- Performance metrics (future)
- Database query monitoring (future)

## Error Handling Strategy

```
Error Occurs
    ↓
Specific Exception Class (e.g., NotFoundException)
    ↓
Exception Filter
    ↓
Error Response Format
    ↓
Client Response (JSON)
```

## Testing Strategy

- Unit tests for services
- Integration tests for modules
- E2E tests for API endpoints
- Database seeding for test data
