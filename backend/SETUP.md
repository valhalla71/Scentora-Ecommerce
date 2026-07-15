# Backend Setup & Development Guide

## Quick Start

### 1. Installation
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scentora_dev
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRATION=7d
API_PREFIX=/api/v1
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:3000
```

### 3. Database Setup

#### Option A: Local PostgreSQL
```bash
# Create database
createdb scentora_dev

# Run migrations
npm run db:migrate:dev

# Seed database
npm run db:seed
```

#### Option B: Docker Compose
```bash
docker-compose up
```

This starts:
- PostgreSQL database on port 5432
- Backend server on port 3001
- Automatic migrations and seeding

### 4. Start Development Server
```bash
npm run start:dev
```

Server runs on `http://localhost:3001`
Swagger docs available at `http://localhost:3001/api/docs`

---

## Development Workflow

### Code Organization

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root application module
├── common/                 # Global infrastructure
│   ├── filters/            # Exception filters
│   ├── interceptors/       # Response interceptors
│   └── pipes/              # Validation pipes
├── config/                 # Configuration
│   ├── configuration.ts    # Config object
│   ├── prisma.service.ts   # Database service
│   └── config.module.ts    # Config module
├── modules/                # Feature modules
│   ├── [module]/
│   │   ├── [module].controller.ts
│   │   ├── [module].service.ts
│   │   ├── [module].module.ts
│   │   └── dto/
│   │       └── *.dto.ts
│   └── ...
└── shared/                 # Shared utilities
    ├── decorators/         # Custom decorators
    ├── dto/                # Global DTOs
    ├── exceptions/         # Custom exceptions
    ├── guards/             # Auth guards
    └── utils/              # Utility functions
```

### Adding a New Module

1. **Create Module Structure**
```bash
mkdir -p src/modules/my-feature
```

2. **Create Service** (`my-feature.service.ts`)
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';

@Injectable()
export class MyFeatureService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.model.findMany();
  }
}
```

3. **Create Controller** (`my-feature.controller.ts`)
```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MyFeatureService } from './my-feature.service';

@ApiTags('MyFeature')
@Controller('my-feature')
export class MyFeatureController {
  constructor(private service: MyFeatureService) {}

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  findAll() {
    return this.service.findAll();
  }
}
```

4. **Create Module** (`my-feature.module.ts`)
```typescript
import { Module } from '@nestjs/common';
import { MyFeatureService } from './my-feature.service';
import { MyFeatureController } from './my-feature.controller';
import { PrismaService } from '@config/prisma.service';

@Module({
  providers: [MyFeatureService, PrismaService],
  controllers: [MyFeatureController],
  exports: [MyFeatureService],
})
export class MyFeatureModule {}
```

5. **Register in AppModule** (`app.module.ts`)
```typescript
import { MyFeatureModule } from '@modules/my-feature/my-feature.module';

@Module({
  imports: [
    // ... existing imports
    MyFeatureModule,
  ],
})
export class AppModule {}
```

### Database Migrations

#### Create Migration
```bash
npx prisma migrate dev --name add_new_field
```

#### Apply Migrations
```bash
npm run db:migrate:dev      # Development
npm run db:migrate:prod     # Production
```

#### Reset Database
```bash
npm run db:reset            # Drops all data and re-creates schema
```

#### Generate Prisma Client
```bash
npm run db:generate
```

### Seeding Database

Edit `prisma/seed.ts` to add seed data, then run:
```bash
npm run db:seed
```

---

## Testing

### Run Tests
```bash
npm test                    # Unit tests
npm run test:watch         # Watch mode
npm run test:cov           # Coverage report
npm run test:e2e           # End-to-end tests
```

### Test Structure
```
test/
├── e2e/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
└── unit/
    ├── services/
    └── controllers/
```

---

## Code Quality

### Linting
```bash
npm run lint                # Run ESLint
```

### Formatting
```bash
npm run format              # Format with Prettier
```

### Pre-commit Hooks (Optional)
```bash
npm install husky lint-staged --save-dev
npx husky install
```

