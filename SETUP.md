# Setup Guide

## Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL 13+

## Initial Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```

Update `.env` with your database credentials:
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scentora_dev
JWT_SECRET=your_secure_jwt_secret_key_change_in_production
JWT_EXPIRATION=7d
API_PREFIX=/api/v1
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:3000
```

### 3. Database Setup

#### Generate Prisma Client
```bash
npm run db:generate
```

#### Create Database and Run Migrations
```bash
npm run db:migrate:dev
```

#### Seed Sample Data
```bash
npm run db:seed
```

### 4. Run Application

#### Development Mode
```bash
npm run start:dev
```

The application will start on `http://localhost:3001`
Swagger documentation: `http://localhost:3001/api/docs`

#### Production Build
```bash
npm run build
npm run start:prod
```

## Testing

### Run Unit Tests
```bash
npm run test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:cov
```

## API Documentation

Swagger documentation is available at:
```
http://localhost:3001/api/docs
```

Endpoints by category:
- **Auth** - Authentication endpoints
- **Users** - User management endpoints
- **Products** - Product catalog endpoints
- **Cart** - Shopping cart endpoints
- **Wishlist** - Wishlist endpoints
- **Orders** - Order management endpoints
- **Reviews** - Product review endpoints

## Sample Credentials (After Seeding)

### Admin User
- Email: `admin@scentora.com`
- Password: `Admin@123`

### Regular User
- Email: `user@example.com`
- Password: `User@123`

## Common Tasks

### Reset Database (Destructive)
```bash
npm run db:reset
```
This will delete all data and reseed the database.

### Create New Migration
```bash
npm run db:migrate:dev
```
Follow the prompts to create a new migration.

### Format Code
```bash
npm run format
```

### Lint Code
```bash
npm run lint
```

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists: `createdb scentora_dev`

### Port Already in Use
- Change PORT in .env
- Or kill existing process: `lsof -ti:3001 | xargs kill -9`

### Module Not Found Errors
```bash
rm -rf node_modules
npm install
npm run db:generate
```

### TypeScript Compilation Errors
```bash
npm run build
```

### Prisma Schema Issues
```bash
npm run db:generate
npm run db:migrate:dev
```

## Development Workflow

1. Make changes to `.ts` files
2. Prisma will auto-regenerate on save in dev mode
3. TypeScript compilation happens automatically
4. Changes reflect immediately in dev server
5. Use `npm run format` before committing
6. Use `npm run lint` to check code quality

## Performance Optimization

### Database Indexes
Already configured in Prisma schema:
- User email (unique)
- RefreshToken token (unique, indexed)
- PasswordResetToken token (unique, indexed)
- EmailVerificationToken token (unique, indexed)
- User status
- User createdAt

### Caching
- Access tokens are stateless (cache-friendly)
- Refresh tokens indexed for fast lookups
- Consider Redis for refresh token validation at scale

### Pagination
- Implemented on users list endpoint
- Use ?page=1&limit=10 query parameters

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Enable CORS for specific domains only
- [ ] Set NODE_ENV=production
- [ ] Configure strong database passwords
- [ ] Enable database backups
- [ ] Monitor logs for suspicious activity
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Regularly update dependencies: `npm update`

## Production Deployment

### Build for Production
```bash
npm run build
```

### Run Production Server
```bash
NODE_ENV=production npm run start:prod
```

### Environment Variables (Production)
```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@prod-db:5432/scentora
JWT_SECRET=your_production_secret_key_random_and_long
JWT_EXPIRATION=7d
API_PREFIX=/api/v1
LOG_LEVEL=warn
CORS_ORIGIN=https://yourdomain.com
```

### Database Backup Strategy
- Daily automated backups
- Maintain 7-day retention
- Test restore procedures monthly

### Monitoring
- Track response times
- Monitor error rates
- Alert on high CPU/memory usage
- Log authentication attempts
- Track API usage patterns

## Next Steps

1. Deploy database to production
2. Configure environment variables
3. Build and deploy application
4. Run database migrations
5. Configure monitoring and alerts
6. Set up CI/CD pipeline
7. Implement API rate limiting
8. Add email verification flow
9. Implement password reset flow
10. Set up user audit logs
