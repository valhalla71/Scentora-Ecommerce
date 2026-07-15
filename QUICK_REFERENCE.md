# Quick Reference Guide

## Getting Started

### 1. Install and Setup
```bash
cd backend
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate:dev
npm run db:seed
npm run start:dev
```

### 2. Access Application
- API: http://localhost:3001/api/v1
- Swagger: http://localhost:3001/api/docs

### 3. Test Accounts (After Seeding)
- Admin: admin@scentora.com / Admin@123
- User: user@example.com / User@123

## Common API Workflows

### Register & Login
```bash
# Register
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "NewPass@123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "NewPass@123"
  }'
```

### Use JWT Token
```bash
# Store token from login response
TOKEN="your_access_token_here"

# Get profile
curl -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Manage Addresses
```bash
# Create address
curl -X POST http://localhost:3001/api/v1/users/addresses \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "country": "USA",
    "type": "BILLING",
    "isDefault": true
  }'

# Get all addresses
curl -X GET http://localhost:3001/api/v1/users/addresses/me \
  -H "Authorization: Bearer $TOKEN"

# Set as default
curl -X PUT http://localhost:3001/api/v1/users/addresses/{id}/default \
  -H "Authorization: Bearer $TOKEN"
```

### Update Preferences
```bash
curl -X PUT http://localhost:3001/api/v1/users/preferences/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en",
    "theme": "dark",
    "emailNotifications": true
  }'
```

### Change Password
```bash
curl -X POST http://localhost:3001/api/v1/auth/change-password \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "OldPass@123",
    "newPassword": "NewPass@123"
  }'
```

## Project Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/              # Authentication endpoints
│   │   ├── users/             # User management endpoints
│   │   ├── products/          # Product catalog
│   │   ├── cart/              # Shopping cart
│   │   └── ...
│   ├── shared/
│   │   ├── guards/            # JWT, Roles, Permissions guards
│   │   ├── decorators/        # @CurrentUser, @Public, @Roles
│   │   ├── exceptions/        # Custom exceptions
│   │   └── dto/               # Common DTOs
│   ├── common/                # Global filters, interceptors, pipes
│   ├── config/                # Configuration and Prisma
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry point
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
└── package.json
```

## Useful Commands

### Development
```bash
npm run start:dev              # Watch mode
npm run build                  # Compile TypeScript
npm run format                 # Format code
npm run lint                   # Check code quality
```

### Database
```bash
npm run db:generate           # Generate Prisma client
npm run db:migrate:dev        # Create migrations
npm run db:seed               # Seed database
npm run db:reset              # Reset database
```

### Testing
```bash
npm run test                  # Run tests
npm run test:watch            # Watch mode
npm run test:cov              # Coverage report
```

## Authentication Flow

1. **Register**: Create account with email, password, name
2. **Login**: Get JWT access token and refresh token
3. **Authenticated Request**: Include `Authorization: Bearer {token}` header
4. **Token Expiration**: Use refresh token to get new access token
5. **Logout**: Revoke refresh token (prevents new tokens)

## Error Handling

### Common Errors

#### 400 Bad Request
- Invalid request body
- Missing required fields
- Validation failed

#### 401 Unauthorized
- No token provided
- Token expired
- Invalid token
- Incorrect credentials

#### 403 Forbidden
- User doesn't have required role
- User doesn't own resource (e.g., address)
- Insufficient permissions

#### 404 Not Found
- User not found
- Address not found
- Resource not found

#### 409 Conflict
- Email already registered
- Duplicate resource

## Password Requirements
- Minimum 8 characters
- Must contain uppercase letter (A-Z)
- Must contain lowercase letter (a-z)
- Must contain number (0-9)
- Must contain special character (@$!%*?&)

Example: `SecurePass@123`

## JWT Token Payload

```json
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "iat": 1234567890,
  "exp": 1234654290
}
```

## Database Indexes

Optimized for performance:
- User.email (unique)
- RefreshToken.token (unique)
- PasswordResetToken.token (unique)
- EmailVerificationToken.token (unique)
- Foreign key indexes for fast joins

## Roles & Permissions

### Available Roles
- ADMIN - Full system access
- USER - Regular user access
- VENDOR - Vendor access

### Permission Format
`resource:action`

Examples:
- users:read
- users:create
- users:update
- users:delete
- products:read
- orders:create

## Public vs Protected Routes

### Public Routes (No Auth Required)
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- GET /users (list)
- GET /users/:id (get one)
- GET /products
- etc.

### Protected Routes (Auth Required)
- GET /auth/me
- PUT /users/:id
- DELETE /users/:id
- POST /users/addresses
- PUT /users/preferences/me
- POST /auth/change-password
- POST /auth/logout
- etc.

## Rate Limiting
Not yet implemented. Consider adding for production:
- Installation: `npm install @nestjs/throttler`
- Configuration: Add to app.module.ts
- Decorators: @Throttle(3, 60) on endpoints

## Monitoring & Logging

### Log Levels (configured in config)
- debug - Development details
- info - General information
- warn - Warning messages
- error - Error messages

### Logs to Track
- User registration attempts
- Login attempts (success/failure)
- Password changes
- Address management
- Token generation/revocation
- Permission denials

## Troubleshooting

### Module not found
```bash
npm install
npm run db:generate
```

### TypeScript errors
```bash
npm run build
```

### Database connection error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists

### Port already in use
```bash
# Change PORT in .env or kill process
lsof -ti:3001 | xargs kill -9
```

### Clear cache
```bash
npm run lint -- --cache --cache-location .eslintcache --cache-strategy content
rm -rf dist/
npm run build
```

## Documentation Files

- **API_ENDPOINTS.md** - Complete endpoint reference
- **ARCHITECTURE.md** - System design and patterns
- **SETUP.md** - Deployment and production guide
- **IMPLEMENTATION_SUMMARY.md** - What was implemented
- **This file** - Quick reference

## Next Steps

1. Set up CI/CD pipeline
2. Add email verification flow
3. Add password reset flow
4. Implement rate limiting
5. Set up monitoring/logging
6. Add API key authentication
7. Implement audit logging
8. Add two-factor authentication
9. Set up automated backups
10. Performance optimization

## Support

For issues or questions:
1. Check documentation files
2. Review Swagger API documentation
3. Check logs: `npm run start:dev`
4. Run tests: `npm run test`
5. Check git history: `git log`