---

## Build & Deployment

### Build for Production
```bash
npm run build
```

Output goes to `dist/` directory.

### Start Production Server
```bash
npm run start:prod
```

### Docker Build
```bash
docker build -t scentora-backend:latest .
```

### Docker Run
```bash
docker run -p 3001:3001 \
  -e DATABASE_URL=postgresql://... \
  -e JWT_SECRET=... \
  scentora-backend:latest
```

---

## Debugging

### VS Code Debug Configuration

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "NestJS Debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/node_modules/.bin/nest",
      "args": ["start", "--debug", "--watch"],
      "env": {
        "NODE_ENV": "development"
      },
      "runtimeArgs": [
        "--nolazy",
        "--require",
        "tsconfig-paths/register"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

Run with: `F5` or Debug menu

### Logging
Logs are configured in `config/configuration.ts`. Set `LOG_LEVEL` to:
- `debug` - Verbose logging
- `log` - General logging
- `warn` - Warnings only
- `error` - Errors only

---

## Common Issues & Solutions

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running
```bash
# Start PostgreSQL
sudo service postgresql start    # Linux
brew services start postgresql   # macOS
# or use Docker
docker-compose up
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution**: Change PORT in `.env` or kill process
```bash
# Find and kill process
lsof -ti:3001 | xargs kill -9
```

### Prisma Client Not Found
```
Error: Cannot find module '.prisma/client'
```
**Solution**: Generate Prisma client
```bash
npm run db:generate
```

### JWT Secret Not Set
```
Error: jwt.secret is required
```
**Solution**: Add JWT_SECRET to `.env`

### Migration Issues
```bash
# Reset migrations (WARNING: Deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Rollback (for specific engines)
npx prisma migrate resolve --rolled-back "migration_name"
```

---

## Performance Optimization

### Database Query Optimization
- Use pagination on list endpoints
- Select only needed fields
- Index frequently queried columns
- Avoid N+1 queries with includes

### Caching (Future Implementation)
```typescript
// Example cache decorator
@Cacheable()
async getProduct(id: string) {
  return this.prisma.product.findUnique({ where: { id } });
}
```

### Connection Pooling
Prisma automatically manages connection pooling. Configure in `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost/db?connection_limit=5
```

---

## Monitoring

### Health Endpoints
```bash
# Liveness
curl http://localhost:3001/api/v1/health

# Readiness
curl http://localhost:3001/api/v1/health/ready
```

### Logs
Tail application logs:
```bash
# Docker
docker-compose logs -f backend

# Local
npm run start:dev | grep "Scentora API"
```

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Set CORS_ORIGIN to specific domain
- [ ] Enable rate limiting
- [ ] Setup database backups
- [ ] Use environment variables for secrets
- [ ] Validate and sanitize inputs
- [ ] Keep dependencies updated
- [ ] Setup error logging/monitoring
- [ ] Implement audit trails

---

## Useful Commands Reference

```bash
# Development
npm run start:dev              # Start with auto-reload
npm run start:debug           # Start in debug mode
npm run lint                  # Run linter
npm run format                # Format code

# Database
npm run db:generate           # Generate Prisma client
npm run db:migrate:dev        # Run migrations
npm run db:seed               # Seed database
npm run db:reset              # Reset database

# Building
npm run build                 # Build for production
npm run start:prod            # Run production build

# Testing
npm test                      # Run all tests
npm run test:watch           # Watch mode
npm run test:cov             # Coverage report

# Docker
docker-compose up            # Start development environment
docker-compose down          # Stop environment
docker-compose ps            # View running services
docker-compose logs -f       # View logs
```

---

## Next Steps

1. Review API documentation at `http://localhost:3001/api/docs`
2. Check `ARCHITECTURE.md` for system design
3. Review `DATABASE.md` for schema details
4. Check `API_ENDPOINTS.md` for endpoint reference
5. Start developing features!

---

## Support & Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [JWT Introduction](https://jwt.io/introduction)
- [Swagger UI](https://swagger.io)
