# Scentora Backend Architecture

## Overview
Complete production-ready authentication, authorization, and user management platform built on NestJS with Prisma ORM.

## Core Modules

### Auth Module (`src/modules/auth`)
Handles user authentication and session management.

**Components:**
- `AuthService` - Core authentication logic (register, login, token generation, password management)
- `AuthController` - Public endpoints for auth operations
- DTOs: RegisterDto, LoginDto, ChangePasswordDto, LogoutDto

**Features:**
- User registration with email uniqueness validation
- Login with JWT tokens
- Refresh token management
- Password hashing (bcrypt)
- Secure token storage and revocation
- Change password endpoint

### Users Module (`src/modules/users`)
Manages user profiles, preferences, and addresses.

**Components:**
- `UsersService` - User CRUD and profile management
- `UsersController` - Protected user endpoints
- DTOs: CreateUserDto, UpdateUserDto, UpdatePreferencesDto, CreateAddressDto, UpdateAddressDto

**Features:**
- User profile management
- Preference configuration (language, theme, notifications)
- Address CRUD operations
- Default address management
- Ownership validation for private resources

### Common Module (`src/common`)
Global cross-cutting concerns.

**Components:**
- `AllExceptionsFilter` - Centralized error handling
- `ResponseInterceptor` - Consistent response formatting
- `PaginationPipe` - Query parameter validation

### Shared Module (`src/shared`)
Shared utilities across the application.

**Guards:**
- `JwtAuthGuard` - Validates JWT tokens, supports public routes via @Public() decorator
- `RolesGuard` - Role-based access control via @Roles() decorator
- `PermissionsGuard` - Fine-grained permission control (resource:action)
- `AdminGuard` - Admin-only access

**Decorators:**
- `@CurrentUser()` - Injects authenticated user from request
- `@Public()` - Marks route as publicly accessible
- `@Roles(...)` - Specifies required roles

**Exceptions:**
- BadRequestException (400)
- UnauthorizedException (401)
- ForbiddenException (403)
- NotFoundException (404)
- ConflictException (409)
- InternalServerErrorException (500)

## Database Schema

### User Relations
```
User
├── roles (UserRole[]) - RBAC relationships
├── preferences (UserPreference) - User settings
├── refreshTokens (RefreshToken[]) - Active sessions
├── passwordResetTokens (PasswordResetToken[]) - Password recovery
├── emailVerificationTokens (EmailVerificationToken[]) - Email verification
├── addresses (Address[]) - Billing/Shipping addresses
├── orders (Order[])
├── carts (Cart[])
├── wishlists (Wishlist[])
├── reviews (Review[])
└── notifications (Notification[])
```

### RBAC Models
```
Role (name, description)
├── users (UserRole[])
└── permissions (RolePermission[])

Permission (name, resource, action)
└── roles (RolePermission[])

UserRole (userId, roleId) - Junction table
RolePermission (roleId, permissionId) - Junction table
```

### Token Models
```
RefreshToken
├── userId
├── token (unique, indexed)
├── expiresAt
└── revokedAt (nullable)

PasswordResetToken
├── userId
├── token (unique, indexed)
├── expiresAt
└── usedAt (nullable)

EmailVerificationToken
├── userId
├── token (unique, indexed)
├── expiresAt
└── verifiedAt (nullable)
```

## Security Implementation

### Authentication Flow
1. User registers with email, password, firstName, lastName
2. Password hashed with bcrypt (salt rounds: 10)
3. User created with USER role
4. JWT access token generated (7 days expiry)
5. Refresh token stored in DB (7 days expiry)

### Token Management
- Access tokens are stateless (can be revoked by invalidating in frontend)
- Refresh tokens are stateful (tracked in database)
- Refresh tokens can be revoked via logout
- Tokens indexed for fast lookups

### Password Security
- Minimum 8 characters
- Uppercase + lowercase + number + special character required
- Bcrypt hashing with 10 rounds
- Current password verification on change

### Authorization
- Role-based access control (RBAC)
- Fine-grained permissions (resource:action model)
- Public routes marked with @Public()
- Guard chain: JwtAuthGuard → RolesGuard → PermissionsGuard

## API Response Format

### Success Response
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { /* response data */ },
  "timestamp": "2026-07-15T21:00:00Z"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Bad request",
  "error": "BAD_REQUEST",
  "timestamp": "2026-07-15T21:00:00Z"
}
```

## Configuration

### Environment Variables
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRATION=7d
API_PREFIX=/api/v1
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:3000
```

### Global Setup (main.ts)
- Helmet for security headers
- CORS enabled
- Global validation pipe
- Global exception filter
- Global response interceptor
- Swagger documentation
- API prefix

## Development Workflow

### Database
```bash
npm run db:generate    # Generate Prisma client
npm run db:migrate:dev # Create migrations
npm run db:seed        # Seed database with sample data
npm run db:reset       # Reset database (destructive)
```

### Application
```bash
npm run build          # Compile TypeScript
npm run start          # Start production server
npm run start:dev      # Start dev server with watch mode
npm run start:debug    # Debug mode
npm run lint           # Lint code
npm run format         # Format code with Prettier
```

### Testing
```bash
npm run test           # Run tests
npm run test:watch     # Watch mode
npm run test:cov       # Coverage report
npm run test:e2e       # End-to-end tests
```

## File Structure
```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   └── dto/
│   │   │       └── login.dto.ts
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   └── dto/
│   │   │       └── create-user.dto.ts
│   │   └── [other modules...]
│   ├── shared/
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── permissions.guard.ts
│   │   ├── decorators/
│   │   │   └── index.ts
│   │   ├── exceptions/
│   │   │   └── custom.exceptions.ts
│   │   └── dto/
│   │       └── common.dto.ts
│   ├── common/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/
│   │   ├── configuration.ts
│   │   ├── prisma.service.ts
│   │   └── config.module.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── test/
├── package.json
└── tsconfig.json
```

## Key Design Decisions

1. **Stateless Access Tokens** - Faster validation, no database lookups
2. **Stateful Refresh Tokens** - Can revoke sessions, track active devices
3. **Global JWT Guard** - Applied to all routes, bypassed with @Public()
4. **Resource:Action Permissions** - Flexible and scalable RBAC model
5. **Centralized Exception Handling** - Consistent error responses
6. **DTO Validation** - Class-validator for automatic validation
7. **Prisma ORM** - Type-safe database operations
8. **Bcrypt Hashing** - Industry-standard password security
